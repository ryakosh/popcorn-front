<template>
  <div class="movie-details-view" v-if="movie">
    <div class="movie-details-view__info">
      <div class="movie-details-view__data">
        <pop-plaque left="TITLE" :right="movie.title" /><br />
        <pop-plaque left="STARS" :right="movie.stars.join(', ')" /><br />
        <pop-plaque left="WRITERS" :right="movie.writers.join(', ')" /><br />
        <pop-plaque left="DIRECTOR" :right="movie.directors.join(', ')" /><br />
        <pop-plaque left="GENRES" :right="movie.genres.join(', ')" />
      </div>
      <div class="movie-details-view__poster">
        <img :src="`${BASE_URL_ASSETS}P${movie.poster}`" />
      </div>
    </div>
    <div class="movie-details-view__description">
      {{ movie.description }}
    </div>
  </div>
</template>

<script>
import Plaque from "../components/Plaque.vue";
import { server, BASE_URL_ASSETS, getErrorMsg } from "../server.js";

export default {
  name: "pop-movie-details-view",
  data() {
    return {
      movie: null,
      BASE_URL_ASSETS
    };
  },
  components: {
    "pop-plaque": Plaque
  },
  methods: {
    updateMovie(id) {
      server
        .movie(id)
        .then(res => {
          this.movie = res.data.payload;
        })
        .catch(err => {
          if (err.response) {
            const res = err.response;

            this.$emit("on-notify", {
              type: "ERROR",
              msg: getErrorMsg("NotFound", res.statusText)
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
    }
  },
  created() {
    this.updateMovie(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.updateMovie(to.params.id);
    next();
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.movie-details-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  &__info {
    width: 100%;
    height: auto;
    display: inline-flex;
    justify-content: space-between;
  }

  &__data {
    width: 56%;
    height: auto;
    display: inline-block;

    .plaque {
      margin-bottom: 10px;
    }
  }

  &__poster {
    width: auto;
    height: auto;
    margin-right: -10px;

    img {
      width: 148.3px;
      height: 199px;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }

  &__description {
    width: 100%;
    height: auto;
    color: map-get($LIGHT, secondary);
    margin-top: 10px;
  }
}

.DARK .movie-details-view {
  &__description {
    color: map-get($DARK, secondary);
  }
}

@media only screen and (min-width: 600px) {
  .movie-details-view {
    padding: 14px;

    &__data {
      width: 50%;

      .plaque {
        margin-bottom: 14px;
      }
    }

    &__poster {
      margin-right: -14px;

      img {
        width: 260px;
        height: 350px;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
      }
    }
    &__description {
      font-size: 20px;
      margin-top: 19px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .movie-details-view {
    padding: 17px;

    &__data {
      width: 50%;

      .plaque {
        margin-bottom: 17px;
      }
    }

    &__poster {
      margin-right: -17px;

      img {
        width: 348px;
        height: 469px;
        border-top-left-radius: 22px;
        border-bottom-left-radius: 22px;
      }
    }
    &__description {
      font-size: 25px;
      margin-top: 26px;
    }
  }
}
</style>
