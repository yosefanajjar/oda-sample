export interface IOdaImage {
  id: string;
  original: {
    url: string;
  };
  enhanced: {
    url: string;
  };
}

export interface ApiData {
  images: {
    css: string;
    height: number;
    width: number;
  }[];
  smallImages: string[];
  smallOriginalImages: string[];
  text: string[][];
  viewer: boolean;
}
