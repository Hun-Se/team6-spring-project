<template>
  <!-- 헤더 시작 -->
  <div class="header fixed-top" style="height: 8vh">
    <!-- 네비바 -->
    <nav class="navbar navbar-expand-lg navbar-dark w-100 h-100 d-flex flex">
      <div class="container-fluid">
        <div
          class="mainBt d-flex align-items-center"
          @click="navigationStore.goToMain(router)"
        >
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/stickers/50/airplane-take-off.png"
            alt="airplane-take-off"
          />
          <a
            class="navbar-brand ms-2 fw-bold"
            style="font-size: 43px"
            @click="useNavigationStore.goToMain"
            >I.GO!</a
          >
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div
            class="navbar-nav justify-content-center align-items-center fw-bold"
            style="color: black; font-size: 40px !important"
          >
            <a class="nav-link" style="font-size: 40px !important" href="#serch"
              >여행지</a
            >

            <a
              class="nav-link"
              style="font-size: 40px !important"
              @click="navigationStore.goToMain(router)"
              >계획 등록</a
            >

            <a
              class="nav-link"
              style="font-size: 40px !important"
              @click="navigationStore.goToMypage(router)"
              >마이페이지</a
            >

            <!-- 로그인 로그아웃 버튼 -->
            <button
              @click="handLogAction"
              class="btn btn-primary ms-2 d-flex justify-content-center align-items-center"
              style="font-size: 25px !important; height: 40px; line-height: 40px"
            >
              {{ loginStore.isLoggedIn ? "로그아웃" : "로그인" }}
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- 네비바 -->
  </div>
  <!-- 헤더 끝 -->
</template>

<script setup>
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { useNavigationStore } from "@/stores/movepage";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue"; //watch로 로그인 상태변화를 콘솔에 출력

const router = useRouter();
const navigationStore = useNavigationStore();
const loginStore = useLoginStore();
const { isLoggedIn } = storeToRefs(loginStore);

//페이지 로드 시 로그인 상태를 바로 확인한다.
onMounted(() => {
  loginStore.checkLoginStatus();
});

watch(isLoggedIn, (newValue) => {
  console.log("로그인 상태 변경: ", newValue);
});

const handLogAction = () => {
  if (isLoggedIn.value) {
    loginStore.handleLogout(); // 로그아웃 처리
  } else {
    router.push("/login"); // 로그인 페이지로 이동
  }
};
</script>

<style>
.header {
  background-color: #97c5f6;
}

.navbar-nav .nav-link {
  color: black !important;
  font-size: 15px;
}

.navbar-nav .nav-link:hover {
  color: #007bff !important;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

// 페이지가 로드될 때 로그인 상태 확인
onMounted(() => {
  checkLoginStatus();
});

.navbar-nav .nav-link {
  color: black !important;
  font-size: 15px;
  cursor: pointer;
}

.mainBt {
  color: black !important;
  font-size: 15px;
  cursor: pointer;
}
</style>
