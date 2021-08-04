import { transformToOdaImages } from '..';
import { data } from '../../data';

describe('transformToOdaImages', () => {
  test('transforms API data shape into oda images', () => {
    const odaImages = transformToOdaImages(data);

    expect(typeof odaImages[0].id).toBe('string');
    expect(odaImages[0].original.url).toBe(data.smallOriginalImages[0]);
    expect(odaImages[0].enhanced.url).toBe(data.smallImages[0]);
  });
});
