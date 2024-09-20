import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
    actions: {

        goToMain(router) { //메인
            router.push('/')
        },

        goToLogin(router) { //로그인
            router.push('/login')
        },

        goToSignUp(router) { //회원가입
            router.push('/signup')
        },

        goToMypage(router) { //마이페이지
            router.push('/mypage')
        }



    }
})
