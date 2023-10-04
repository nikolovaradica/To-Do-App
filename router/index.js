import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',
            component: () => import('../components/HomePage'),
            meta: {
                requiresAuth: true,
            }
        },
        { path: '/authentication', component: () => import('../components/Authentication') }
    ]
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async(to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        if(await getCurrentUser()) {
            next()
        } else {
            next('/authentication')
        }
    }
    else{
        next()
    }
})

export default router