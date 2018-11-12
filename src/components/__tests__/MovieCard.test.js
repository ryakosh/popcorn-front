import { shallowMount } from '@vue/test-utils';
import MovieCard from '../MovieCard.vue';

describe('MovieCard component', () => {
  let w;

  beforeAll(() => {
    w = shallowMount(MovieCard, {
      propsData: {
        movie: {
          title: 'test',
          poster: 'https://test.t/test.jpg',
          score: 3,
        },
      },
    });
  }); 

  it('has the correct poster', () => {
    expect(w.find('.movie-card__poster')
      .attributes('src'))
        .toBe('https://test.t/test.jpg');
  });

  it('has the correct title', () => {
    expect(w.find('.movie-card__title').text()).toBe('test');
  });
});