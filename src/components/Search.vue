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
          circle
          bgImg
          @on-click="hClickCancel"
        >
        </pop-button>
      </div>
      <div class="search__bottom">
        <div class="search__message" v-show="movies === null && !isSearching">
          <span
            >Find movies through search bar<span class="search__emoji"
              >☝️</span
            ></span
          >
        </div>
        <div class="search__message" v-show="isSearching">
          <span>Searching<span class="search__emoji">🔍</span></span>
        </div>
        <div
          class="search__message"
          v-show="Array.isArray(movies) && movies.length === 0"
        >
          <span>Nothing found<span class="search__emoji">☹️</span></span>
        </div>
        <div
          class="search__results"
          v-show="Array.isArray(movies) && movies.length >= 1"
        >
          <pop-search-item
            class="search__item"
            v-for="movie of movies"
            :key="movie.id"
            :movie_id="movie.movie_id"
            :title="movie.title"
            :poster="`${BASE}P${movie.poster}`"
            :release_date="movie.release_date"
            @on-click="hClickItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  server,
  BASE_URL_API,
  BASE_URL_ASSETS,
  getErrorMsg
} from "../server.js";

import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import SearchItem from "./SearchItem.vue";

let timeoutID = null;

export default {
  name: "pop-search",
  data() {
    return {
      movies: null,
      BASE: BASE_URL_ASSETS,
      isSearching: false
    };
  },
  methods: {
    search(term) {
      window.clearTimeout(timeoutID);
      this.isSearching = true;
      timeoutID = window.setTimeout(() => {
        server
          .movies(BASE_URL_API, term, null, null, null)
          .then(res => {
            this.isSearching = false;
            this.movies = res.data.payload;
          })
          .catch(err => {
            this.isSearching = false;

            if (err.response) {
              const res = err.response;

              this.$emit("on-notify", {
                type: "ERROR",
                msg: getErrorMsg(res.data.error, res.statusText)
              });
            } else if (err.request) {
              this.$emit("on-notify", {
                type: "ERROR",
                msg: getErrorMsg(null, "Error connecting to the server")
              });
            } else {
              console.error("Error creating the request object");
            }
          });
      }, 400);
    },
    hKeyup(e) {
      const value = e.target.value;

      if (value) {
        this.search(value);
      } else {
        this.movies = null;
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

.c-search {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 8px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;

  .search {
    width: 100%;
    height: 100%;
    color: map-get($LIGHT, secondary);
    border-radius: 27px;
    background-color: map-get($LIGHT, primary);
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    &__top {
      width: 100%;
      height: auto;
      padding: 5px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__input {
      width: 87%;
    }
    &__cancel {
      background-image: url("../assets/cancel-LIGHT.svg");
    }

    &__bottom {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 5px 10px;
      margin-top: 10px;
    }
    &__message {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    &__emoji {
      font-size: 33px;
    }
    &__item {
      margin-bottom: 10px;
    }
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

@media only screen and (min-width: 600px) {
  .c-search {
    .search {
      border-radius: 32px;

      &__message {
        font-size: 34px;
      }
      &__emoji {
        font-size: 47px;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .c-search {
    .search {
      border-radius: 42px;

      &__message {
        font-size: 46px;
      }
      &__emoji {
        font-size: 59px;
      }
    }
  }
}
</style>
