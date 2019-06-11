import Vue from "vue";
import Router from "vue-router";

// Views
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Signin from "./views/Signin.vue";
import MovieDetails from "./views/MovieDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Home },
    { path: "/signup", component: Signup },
    { path: "/signin", component: Signin },
    { path: "/movies/:id", name: "movie", component: MovieDetails }
  ]
});
