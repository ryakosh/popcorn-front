<template>
  <div class="c-search">
    <div class="search">
      <div class="search__top">
        <pop-text-input
          class="search__input"
          placeholder="Search..."
          @input="hInput"
        />
        <pop-button class="search__cancel" circle img @on-click="hClickCancel">
          <img src="../assets/cancel-black.svg" />
        </pop-button>
      </div>
      <div class="search__bottom" v-if="movies">
        <pop-search-item
          class="search__item"
          v-for="movie of movies"
          :key="movie.id"
          :movie_id="movie.movie_id"
          :title="movie.title"
          :poster="BASE + movie.poster"
          :release_date="movie.release_date"
          @on-click="hClickItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { server, BASE_URL_API, BASE_URL_ASSETS } from "../server.js";

import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import SearchItem from "./SearchItem.vue";

let timeoutID = null;

export default {
  name: "pop-search",
  data() {
    return {
      movies: null,
      BASE: BASE_URL_ASSETS
    };
  },
  methods: {
    search(term) {
      window.clearTimeout(timeoutID);
      timeoutID = window.setTimeout(() => {
        server.movies(BASE_URL_API, term, null, null, null).then(res => {
          this.movies = res.data.payload;
        });
      }, 250);
    },
    hInput(value) {
      this.search(value);
    },
    hClickCancel() {
      this.$emit("on-click-cancel");
    },
    hClickItem(movie_id) {
      this.$router.push({
        name: "movie",
        params: {
          id: movie_id
        }
      });
      this.$emit("on-click-cancel");
    }
  },
  components: {
    "pop-text-input": TextInput,
    "pop-button": Button,
    "pop-search-item": SearchItem
  }
};
</script>

<style lang="scss">
.c-search {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;

  .search {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
    overflow-y: auto;

    &__top {
      width: 100%;
      height: auto;
      padding: 9.6px 5px;
      display: flex;
    }
    &__input {
      width: 100%;
    }
    &__cancel {
      margin-left: 10px;
    }
    &__cancel img {
      width: 18.95px;
      height: 18.95px;
    }

    &__bottom {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 5px 10px;
      margin-top: 10px;
    }
    &__item {
      margin-bottom: 10px;
    }
  }
}
</style>
