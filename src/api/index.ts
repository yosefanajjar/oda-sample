import { ApiData } from '../types';
import { data } from '../data';

export const getSampleImages = (): Promise<ApiData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
