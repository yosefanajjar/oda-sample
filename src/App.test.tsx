import React from 'react';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

import { getSampleImages } from './api';
import { data } from './data';
import { ApiData } from './types';

jest.mock('./api/index', () => ({ getSampleImages: jest.fn() }));

test('renders oda header', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  const { getByText, getByLabelText } = render(<App />);

  const odaLogo = getByText(/oda/i);

  expect(odaLogo).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByLabelText(/skeleton/i));
});

test('renders loading skeleton at first', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  const { getByLabelText } = render(<App />);

  expect(getByLabelText(/skeleton/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByLabelText(/skeleton/i));
});

test('renders contents header', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  await act(async () => {
    const { findByText } = render(<App />);

    expect(await findByText(/preview photos/i)).toBeInTheDocument();
    expect(await findByText(/share/i)).toBeInTheDocument();
    expect(await findByText(/download/i)).toBeInTheDocument();
  });
});

test('renders fab button when there is data', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  await act(async () => {
    const { findByText } = render(<App />);

    expect(await findByText(/view original/i)).toBeInTheDocument();
  });
});

test('renders oda enhanced images at first', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  const firstImageUrl = data.smallImages[0];

  await act(async () => {
    const { findByAltText } = render(<App />);

    expect(await findByAltText('oda image #0')).toBeInTheDocument();
    expect(await findByAltText('oda image #0')).toHaveAttribute('src', firstImageUrl);
  });
});

test('renders oda original images on view original click', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockResolvedValue(data);

  const firstImageOriginalUrl = data.smallOriginalImages[0];

  await act(async () => {
    const { findByAltText, findByText } = render(<App />);

    const viewOriginalButton = await findByText(/view original/i);

    fireEvent.click(viewOriginalButton);

    expect(await findByAltText('oda image #0')).toBeInTheDocument();
    expect(await findByAltText('oda image #0')).toHaveAttribute('src', firstImageOriginalUrl);
  });
});

test('renders the error message if an error occurs while loading images', async () => {
  (getSampleImages as jest.Mock<Promise<ApiData>>).mockRejectedValue({});

  await act(async () => {
    const { findByText } = render(<App />);

    expect(await findByText(/we are sorry :\(/i)).toBeInTheDocument();
    expect(await findByText(/we couldn't load your images/i)).toBeInTheDocument();
  });
});
