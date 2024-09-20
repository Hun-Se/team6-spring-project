// stores/login.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from "@/api/user";
import axios from 'axios';


//규태님 로그인 코드 다 합친 곳

export const useLoginStore = defineStore("login", () => {
  const router = useRouter();
  const data = ref(null);
  const error = ref(null);
  const isLoggedIn = ref(false); //해당 ref를 추가해서 로그인 상태를 추적함. 초기값: 로그인 x

  async function handleLogin(id, password) {
    try {
      const response = await login(id, password); // 로그인 함수 호출(import)
      data.value = response; // 입력받은 아이디와 비밀번호에 해당하는 값 저장(vo에 있는 것들..?)
      console.log(response);
      error.value = null; // 에러 초기화

      isLoggedIn.value = true; // 로그인 됨

      sessionStorage.setItem("userData", JSON.stringify(data.value)) // 문자열 또는 객체는 JSON형태로 받아와야 한다고 함
      sessionStorage.setItem("userNo", response.userNumber);
      alert("로그인 성공");
      console.log(data.value);
      router.push({ path: "/"});
    } catch (err) {
      error.value = err.message;
      alert(error.value); 
    }
  }

  async function handleLogout() {
    try {
      const response = await axios.post('http://localhost:9000/backend/api/auth/logout', {
        abId: data.value.username,
        abPw: data.value.password
      });
      alert("로그아웃 완료");  // 로그아웃 성공 메시지
      data.value = null;

      isLoggedIn.value = false; //다시 로그인 풀림

      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("userNo");
      router.push({ name: 'home' });
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 실패');
    }
  }

  function checkLoginStatus() { //로그인 상태를 감시하는 코드
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      data.value = JSON.parse(userData);
      isLoggedIn.value = true;
    }
  }


  return { data, error, isLoggedIn, handleLogin, handleLogout, checkLoginStatus };
});

