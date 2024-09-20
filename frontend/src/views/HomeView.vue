<template>
  <Header>
   
  </Header>
  <div class="d-flex flex-column justify-content-center align-items-center vw-100" style="width:1500px; background-color: #f6f6f6">
   
   

    <div class="d-flex flex-row mt-5" style="height: 400px">
     <!-- 몸 1 : 로그인 전-->
      <div
        v-if="startBt == '로그인'"
        class="card shadow d-flex justify-content-center align-items-start m-2 ms-3"
        style="width: 1000px; max-width: 700px;"
      >
        <div class="ms-2 p-5">
          <h1 class="fw-bold">여행을 계획할 땐, I GO!</h1>
          <span>막막했던 여행? I,Go와 함께 가요!</span>
        </div>
      </div>
      <!-- 몸 1 : 로그인 전 끝-->

      <!-- 몸1 : 로그인 후 -->
      <div
        v-if="startBt == '로그아웃'"
        class="card shadow d-flex justify-content-center align-items-start m-2 ms-3"
        style="width: 1000px; max-width: 700px;"
      >
        <div class="d-flex flex-row ms-2 p-5 w-100">
          <!-- 사진 컨테이너: Flexbox를 사용해 좌측 중앙에 고정 -->
          <div
            class="d-flex justify-content-center align-items-center rounded-circle overflow-hidden shadow"
            style="width: 200px; height: 200px"
          >
            <img
              src="https://dcimg1.dcinside.com/viewimage.php?id=23b2de21e1d335a161b2&no=24b0d769e1d32ca73dea81fa11d028311869dac7d33bec80aa651ee0dd05d26f31aa190ab157783060f4f76fa59e2635ad3463abbc4bac0bc7f0edc4feada421976851ef383b38252aebfd5a9ef121e854"
              class="w-100 h-100"
            />
          </div>

          <div
       
            class="d-flex flex-column justify-content-center align-items-start flex-grow-1 ms-4"
          >
            <h2 class="fw-bold">{{ userData.userName }}님!</h2>
            <p style="font-size: 12px; color: gray">{{ userData.userId }}</p>
            <div class="d-flex align-items-center mt-2">
              <p class="me-2 mb-0">나의 여행:</p>
              <p class="mb-0">{{ user.post }} 개</p>
            </div>

            <div class="mt-4">
              <div class="d-flex flex-wrap justify-content-start">
                <p
                  v-for="(value, key) in keywordData"
                  :key="key"
                  class="badge rounded-pill text-dark me-2 mb-3"
                  style="
                    font-size: 0.9em;
                    padding: 8px 15px;
                    background-color: #a7e6ff;
                    flex-basis: calc(33.33% - 10px);
                  "
                >
                  {{ value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 몸1 : 로그인 후 끝 -->

      <!-- 상단 몸 -->
      <div
  class="card shadow d-flex d w-100 m-2 me-3"
  style="height: 385px; width: 200px; max-width: 750px;  overflow: hidden;"
>
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active d-flex justify-content-center align-items-center">
      <img src="@/assets/cat.jpg" class="d-block w-85 h-100" alt="...">
    </div>
    <div class="carousel-item active d-flex justify-content-center align-items-center">
      <img src="@/assets/cat.jpg" class="d-block w-85 h-100" alt="...">
    </div>
    <div class="carousel-item active d-flex justify-content-center align-items-center">
      <img src="@/assets/cat.jpg" class="d-block w-85 h-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>


      <!-- 상단 몸2 -->
    </div>
    <!-- 몸1 끝-->

    <!-- 몸2 : 영상 -->
    <div
      class="d-flex justify-content-center align-items-center mt-4 overflow-hidden"
      style="height: 500px"
    >
   
      <video width="1500px" height="" controls autoplay roop muted>
       <source src="@/assets/trip.mp4">
      </video>
    </div>
    <!-- 몸2영상 -->

    <div
      class="d-flex flex-column align-items-center mt-5"
      style="height: 1200px"
      id="serch"
    >
      <h1 class="mt-4 mb-5 fw-bold">어디로 여행을 떠나볼까요?</h1>
      <div class="mt-3 mb-4 d-flex" style="width: 800px; height: 50px">
        <input
          class="form-control shadow"
          type="search"
          placeholder="원하시는 여행지를 검색해보세요."
        />
        <i type="submit" class="bi bi-search ms-3" style="font-size: 30px"></i>
      </div>

      <!-- v-for로 처리할 것 -->
      <div class="d-flex flex-row flex-row gap-4 mt-5">
        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/359937836_682922003657771_717380477542506344_n.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <i
              class="bi"
              :class="[isHeartFilled ? 'bi-heart-fill' : 'bi-heart']"
              @click="toggleHeart"
              style="
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: 1.5rem;
                cursor: pointer;
              "
            ></i>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/358520758_1425769678257003_8801872512201663407_n-1024x576.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text"></p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsPcDmVQ7u6x315pDLliwgAQ9EAW9Q3RQUXkXHbCxw-ep4qxs192Pfxfot_BaaHGqsjs&usqp=CAU"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GVBVGHhSqD5PB4yGrzU7BybAJLGwkPQiA&s"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row flex-row gap-4 mt-5">
        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/359937836_682922003657771_717380477542506344_n.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/358520758_1425769678257003_8801872512201663407_n-1024x576.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsPcDmVQ7u6x315pDLliwgAQ9EAW9Q3RQUXkXHbCxw-ep4qxs192Pfxfot_BaaHGqsjs&usqp=CAU"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GVBVGHhSqD5PB4yGrzU7BybAJLGwkPQiA&s"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row flex-row gap-4 mt-5">
        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/359937836_682922003657771_717380477542506344_n.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://ynoblesse.com/wp-content/uploads/2023/07/358520758_1425769678257003_8801872512201663407_n-1024x576.jpg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsPcDmVQ7u6x315pDLliwgAQ9EAW9Q3RQUXkXHbCxw-ep4qxs192Pfxfot_BaaHGqsjs&usqp=CAU"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>

        <div class="card" style="width: 18rem">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE6GVBVGHhSqD5PB4yGrzU7BybAJLGwkPQiA&s"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </div>
      </div>
      <!-- v-for -->
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup >
import { ref, onMounted, computed } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useTestStore, useTestData } from "@/stores/user"; //pinia store가져오기
import { storeToRefs } from "pinia"; //store 상태

const isHeartFilled = ref(false);
const storeLog = useTestStore(); //저장소에서 빼내온 것
const storeData = useTestData();

//저장소에서 빼내온 걸 인식시킨다. 
const { startBt } = storeToRefs(storeLog);
const { user } = storeToRefs(storeData); 


// userData를 담을 ref 변수 생성
const userData = ref({});

// 세션에서 유저 데이터를 불러오는 함수
const loadUserData = () => {
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  if (storedUserData) {
    userData.value = storedUserData; // 데이터를 ref에 저장
  }
};

//키워드만 가져오는 computed 생성 : 
//computed 속성을 생성하여 필요한 키워드 데이터만 추출. 이 속성은 userData가 변경될 때마다 자동으로 업데이트
const keywordData = computed(()=> {
  return {
    MBTI: userData.value.keywordMbti,
    여행유형: userData.value.keywordSort,
    선호지역: userData.value.keywordLocation,
    여행타입: userData.value.keywordType,
    이동수단: userData.value.keywordMobility,
    숙소유형: userData.value.keywordHouse
  };
})

//db에서 데이터 가져오기 
onMounted(() => {
  loadUserData();
  init();
})

const init = async() => {
  await storeData.useTestData;
}



function toggleHeart() {
  isHeartFilled.value = !isHeartFilled.value;
}

</script>

<style scoped>
.bi-heart {
  color: gray; /* 기본 하트 색상 */
}

.bi-heart-fill {
  color: red; /* 하트가 채워졌을 때 색상 */
}


</style>
