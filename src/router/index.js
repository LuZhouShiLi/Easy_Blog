import {createRouter,createWebHistory} from 'vue-router'

const routes = [
    {
        name:'登录',
        path:'/login',
        component:() =>import('../views/Login.vue'),
    },
    {
        name:'首页',
        path:'/home',
        component:() => import('../views/FrameWork.vue'),
    }
];

// 这里不是通过New来创建 使用的模式不是通过mode来定义

const router =  createRouter({
    routes,
    history:createWebHistory(),
})


// router.beforeEach((to,from,next)=>{
//     const userInfo = VueCookies.get("userInfo");

//     if(!userInfo && to.path != "/login"){
//         router.push("/login");
//     }
//     next();
// })

export default router