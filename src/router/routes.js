// 该文件用于书写路由配置信息
// 引入路由组件
// 路由懒加载 路由被访问的时候才加载对应组件，更高效
const Home = () => import('@/pages/Home/index.vue')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')

export default [
    {
        name: 'home',
        path: '/home',
        component: Home,
        // 路由元信息 存放footer是否展示的标识
        meta: { showFooter: true, showInput: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { showFooter: true, showInput: true }
    },
    {
        name: 'detail',
        path: '/detail/:skuId', //params参数
        component: Detail,
        meta: { showFooter: true, showInput: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { showFooter: true, showInput: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            let fromPath = from.path
            if (fromPath.indexOf('/detail') != -1) { // 从detail组件来才能放行
                next()
            } else {
                next(false)//不跳转
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { showFooter: true, showInput: false }
    },
    {
        name: 'Trade',
        path: '/trade',
        component: Trade,
        meta: { showFooter: true, showInput: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            let fromPath = from.path
            if (fromPath.indexOf('/shopcart') != -1) { // 从shopcart组件来才能放行
                next()
            } else {
                next(false)//不跳转
            }
        }
    },
    {
        name: 'Pay',
        path: '/pay/:orderId?',//传递params参数：订单编号
        component: Pay,
        meta: { showFooter: true, showInput: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            let fromPath = from.path
            if (fromPath.indexOf('/trade') != -1) { // 从trade组件来才能放行
                next()
            } else {
                next(false)//不跳转
            }
        }
    },
    {
        name: 'PaySuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { showFooter: true, showInput: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            let fromPath = from.path
            if (fromPath.indexOf('/pay') != -1) { // 从pay组件来才能放行
                next()
            } else {
                next(false)//不跳转
            }
        }
    },
    {
        name: 'Center',
        path: '/center',
        component: Center,
        meta: { showFooter: true, showInput: false },
        children: [ //嵌套路由
            {
                name: 'MyOrder',
                path: 'myorder',
                component: MyOrder,
            },
            {
                name: 'GroupOrder',
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder' // 重定向为myorder
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { showFooter: false, showTypeNav: false }
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { showFooter: false, showTypeNav: false }
    },
    // 重定向
    {
        path: '/',  // 或者'*'
        redirect: '/home'
    },
]