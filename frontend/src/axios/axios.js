import axios from 'axios'
import VueCookies from 'vue-cookies'
import { store } from '@/store/vuex'
import router from '@/router'

// 요청 전 처리
axios.interceptors.request.use((config) =>{
    //console.log(config);
    //console.log(config.data);
    //console.log(config.url);
    /*
    ※ config 설정(요청 떄 보내는 모든 것)
    */
    config.timeout = 60000; // 요청시간 1분이상은 실패

    if(!config.url.includes('reToken') && !config.url.includes('login')){
        if(!VueCookies.get('accessToken') && VueCookies.get('refreshToken')){
            store.dispatch('reToken', VueCookies.get('refreshToken'))
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                alert(err);
                router.push({ name : 'Login'});
            });
        } else if(!VueCookies.get('refreshToken')){
            alert('로그인 세션이 만료되었습니다.');
            router.push({ name : 'Login'});
        }
    }

    return config;

}, (error) => {
    console.log('axios request error : ', error);
    return Promise.reject(error);
});

// 요청 후 처리
axios.interceptors.response.use(async (response) => {
    // response에는 요청 때 보낸 config와 결과데이터, 결과정보가 담겨있음
    //console.log(response);

    return response;
}, (error) => {
    console.log('axios response error : ', error);
    if(error.message == 'Request failed with status code 429'){
        alert('과도한 요청으로 잠시 후 다시 시도해 주세요.');
    }
    return Promise.reject(error);
});

export default axios;