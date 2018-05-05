import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/registration',
        icon: 'social-buffer',
        name: 'registration',
        title: '挂号',
        component: Main,
        children: [
            {
                path: 'add',
                icon: 'compose',
                name: 'add',
                title: '病人登记',
                component: () => import('@/views/my-projects/registration/add.vue')
            },
            {
                path: 'search',
                icon: 'compose',
                name: 'search',
                title: '病人查询',
                component: () => import('@/views/my-projects/registration/search.vue')
            },
        ]
    },
    {
        path: '/drug-manage',
        icon: 'social-buffer',
        name: 'drug-manage',
        title: '药库管理',
        component: Main,
        children: [
            {
                path: 'add',
                icon: 'compose',
                name: 'drug-manage-add',
                title: '药品信息登记',
                component: () => import('@/views/my-projects/drug-manage/add.vue')
            },
            {
                path: 'search',
                icon: 'compose',
                name: 'drug-manage-search',
                title: '药品信息查询',
                component: () => import('@/views/my-projects/drug-manage/search.vue')
            },
        ]
    },
    {
        path: '/bed-manage',
        icon: 'social-buffer',
        name: 'bed-manage',
        title: '床位管理',
        component: Main,
        children: [
            {
                path: 'add',
                icon: 'compose',
                name: 'bed-manage-add',
                title: '床位信息登记',
                component: () => import('@/views/my-projects/bed-manage/add.vue')
            },
            {
                path: 'search',
                icon: 'compose',
                name: 'bed-manage-search',
                title: '床位信息查询',
                component: () => import('@/views/my-projects/bed-manage/search.vue')
            },
        ]
    },
    {
        path: '/hospital-manage',
        icon: 'social-buffer',
        name: 'hospital-manage',
        title: '出入院管理',
        component: Main,
        children: [
            {
                path: 'in',
                icon: 'compose',
                name: 'hospital-manage-in',
                title: '挂号病人入院',
                component: () => import('@/views/my-projects/hospital-manage/in.vue')
            },
            {
                path: 'out',
                icon: 'compose',
                name: 'hospital-manage-out',
                title: '病人出院',
                component: () => import('@/views/my-projects/hospital-manage/out.vue')
            },
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
