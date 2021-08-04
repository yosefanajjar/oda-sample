import { v4 as uuidv4 } from 'uuid';

import { ApiData, IOdaImage } from '../types';

export const transformToOdaImages = (data: ApiData) => {
  const odaImages: IOdaImage[] = [];

  data.smallOriginalImages.forEach((originalImageUrl, index) => {
    odaImages.push({
      id: uuidv4(),
      original: {
        url: originalImageUrl,
      },
      enhanced: {
        url: data.smallImages[index],
      },
    });
  });

  return odaImages;
};
