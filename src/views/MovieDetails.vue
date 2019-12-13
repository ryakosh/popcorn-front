<template>
  <div class="movie-details-view">
    <div class="movie-details-view__top">
      <div class="movie-details-view__attention-seeker">
        <div class="movie-details-view__left">
          <div>
            <h3 class="movie-details-view__title">{{ prvt.movie.title }}</h3>
            <div class="movie-details-view__stars">
              <span class="movie-details-view__key">Stars: </span
              >{{ prvt.movie.stars.join(", ") }}
            </div>
          </div>

          <div class="movie-details-view__director">
            {{ prvt.movie.directors.join(", ") }}
          </div>
        </div>
        <div class="movie-details-view__right">
          <img
            class="movie-details-view__poster"
            :src="`${shrd.BASE_URL_POSTERS}P${prvt.movie.poster}`"
          />
        </div>
      </div>
    </div>
    <div class="movie-details-view__bottom">
      <pop-info-box
        class="movie-details-view__info-box"
        k="Description"
        :v="prvt.movie.description"
      />
      <pop-info-box
        class="movie-details-view__info-box"
        k="Genres"
        :v="prvt.movie.genres.join(', ')"
      />
      <pop-info-box
        class="movie-details-view__info-box"
        k="Release Date"
        :v="fmtDate(prvt.movie.release_date)"
      />
      <pop-info-box
        class="movie-details-view__info-box"
        k="Writers"
        :v="prvt.movie.writers.join(', ')"
      />
    </div>
  </div>
  <!-- <div class="movie-details-view" v-if="prvt.movie">
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
      <pop-rate-button
        :userRating="shrd.token ? prvt.movie.u.rating : 0"
        @on-rate="hRate"
      />
    </div>
    <div class="movie-details-view__description">
      {{ prvt.movie.description }}
    </div>
  </div> -->
</template>

<script>
import Plaque from "../components/Plaque.vue";
import RateButton from "../components/RateButton.vue";
import InfoBox from "../components/InfoBox.vue";
import { server, handleError } from "../server.js";
import store from "../store.js";

export default {
  name: "pop-movie-details-view",
  data() {
    return {
      shrd: store.state,
      prvt: {
        movie: null
      }
    };
  },
  components: {
    "pop-plaque": Plaque,
    "pop-rate-button": RateButton,
    "pop-info-box": InfoBox
  },
  methods: {
    updateMovie(id) {
      server
        .movie(id, this.shrd.token)
        .then(movie => {
          this.prvt.movie = movie;
        })
        .catch(err => handleError(err, this));
    },
    hRate(userRating) {
      if (this.shrd.token) {
        if (userRating >= 1 && userRating <= 5) {
          if (this.prvt.movie.u.rating) {
            server
              .uMovieRating(
                this.shrd.token,
                this.$route.params.id,
                userRating,
                this.shrd.uname
              )
              .catch(err => handleError(err, this));
          } else {
            server
              .cMovieRating(
                this.shrd.token,
                this.$route.params.id,
                userRating,
                this.shrd.uname
              )
              .catch(err => handleError(err, this));
          }
        } else if (userRating === 0) {
          server
            .dMovieRating(
              this.shrd.token,
              this.$route.params.id,
              this.shrd.uname
            )
            .catch(err => handleError(err, this));
        }
      } else {
        this.$router.push("/signup");
      }
    },
    fmtDate(release_date) {
      return release_date.replace("-", " / ");
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
  display: flex;
  flex-direction: column;

  &__top {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }

  &__attention-seeker {
    width: 100%;
    height: 111px;
    border-radius: 2.5px;
    color: white;
    background-color: #212121;
    padding: 5px;
    display: flex;
  }

  &__left {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__title {
    font-size: 15px;
    text-transform: uppercase;
    margin: 0;
  }

  &__key {
    font-size: 11px;
  }

  &__stars {
    font-size: 10px;
    margin-top: 5px;
  }

  &__director {
    font-size: 11px;
  }

  &__right {
    width: auto;
    height: 100%;
  }

  &__poster {
    width: 56px;
    height: 83px;
    border-radius: 2.5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  &__bottom {
    width: 100%;
    height: 100%;
    margin-top: 15px;
  }

  &__info-box {
    margin-bottom: 5px;
  }
}
//   width: 100%;
//   height: 100%;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;

//   &__info {
//     width: 100%;
//     height: auto;
//     display: inline-flex;
//     justify-content: space-between;
//   }

//   &__data {
//     width: 56%;
//     height: auto;
//     display: inline-block;

//     .plaque {
//       margin-bottom: 10px;
//     }
//   }

//   &__poster {
//     width: auto;
//     height: auto;
//     margin-right: -10px;

//     img {
//       width: 148.3px;
//       height: 199px;
//       border-top-left-radius: 12px;
//       border-bottom-left-radius: 12px;
//     }
//   }

//   &__actions {
//     margin: 14px 0;
//   }

//   &__description {
//     width: 100%;
//     height: auto;
//     color: map-get($LIGHT, secondary);
//   }

.DARK .movie-details-view {
  &__description {
    color: map-get($DARK, secondary);
  }
}
</style>
