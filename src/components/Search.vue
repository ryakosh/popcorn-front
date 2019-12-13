<template>
  <div class="c-search">
    <div class="search">
      <div class="search__top">
        <pop-text-input
          class="search__input"
          placeholder="Search..."
          @keyup.native="hKeyup"
        />
        <pop-button
          class="search__cancel"
          square
          bgImg
          @on-click="hClickCancel"
        >
        </pop-button>
      </div>
      <div class="search__bottom">
        <div
          class="search__message"
          v-show="prvt.movies === null && !prvt.isSearching"
        >
          <span
            >Find movies through search bar<span class="search__emoji"
              >☝️</span
            ></span
          >
        </div>
        <div class="search__message" v-show="prvt.isSearching">
          <span>Searching<span class="search__emoji">🔍</span></span>
        </div>
        <div
          class="search__message"
          v-show="Array.isArray(prvt.movies) && prvt.movies.length === 0"
        >
          <span>Nothing found<span class="search__emoji">☹️</span></span>
        </div>
        <div
          class="search__results"
          v-show="Array.isArray(prvt.movies) && prvt.movies.length >= 1"
        >
          <pop-search-item
            class="search__item"
            v-for="movie of prvt.movies"
            :key="movie.id"
            :movie_id="movie.movie_id"
            :title="movie.title"
            :poster="`${shrd.BASE_URL_POSTERS}P${movie.poster}`"
            :release_date="movie.release_date.substring(0, 4)"
            @on-click="hClickItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { server, handleError } from "../server.js";
import store from "../store.js";

import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import SearchItem from "./SearchItem.vue";

let timeoutID = null;

export default {
  name: "pop-search",
  data() {
    return {
      shrd: store.state,
      prvt: {
        movies: null,
        isSearching: false
      }
    };
  },
  methods: {
    search(term) {
      window.clearTimeout(timeoutID);
      this.prvt.isSearching = true;
      timeoutID = window.setTimeout(() => {
        server
          .movies(term, null, null, null)
          .then(movies => {
            this.prvt.isSearching = false;
            this.prvt.movies = movies;
          })
          .catch(err => {
            this.prvt.isSearching = false;
            handleError(err, this);
          });
      }, 400);
    },
    hKeyup(e) {
      const value = e.target.value;

      if (value) {
        this.search(value);
      } else {
        this.prvt.movies = null;
      }
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
@import "../sass/themes";

.search {
  width: 100%;
  height: 100%;
  margin: 0;
  color: map-get($LIGHT, secondary);
  background-color: map-get($LIGHT, primary);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;

  &__top {
    width: 100%;
    height: auto;
    padding: 5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__input {
    width: 100%;
    text-transform: uppercase;
  }
  &__cancel {
    background-image: url("../assets/cancel-LIGHT.svg");
    margin-left: 5px;
  }

  &__bottom {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 5px;
    margin-top: 10px;
  }
  &__message {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  &__emoji {
    font-size: 29px;
  }
  &__item {
    margin-bottom: 10px;
  }
}

.DARK .c-search {
  .search {
    color: map-get($DARK, secondary);
    background-color: map-get($DARK, primary);

    &__cancel {
      background-image: url("../assets/cancel-DARK.svg");
    }
  }
}
</style>
