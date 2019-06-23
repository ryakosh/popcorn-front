import Vue from "vue";
import Router from "vue-router";

// Views
import Home from "./views/Home.vue";
import MovieDetails from "./views/MovieDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Home },
    { path: "/movies/:id", name: "movie", component: MovieDetails }
  ]
});
