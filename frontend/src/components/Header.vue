<template>

 <!-- 헤더 시작 -->
 <div class="header fixed-top" style="height: 8vh;">
      <!-- 네비바 -->
      <nav class="navbar navbar-expand-lg navbar-dark w-100 h-100 d-flex flex">
        <div class="container-fluid">
          <div class="d-flex align-items-center">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/stickers/50/airplane-take-off.png"
              alt="airplane-take-off"
              @click="goToMain()"
            />
            <a class="navbar-brand ms-2 fw-bold" style="font-size: 30px" @click="goToMain()"
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

          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav justify-content-center align-items-center fw-bold" style="color:black !important">
              <a class="nav-link" href="#serch">여행지</a>

              <a class="nav-link" href="#">계획 등록</a>

              <a class="nav-link" href="#">마이페이지</a>

              <button @click="storeLog.log()" class="btn btn-primary ms-2">{{ startBt }}</button>
            </div>
          </div>
        </div>
      </nav>
      <!-- 네비바 -->
    </div>
    <!-- 헤더 끝 -->


</template>

<script setup>

import { ref } from "vue";
import { useTestStore } from "@/stores/user";
import { storeToRefs } from "pinia";


const storeLog = useTestStore();
const { startBt } = storeToRefs(storeLog);



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

body {
  padding-top: 8vh;
}

</style>