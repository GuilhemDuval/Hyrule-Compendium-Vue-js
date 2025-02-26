import {createRouter, createWebHistory} from 'vue-router'

import item_gallery from "@/components/item_gallery.vue"
import item_single from "@/components/item_single.vue"

const routes = [
    { path: '/', component: item_gallery},
    { path: '/:path_id', component: item_single},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export {router}