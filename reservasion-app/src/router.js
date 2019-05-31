import Vue from "vue";
import Router from "vue-router";

//プラグインとして登録
Vue.use(Router);

//VueRouterインスタンスを生成
export default new Router({
  //ヒストリーモード
  mode: "history",
  base: process.env.BASE_URL,
  //ルーティングの定義
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
