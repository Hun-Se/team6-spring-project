<template>
  <SecondHeader></SecondHeader>

  <!-- 몸통 -->

  <!-- 전체몸통 -->
  <div class="d-flex flex-column">
    <!-- 상단 몸통 -->
    <div class="d-flex flex-row mt-10 justify-content-center" style="height: 450px">
      <div
        class="d-flex justify-content-between mt-4"
        style="width: 1700px; margin: 0 auto"
      >
        <!-- 왼쪽 컨텐츠 -->
        <div
          class="position-relative"
          style="width: 1200px; height: 400px; overflow: hidden"
        >
          <video
            autoplay
            loop
            muted
            class="position-absolute"
            style="width: 100%; height: 100%; object-fit: cover"
          >
            <source src="@/assets/trip.mp4" type="video/mp4" />
          </video>
        </div>

        <div>
         <!-- 오른쪽 프로필2 -->
         <div v-if="!isLoggedIn" class="card" style="width: 450px; height: 400px">
          <div
            class="card-body d-flex flex-column justify-content-center align-items-center"
          >
            <div
              class="card shadow d-flex justify-content-center align-items-center"
              style="width: 380px; height: 280px"
            >
              <p class="text-center mb-0 fs-4" style="font-size: 40px !important">
                로그인이 필요합니다.
              </p>
            </div>

            <span class="mt-4">어서오세요~! 여행후기를 보고싶다면 I.Go!</span>

          </div>
        </div> 
        <!-- 오른쪽 프로필2 끝 -->

        <!-- 오른쪽 프로필 -->
        <div v-else class="card" style="width: 450px; height: 400px">
          <div class="card-body d-flex flex-column align-items-center">
            <div class="card shadow" style="width: 380px; height: 280px">
              <div class="d-flex flex-row p-4">
                <!-- 사진 컨테이너 -->
                <div
                  class="d-flex justify-content-center align-items-center rounded-circle overflow-hidden shadow"
                  style="width: 150px; height: 150px; flex-shrink: 0"
                >
                  <img
                    src="https://dcimg1.dcinside.com/viewimage.php?id=23b2de21e1d335a161b2&no=24b0d769e1d32ca73dea81fa11d028311869dac7d33bec80aa651ee0dd05d26f31aa190ab157783060f4f76fa59e2635ad3463abbc4bac0bc7f0edc4feada421976851ef383b38252aebfd5a9ef121e854"
                    class="w-100 h-100 object-fit-cover"
                    alt="프로필 이미지"
                  />
                </div>

                <!-- 키워드 -->
                <div
                  class="d-flex flex-column justify-content-center align-items-center ms-3"
                  style=""
                >
                  <h3 class="fw-bold text-dark" style="font-size: 70px !important">
                    {{ userData.userName }} 님
                  </h3>

                  <div class="mt-2">
                    <div class="d-flex flex-wrap">
                      <span
                        v-for="(value, key) in keywordData"
                        :key="key"
                        class="badge rounded-pill text-dark me-1 mb-1"
                        style="
                          font-size: 0.8em;
                          padding: 5px 10px;
                          background-color: #a7e6ff;
                        "
                      >
                        {{ value }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 키워드끝 -->
              </div>
            </div>
       
              <span class="mt-4">어서오세요~! 여행후기를 보고싶다면 I.Go!</span>
  
            
          </div>
        </div>
        <!-- 오른쪽 프로필 끝 -->
      </div>

       
      </div>
    </div>
    <!-- 상단 몸통 끝 -->

    <!-- 하단 몸통 -->
    <div class="d-flex flex-column align-items-center p-2" style="min-height: 100vh">
      <div
        class="d-flex flex-column align-items-center mt-5"
        style="max-width: 1200px; width: 100%"
        id="search"
      >
        <h1 class="mt-4 mb-5 fw-bold" style="font-size: 40px">
          어디로 여행을 떠나볼까요?
        </h1>
        <div
          class="mt-3 mb-4 d-flex flex-row align-items-center"
          style="width: 100%; max-width: 600px"
        >
        <input class="form-control" v-model="keyword" placeholder="검색어 입력" />
        <i class="bi bi-search ms-2 mt-2" style="cursor: pointer;" @click="searchPost"></i>
        </div>
      </div>

      <div class="container mt-5" style="max-width: 1200px">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div class="col" v-for="(card, index) in postlist" :key="index">
            <div class="card h-100" @click="getpostid(card.postNo)">
              <img
                :src="card.img"
                class="card-img-top"
                alt="..."
                style="height: 140px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <a class="text-gray-700 fw-bold">{{ card.userId }} - {{ card.postNo }}</a>
                <p class="card-text flex-grow-1">{{ card.postTitle }}</p>
                <i
                  class="bi"
                  :class="[isHeartFilled ? 'bi-heart-fill' : 'bi-heart']"
                  @click.stop="toggleHeart"
                  style="font-size: 1.25rem; cursor: pointer"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 mb-5">
        <button
          @click="checkLoginStatus"
          class="btn btn-primary mt-5 fs-5 px-4 py-2"
          style="font-size: 30px !important"
        >
          글쓰기
        </button>
      </div>
    </div>
  </div>

  <!-- 글 작성 모달 START -->
  <!--begin::대화상자 - 검사일정수정 -->
  <div class="modal fade" id="kt_modal_new_target" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::닫기 아이콘-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <i class="ki-duotone ki-cross fs-1">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <!--end::닫기 아이콘-->
        </div>

        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <form id="kt_modal_new_target_form" class="form" action="#">
            <!--begin::제목-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">글쓰기</h1>
              <!--end::Title-->
              <!--begin::Description-->
              <div class="text-muted fw-semibold fs-5" style="font-size: 24px !important">
                글의 제목, 이미지, 내용을 입력해주세요.
              </div>
              <!--end::Description-->
            </div>
            <!--end::제목-->

            <!--begin::이름 입력상자-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                <span class="required" style="font-size: 24px !important">제목</span>
                <span
                  class="ms-1"
                  data-bs-toggle="tooltip"
                  title="제목을 입력하세요. 필수랍니다~"
                >
                  <i class="ki-duotone ki-information-5 text-gray-500 fs-6">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </span>
              </label>
              <input
                type="text"
                class="form-control form-control-solid"
                name="target_title"
                v-model="titleInput"
              />
            </div>
            <!--end::이름 입력상자-->
            <!-- 이미지 선택 START -->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                <span class="required" style="font-size: 24px !important">파일 선택</span>
              </label>
              <input type="file" id="image" @change="onFileChange" ref="image" />
            </div>
            <!-- 이미지 선택 END -->
            <!--begin::내용 입력상자-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                <span class="required" style="font-size: 24px !important">내용</span>
                <span
                  class="ms-1"
                  data-bs-toggle="tooltip"
                  title="내용을 입력하세요. 필수랍니다~"
                >
                  <i class="ki-duotone ki-information-5 text-gray-500 fs-6">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                </span>
              </label>
              <textarea
                class="form-control form-control-solid"
                name="target_content"
                v-model="contentInput"
                rows="5"
              ></textarea>
            </div>
            <!--end::내용 입력상자-->
            <!-- start::키워드 선택상자 -->
            <!--begin::키워드-->
            <div class="fv-row mb-8 mt-8">
              <fieldset
                style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px"
              >
                <!--begin::mbti-->
                <div class="form-group mt-3">
                  <label for="mbti">MBTI</label>
                  <select
                    v-model="mbtiInput"
                    id="mbti"
                    name="mbti"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INTJ">INTJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="INFP">INFP</option>
                    <option value="INTP">INTP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ENTP">ENTP</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENTJ">ENTJ</option>
                  </select>
                </div>
                <!--end::mbti-->

                <div class="form-group mt-3">
                  <label for="category">구분</label>
                  <select
                    v-model="sortInput"
                    id="number"
                    name="number"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="개인">개인</option>
                    <option value="단체">단체</option>
                  </select>
                </div>

                <div class="form-group mt-3">
                  <label for="region">선호 지역</label>
                  <select
                    v-model="locationInput"
                    id="location"
                    name="location"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종특별자치시">세종특별자치시</option>
                    <option value="제주도">제주도</option>
                  </select>
                </div>

                <div class="form-group mt-3">
                  <label for="preference">여행 취향</label>
                  <select
                    v-model="typeInput"
                    id="type"
                    name="type"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="익스트림">익스트림</option>
                    <option value="힐링">힐링</option>
                  </select>
                </div>

                <div class="form-group mt-3">
                  <label for="transport">이동수단</label>
                  <select
                    v-model="mobilityInput"
                    id="mobility"
                    name="mobility"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="뚜벅이">뚜벅이</option>
                    <option value="차">차</option>
                    <option value="대중교통">대중교통</option>
                  </select>
                </div>

                <div class="form-group mt-3">
                  <label for="accommodation">숙소</label>
                  <select
                    v-model="houseInput"
                    id="house"
                    name="house"
                    class="form-control"
                    style="cursor: pointer"
                  >
                    <option value="" disabled>선택하기</option>
                    <option value="게스트하우스">게스트하우스</option>
                    <option value="호텔">호텔</option>
                    <option value="펜션">펜션</option>
                    <option value="캠핑">캠핑</option>
                  </select>
                </div>
              </fieldset>
            </div>

            <!--end::키워드-->
            <!-- end:: 키워드 선택상자 -->
            <!--begin::하단버튼-->
            <div class="text-center">
              <button type="button" class="btn btn-primary" @click="createPost()">
                저장
              </button>
              <button type="reset" class="btn btn-light ms-3" @click="clearAll()">
                모두 지우기
              </button>
            </div>
            <!--end::하단버튼-->
          </form>
          <!--end:Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::대화상자 - 검사일정수정-->
  <!-- 글 작성 모달 END -->
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { usePostListStore, usePostStore, useSearchPostListStore, useUserPostListStore, usePostLikesListStore, useLikeStore } from "@/stores/test";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { insertPost, insertPostAndKeyword } from "@/api/test";
import { Modal } from "bootstrap";
import SecondHeader from "../components/SecondHeader.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { useLoginStore } from "@/stores/login";

// 스토어 및 라우터 설정
const router = useRouter();
const loginStore = useLoginStore();
const searchStore = useSearchPostListStore();
const postStore = usePostStore();
const store = usePostListStore();
const userPostStore = useUserPostListStore();
const likesStore = usePostLikesListStore();
const likeStore = useLikeStore();

// storeToRefs 사용
const { isLoggedIn } = storeToRefs(loginStore);
const { postlist } = storeToRefs(store);
const postone = storeToRefs(postStore);
const { userpostlist } = storeToRefs(userPostStore);
const { postLikesList } = storeToRefs(likesStore);
const { postInLike } = storeToRefs(likeStore);

// ref 변수 선언
const keyword = ref("");
const selectedFile = ref(null);
const userData = ref({});
const isHeartFilled = ref(false);
const selectedOption = ref('myPosts');
const displayedPosts = ref([]);

// 입력 필드 ref 변수들
const titleInput = ref("");
const contentInput = ref("");
const mbtiInput = ref("");
const sortInput = ref("");
const locationInput = ref("");
const typeInput = ref("");
const mobilityInput = ref("");
const houseInput = ref("");

// 모달 변수
let createPostModal;

// 사용자 데이터 로드 함수
const loadUserData = () => {
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  if (storedUserData) {
    userData.value = storedUserData;
  }
};

// 키워드 데이터 computed 속성
const keywordData = computed(() => {
  if (!userData.value) {
    return {};
  }

  return {
    MBTI: userData.value.keywordMbti,
    여행유형: userData.value.keywordSort,
    선호지역: userData.value.keywordLocation,
    여행타입: userData.value.keywordType,
    이동수단: userData.value.keywordMobility,
    숙소유형: userData.value.keywordHouse,
  };
});

// 초기화 함수 수정
async function init() {
  await store.fetchPost();
  loadUserData(); // 사용자 데이터 로드
  console.log("사용자 데이터:", userData.value);
  console.log("키워드 데이터:", keywordData.value);
}

// 컴포넌트 초기화
onMounted(() => {
  init();
  console.log("로그인 상태:", isLoggedIn.value);
});

// 검색 함수 수정
async function searchPost() {
  if (keyword.value.trim()) {
    await searchStore.searchPost(keyword.value);
    console.log("검색된 포스트 목록:", searchStore.postlist);
  } else {
    await store.fetchPost();
  }
}

// 이미지 관련 함수
const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!selectedFile.value) return null;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const response = await axios.post(
      "http://localhost:9000/backend/api/auth/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image", error);
    return null;
  }
};

// 포스트 관련 함수
async function getpostid(id) {
  console.log("Clicked post ID:", id);
  await postStore.fetchPostone(id);
  console.log("Fetched post data:", postone);
  router.push({ name: 'post', params: { postNo: id } });
}

async function createPost() {
  const imagePath = await uploadImage();

  const postData = {
    postTitle: titleInput.value,
    content: contentInput.value,
    userNo: sessionStorage.getItem("userNo"),
    img: imagePath || "",
  };

  const keywordData = {
    keywordMbti: mbtiInput.value,
    keywordSort: sortInput.value,
    keywordLocation: locationInput.value,
    keywordType: typeInput.value,
    keywordMobility: mobilityInput.value,
    keywordHouse: houseInput.value,
  };

  try {
    const response = await insertPostAndKeyword(postData, keywordData);
    console.log("서버 응답: ", response);
    createPostModal.hide();
    router.go(0);
  } catch (error) {
    console.error(error);
  }
}

// 로그인 상태 확인 함수
const checkLoginStatus = () => {
  const userData = sessionStorage.getItem("userData");
  if (!userData) {
    alert("로그인 후 이용 가능합니다.");
    router.push({ path: "/login" });
  } else {
    showCreatePostModal();
  }
};

// 모달 관련 함수
function showCreatePostModal() {
  const elem = document.querySelector("#kt_modal_new_target");
  createPostModal = new Modal(elem);
  createPostModal.show();
}

// 기타 유틸리티 함수
function toggleHeart() {
  isHeartFilled.value = !isHeartFilled.value;
}

function goToMain() {
  router.push({ path: "/" });
}
</script>

<style></style>
