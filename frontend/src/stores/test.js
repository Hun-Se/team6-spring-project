import { ref} from "vue";
import { defineStore, storeToRefs } from "pinia";
import { findById, findPassword, login } from "@/api/user";
import router from "@/router/index.js";
import { getTestList, getPostList, getPostByNo, getLikesPostList, toggleLikePost, getLikeByPostNo, getLikesList, searchPostList, searchMyPostList, getUserPostList } from '@/api/test';

//로그인 - lgt
export const useTestStore = defineStore("test", () => {
  const data = ref(null);  // 로그인 후 데이터를 저장할 상태?
  const error = ref(null); // 에러 메시지를 저장할 상태 => 이건 없어도 될 듯

  async function handleLogin(id, password) {
    try {
      const response = await login(id, password); // 로그인 함수 호출(import)
      data.value = response; // 입력받은 아이디와 비밀번호에 해당하는 값 저장(vo에 있는 것들..?)
      console.log(response);
      error.value = null; // 에러 초기화
      sessionStorage.setItem("userData", JSON.stringify(data.value)) // 문자열 또는 객체는 JSON형태로 받아와야 한다고 함
      sessionStorage.setItem("userNo", response.userNumber);
      alert("로그인 성공");
      console.log(data.value);
      router.push({ path: "/mainpage"});
      const userId = sessionStorage.getItem(userId);
    } catch (err) {
      error.value = err.message;
      alert(error.value); 
    }
  }
  return { data, error, handleLogin };
});



///댓글 피니아
export const useCommentStore = defineStore('comment', () => {

  const newCommentContent = ref('');
  const commentList = ref([])
  const postStore = usePostStore();
  const currentPostNo = ref(null);

  //댓글 목록 가져오는 함수
  const fetchComments = async (postNo) => {
    console.log(postNo);
    // const { postone } = storeToRefs(postStore);
    
    // currentPostNo.value = postone.value;
    // console.log(currentPostNo.value);
    try {
      const response = await axios.get(`http://localhost:9000/backend/api/comments/${postNo}`);
      commentList.value = response.data;
      console.log(commentList.value);
    } catch (error) {
      console.error('댓글 목록 가져오기 실패:', error);
      if(error.response && error.response.status === 204) { //204 : 컨텐트가 없다는 뜻
        commentList.value = []; //댓글이 없는 경우 빈 배열을 나오게 한다. 이건 오류가 아니니까.
      } else  {
        alert('댓글 목록을 불러오는데 실패했습니다.');
      }

    }
  };
  

  //댓글 등록 함수
  const newComment = async (comment) => {
    console.log(comment);

    if (!comment.postNo) {
      alert('게시글 정보를 찾을 수 없습니다.');
      return;
    }

    try {
        // content: newCommentContent.value,
        // postNo:  currentPostNo.value //컨트롤러에서도 매개로 받고, poststore에서 no를 받아온다. 앞에서 정의된 게시글 번호를 받는다. 
  
      const response = await axios.post('http://localhost:9000/backend/api/createComment', comment);
      console.log(response.data);

      // 성공 시 처리
      // newCommentContent.value = ''; // 입력 필드 초기화 : 이거는 해당 페이지에서 새로고침
      alert('댓글이 성공적으로 추가되었습니다.');

      //댓글 목록 새로고침
      await fetchComments(comment.postNo);

    } catch (error) {
      console.error('댓글 달기 실패:', error);
      if (error.response && error.response.status === 401) { //401: 인증이 필요하다는 뜻
        throw new Error('로그인이 필요합니다.');

      } else {
        throw new Error('댓글 달기에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  //댓글삭제 함수
  const handleDeleteComment = async (commentNo, postNo) => {
    try {
     await axios.delete(`http://localhost:9000/backend/api/deleteComment/${commentNo}`);
     console.log('댓글 삭제 완료');
     
     await fetchComments(postNo);

    }catch(error) {
      console.error('댓글 삭제 실패', error);
  }
  
  }

  return {newComment, newCommentContent, commentList, fetchComments, currentPostNo, handleDeleteComment};
})


//게시글 목록 가져오는 상태
export const usePostListStore = defineStore('postlist', () => {
  const postlist = ref([]);
  async function fetchPost() {
    console.log("Fetching postlist -- 화이팅");
    postlist.value = await getPostList();
    console.log("postlist--",postlist.value);
  }

  return { postlist, fetchPost }
})

//특정 게시글 db 가져오는 상태
export const usePostStore = defineStore('postByNo', () => {
  const postone = ref({});
  async function fetchPostone(postNo) {
    try {
      const response = await axios.get(`/api/post/${postNo}`);
      postone.value = response.data;
    } catch (err) {
      console.error('Error fetching post:', err);
      throw err;
    }
  }
  return { postone, fetchPostone };
});

// 특정 유저의 게시글 목록 가져오는 상태
export const useUserPostListStore = defineStore('userpostlist', () => {
  const userpostlist = ref([]);
  async function fetchUserPost() {
    const userNo = sessionStorage.getItem('userNo');
    console.log(userNo);
    if (!userNo) {
      console.error('userNo is undefined or null');
      return;
    }
    try {
      console.log("userpostlist -- 유저 포스트 리스트");
      userpostlist.value = await getUserPostList(userNo);
      console.log("userpostlist--", userpostlist.value);
    } catch (err) {
      console.error('Error fetching userpostlist:', err);
    }
  }

  return { userpostlist, fetchUserPost }
})


//특정 게시글 에 대한 좋아요 수db 가져오는 상태
export const useLikeCountStore = defineStore('likeByPostNo', () => {
  const likeCount = ref(0);
  async function fetchLikeCount(postNo) {
    try {
      likeCount.value = await getLikeByPostNo(postNo);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  }
  return { likeCount, fetchLikeCount };
});

//userNo 관리
export const useUserStore = defineStore('user', {
  state: () => ({
    userNo: sessionStorage.getItem('userNo') || null,
  }),
  actions: {
    setUserNo(userNo) {
      this.userNo = userNo;
      sessionStorage.setItem('userNo', userNo);
    },
    clearUserNo() {
      this.userNo = null;
      sessionStorage.removeItem('userNo');
    }
  }
});


//좋아요 게시글 가져오는 상태
export const usePostLikesListStore = defineStore('postlikeslist', () => {
  const postLikesList = ref([]);
  async function fetchLikesPost() {
    const userNo = sessionStorage.getItem('userNo');
    if (!userNo) {
      console.error('userNo is undefined or null');
      return; // userNo가 없는 경우 중단
    }
    try {
      postLikesList.value = await getLikesPostList(userNo);
      console.log("postlikeslist--", postLikesList.value);
    } catch (err) {
      console.error('Error fetching liked posts:', err);
    }
  }
  return { postLikesList, fetchLikesPost };
});

// 좋아요 리스트 정보 가져오는 상태
export const useLikesListStore = defineStore('likeslist', () => {
  const likesList = ref([]);
  async function fetchLikesList() {
    const userNo = sessionStorage.getItem('userNo');
    if (!userNo) {
      console.error('userNo is undefined or null');
      return; // userNo가 없는 경우 중단
    }
    try {
      likesList.value = await getLikesList(userNo);
      console.log("likeslist--", likesList.value);
    } catch (err) {
      console.error('Error fetching likes :', err);
    }
  }
  return { likesList, fetchLikesList };
});

// 좋아요 토글 상태
export const useLikeStore = defineStore('likeStore', () => {
  // 좋아요 추가
  async function insertLike(postNo) {
    try {
      const data = {
        postNo: postNo,
        userNo: sessionStorage.getItem('userNo'), // 유저 번호 세션에서 가져옴
      };
      await apiInsertLike(data);
      console.log('Like added successfully');
    } catch (err) {
      console.error('Error adding like:', err);
      throw err; // 에러를 상위로 전달
    }
  }

  // 좋아요 삭제
  async function deleteLike(postNo) {
    try {
      const likeNo = await getLikeNoByPost(postNo); // 해당 포스트에 대한 likeNo를 가져오는 함수 필요
      await apiDeleteLikeByNo(likeNo);
      console.log('Like deleted successfully');
    } catch (err) {
      console.error('Error deleting like:', err);
      throw err; // 에러를 상위로 전달
    }
  }

  return {
    insertLike,
    deleteLike,
  };
})

//메인화면 키워드 검색 상태
export const useSearchPostListStore = defineStore('searchpostlist', () => {
  const postlist = ref([]);
  async function searchPost(keyword) {
    console.log("searchpostlist --  키워드: ", keyword);
    const response = await searchPostList(keyword);
    if (response) {
      postlist.value = response;  // 검색된 결과를 postlist에 저장
    }
    console.log("검색된 결과:", postlist.value);
  }
  return { postlist, searchPost };
})

//마이페이지 키워드 검색 상태
export const useSearchMyPostListStore = defineStore('searchmypostlist', () => {
  const userpostlist = ref([]);
  async function searchMyPost(keyword) {
    const jsonData = sessionStorage.getItem('userData');
    
    if (!jsonData) {
      console.error('User data is missing in session storage');
      return;
    }
    const userData = JSON.parse(jsonData);
    const userNo = userData.userNumber;
    if (!userNo) {
      console.error('userNo is undefined or null');
      return;
    }

    console.log("searchmypostlist --  키워드: ", keyword);
    const response = await searchMyPostList(keyword);
    if (response) {
      userpostlist.value = response;  // 검색된 결과를 postlist에 저장
    }
    console.log("검색된 결과:", userpostlist.value);
  }
  return { userpostlist, searchMyPost };
})


//비밀번호찾기 -lgt
export const usefindStore = defineStore("findpassword", () => {
  const data = ref(null);  
  const error = ref(null); 

  async function findPw(id, name, email) {
    try {
      const response = await findPassword(id, name, email); 
      console.log("입력된 데이터 : " + response)
      data.value = response; 
      error.value = null;
      alert("설정된 비밀번호는" + data.value + "입니다");
      console.log(data.value);
      router.push({ path: "/login"});
    } catch (err) {
      error.value = err.message;
      alert(error.value); 
    }
  }
  return { data, error, findPw };
})

//아이디찾기 -lgt
export const useFindIdStore = defineStore("findid", () => {
  const data = ref(null);  
  const error = ref(null); 

  async function findId(name, email) {
    try {
      const response = await findById(name, email); 
      console.log("입력된 데이터 : " + response);
      

      data.value = response; 
      error.value = null;
      alert("설정된 아이디는 " + data.value + "입니다");
      router.push({ path: "/login" });
    } catch (err) {

      error.value = err.message;
      alert(error.value);
    }
  }
  
  return { data, error, findId };
})
