import { shallowMount } from '@vue/test-utils';
import MovieScore from '../MovieScore.vue';

describe('MovieScore component', () => {
  it('renders correcty with integer score prop', () => {
    const w = shallowMount(MovieScore, {
      propsData: {
        score: 3,
      },
    });
    expect(w.findAll('.movie-card__score-full').length).toBe(3);
    expect(w.contains('.movie-card__score-half')).toBe(false);
  });

  it('renders correcty with float score prop', () => {
    const w = shallowMount(MovieScore, {
      propsData: {
        score: 3.5,
      },
    });
    expect(w.findAll('.movie-card__score-full').length).toBe(3);
    expect(w.contains('.movie-card__score-half')).toBe(true);
  });
});