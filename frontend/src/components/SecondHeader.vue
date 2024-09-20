<template>
<!-- 헤더 -->
<div class="header fixed-top" style="height: 11vh; z-index: 1000">
<!-- 네비바 -->
    <nav
      class="navbar navbar-expand-lg w-100 h-100 d-flex flex"
      style="background: linear-gradient(to bottom, #f8f9fa, #e9ecef)"
    >
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <img
            class="ms-4"
            width="50"
            height="50"
            src="https://img.icons8.com/stickers/50/airplane-take-off.png"
            alt="airplane-take-off"
            @click="navigationStore.goToMain(router)"
          />
          <a
            class="navbar-brand ms-2 fw-bold"
            style="font-size: 30px; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5)"
            @click="navigationStore.goToMain(router)"
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
          <div class="navbar-nav justify-content-center align-items-center fw-bold me-5">
            <a
              class="nav-link me-3 text-center"
              style="font-size: 30px !important"
              href="#serch"
              >여행지</a
            >
            
            <a
              class="nav-link me-5 text-center"
              style="font-size: 30px !important"
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
  <!-- 헤더 -->

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

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

body {
  padding-top: 8vh;
}

.startBt {
  background-color: #5ab2ff;
}

.startBt:hover {
  background-color: #bdc7f9;
}

/* 네비바 스크롤 효과 */
.navbar {
  transition: all 0.3s ease-in-out;
}

.navbar.scrolled {
  background: rgba(248, 249, 250, 0.9) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 네비바 링크 호버 효과 */
.navbar .nav-link {
  position: relative;
  transition: color 0.3s ease;
}

.navbar .nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.navbar .nav-link:hover::after {
  width: 100%;
}

/* 로고 호버 효과 */
.navbar-brand {
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

/* 버튼 호버 효과 */
.startBt {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.startBt:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-brand,
.nav-link,
[role="button"],
button,
a,
[onclick],
[data-bs-toggle],
[data-bs-target] {
  cursor: pointer;
}

/* 이미지에 대한 커서 스타일 (필요한 경우) */
img[onclick] {
  cursor: pointer;
}

/* 네비바 링크 호버 효과 수정 */
.navbar .nav-link {
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
}

/* 로고 호버 효과 수정 */
.navbar-brand {
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* 버튼 호버 효과 수정 */
.startBt {
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

</style>