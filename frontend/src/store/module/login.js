//import axios from 'axios'
//import Crypto from 'crypto'
import VueCookies from 'vue-cookies'
import Jwt from 'jsonwebtoken'
import axios from 'axios';
//import axios from 'axios';

export const login = {
    state: {
        jwt_secret : 'HanHo',
    },
    mutations: {
        setRefreshToken(state){
            const refreshToken = Jwt.sign({}, state.jwt_secret, {
                expiresIn: '7d',
                issuer: 'hhs',
                subject: 'loginInfo'
            });
            VueCookies.set('refreshToken', refreshToken, '1800s');
        },
        setAccessToken(state, value){
            const accessToken = Jwt.sign({ id: value.id, logis_code: value.logis_code, logis_pwd: value.logis_pwd}, state.jwt_secret, {
                expiresIn: '1d',
                issuer: 'hhs',
                subject: 'loginInfo'
            });
            VueCookies.set('accessToken', accessToken, '300s');
        },
        reRefreshToken(){
            VueCookies.set('refreshToken', VueCookies.get('refreshToken'), '1800s');
        },
        logout(){
            VueCookies.remove('accessToken');
            VueCookies.remove('refreshToken');
        },
    },
    getters: {
    },
    actions:{
        reToken: (store, value) => {
            return new Promise((resolve, reject) => {
                axios.post('cdrapi/reToken', {
                    authority : value})
                .then((res) => {
                    if(res.data == 'fail'){
                        store.commit('logout');
                        reject('retoken error');
                    } else {
                        const userReg = /id=(?<id>.*), password(?:.)*logis_code=(?<logis_code>.*), logis_pwd=(?<logis_pwd>.*)/g;
                        const userData = userReg.exec(res.data);
                        store.commit('setAccessToken', userData.groups);
                        store.commit('reRefreshToken');
                        resolve('retoken success');
                    }
                }).catch(() => {
                    store.commit('logout');
                    reject('retoken server error');
                });
            });
        },
        loginInfo: (store, value) => {
            return new Promise((resolve, reject) => {
                let loginInfo = '';
                try {
                    loginInfo = Jwt.verify(value, store.state.jwt_secret);
                    resolve(loginInfo);
                } catch {
                    store.commit('logout');
                    reject('장시간 로그인으로 인한\n로그인 토큰시간 만료');
                }
            });
        }
    }
}
