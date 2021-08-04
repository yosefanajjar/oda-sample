import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { OdaImage } from '..';

describe('OdaImage', () => {
  test('renders image with provided image src and alt', () => {
    const imageUrl =
      'https://oda-studio-uploaded.s3.us-east-2.amazonaws.com/multi_splitspot/sample/719134_8f0091ec68024bdea7fb4852c918b566_mv2.jpg';
    const altText = 'oda image';

    const { getByAltText } = render(<OdaImage src={imageUrl} alt={altText} onClick={() => {}} />);

    const image = getByAltText(altText);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });

  test('calls onClick handler when clicking on the image', () => {
    const imageUrl =
      'https://oda-studio-uploaded.s3.us-east-2.amazonaws.com/multi_splitspot/sample/719134_8f0091ec68024bdea7fb4852c918b566_mv2.jpg';
    const altText = 'oda image';
    const onClickMock = jest.fn();

    const { getByAltText } = render(<OdaImage src={imageUrl} alt={altText} onClick={onClickMock} />);

    const image = getByAltText(altText);

    fireEvent.click(image);

    expect(onClickMock).toBeCalled();
  });
});
