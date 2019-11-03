<template>
  <div class="movie-details-view" v-if="prvt.movie">
    <div class="movie-details-view__info">
      <div class="movie-details-view__data">
        <pop-plaque left="TITLE" :right="prvt.movie.title" /><br />
        <pop-plaque left="STARS" :right="prvt.movie.stars.join(', ')" /><br />
        <pop-plaque
          left="WRITERS"
          :right="prvt.movie.writers.join(', ')"
        /><br />
        <pop-plaque
          left="DIRECTOR"
          :right="prvt.movie.directors.join(', ')"
        /><br />
        <pop-plaque left="GENRES" :right="prvt.movie.genres.join(', ')" />
      </div>
      <div class="movie-details-view__poster">
        <img :src="`${shrd.BASE_URL_POSTERS}P${prvt.movie.poster}`" />
      </div>
    </div>
    <div class="movie-details-view__actions">
      <pop-rate-button :userRating="prvt.userRating" @on-rate="hRate" />
    </div>
    <div class="movie-details-view__description">
      {{ prvt.movie.description }}
    </div>
  </div>
</template>

<script>
import Plaque from "../components/Plaque.vue";
import RateButton from "../components/RateButton.vue";
import { server, handleError } from "../server.js";
import store from "../store.js";

export default {
  name: "pop-movie-details-view",
  data() {
    return {
      shrd: store.state,
      prvt: {
        movie: null,
        userRating: 0
      }
    };
  },
  components: {
    "pop-plaque": Plaque,
    "pop-rate-button": RateButton
  },
  methods: {
    updateMovie(id) {
      server
        .movie(id)
        .then(res => {
          this.prvt.movie = res.data.payload;
        })
        .catch(err => handleError(err, this));
    },
    updateUserRating() {
      if (this.shrd.token) {
        server
          .movieRating(this.shrd.token, this.$route.params.id)
          .then(res => {
            this.prvt.userRating = res.data.payload.user_rating;
          })
          .catch(err => {
            if (err.response) {
              if (err.response.data.error === "EntryDNExist") {
                this.prvt.userRating = 0;
              } else {
                handleError(err, this);
              }
            }
          });
      }
    },
    hRate(userRating) {
      if (this.shrd.token) {
        if (userRating >= 1 && userRating <= 5) {
          if (this.prvt.userRating) {
            server
              .uMovieRating(this.shrd.token, this.$route.params.id, userRating)
              .then(() => {
                this.prvt.userRating = userRating;
              })
              .catch(err => handleError(err, this));
          } else {
            server
              .cMovieRating(this.shrd.token, this.$route.params.id, userRating)
              .then(() => {
                this.prvt.userRating = userRating;
              })
              .catch(err => handleError(err, this));
          }
        } else if (userRating === 0) {
          server
            .dMovieRating(this.shrd.token, this.$route.params.id)
            .then(() => {
              this.prvt.userRating = 0;
            })
            .catch(err => handleError(err, this));
        }
      } else {
        this.$router.push("/signup");
      }
    }
  },
  created() {
    this.updateMovie(this.$route.params.id);
    this.updateUserRating();
  },
  beforeRouteUpdate(to, from, next) {
    this.updateMovie(to.params.id);
    this.updateUserRating();
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
