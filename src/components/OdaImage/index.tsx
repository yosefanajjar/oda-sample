import React from 'react';
import { Box } from '@material-ui/core';
import Image from 'material-ui-image';

export interface OdaImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export const OdaImage = ({ src, alt, onClick }: OdaImageProps) => {
  return (
    <Box boxShadow={3} borderRadius={5} onClick={onClick}>
      <Image src={src} alt={alt} />
    </Box>
  );
};
