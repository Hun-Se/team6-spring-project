import { ref } from "vue";
import { defineStore } from "pinia";
import { login } from "@/api/user";
import router from "@/router/index.js";

export const useTestStore = defineStore("toggleLog", () => {
    const startBt = ref("로그인"); //초기값

    function log() {
        console.log(startBt);
    if (startBt.value == "로그인") {
        startBt.value = "로그아웃";
    } else {
        startBt.value = "로그인";
    }
    }
  return { startBt, log };
});


//사용자 임시 데이터
export const useTestData = defineStore("logdata", ()=> {
    
    
    const user = ref({ id: "dididi", name: "회원1", mbit: "tttt", post: "5" });

    const type = ref({
        mbit: "tttt",
        num: "num",
        location: "서울",
        type: "익스트림",
        mobility: "대중교통",
        house: "호캉스",
        house: "hotel",
    }
    )
    return { user, type };
})

export const useUserStore = defineStore("user", () => {
    const userData = ref(null); // 로그인시 받는 정보 : 아이디, 비번
    const userInfo = ref(null); // 유저의 상세 정보
    const error = ref(null);
  
    async function handleLogin(id, password) {
      try {
        const response = await login(id, password);
        userData.value = response.data; //저장됨
        error.value = null;
        alert("로그인 성공");
        console.log("Login data:", userData.value); //로그인하면서 유저 데이터가 저장됨(알림).
        router.push({ path: "/" });
      } catch (err) {
        error.value = err.message;
        console.error("Login error:", err);
      }
    }
  
    return { userData, userInfo, error, handleLogin };
  });

  