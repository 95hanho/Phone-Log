import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/LoginMain';
import Search from '@/components/SearchMain';
import UserInput from '@/components/UserInput';
import VueCookies from 'vue-cookies';
import { store } from '@/store/vuex';
import EventBus from '@/eventBus/event-bus'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            meta: { unauthorized: true }
        },
        {
            path: '/Search',
            name: 'Search',
            component: Search,
        },
        {
            path: '/UserInput',
            name: 'UserInput',
            component: UserInput
        }
    ]
})

export default router

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.unauthorized)){
        if(VueCookies.get('accessToken') && VueCookies.get('refreshToken')){
            return next('/Search');
        }
        return next();
    }

    if(!VueCookies.get('accessToken') && VueCookies.get('refreshToken')){
        store.dispatch('reToken', VueCookies.get('refreshToken'))
        .then((res) => {
            console.log(res);
            if(to.name == 'Search'){
                EventBus.$emit('reLoginInfo');
            }
        }).catch((err) => {
            alert(err);
            return next('/');
        });
    } else if(!VueCookies.get('refreshToken')){
        alert('로그인 세션이 만료되었습니다.');
        return next('/');
    }

    
    return next();
})