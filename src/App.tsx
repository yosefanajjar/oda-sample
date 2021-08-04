import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Box, Button } from '@material-ui/core';
import { Share as ShareIcon, SaveAlt as SaveAltIcon } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import { getSampleImages } from './api';
import { transformToOdaImages } from './utils';
import { IOdaImage } from './types';
import { OdaImage, CustomFab } from './components';

const useStyles = makeStyles((theme) => ({
  page: {
    background: theme.palette.primary.main,
  },
  contentWrapper: {
    background: theme.palette.common.white,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    boxShadow: '0px -5px 4px rgba(0, 0, 0, 0.15)',
  },
  contentHeader: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  imagesLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(3),
    },
  },
  fabWrapper: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      right: '50%',
      transform: 'translate(50%, 0)',
    },
  },
  errorWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const App = () => {
  const [images, setImages] = useState<IOdaImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getSampleImages();
        const odaImages = transformToOdaImages(data);
        setImages(odaImages);
        setError(null); // resetting error
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
    () => {
      setIsLoading(false);
      setImages([]);
      setError(null);
    };
  }, []);

  const renderContent = () => {
    if (isLoading)
      return (
        <Box aria-label="skeleton">
          <Box paddingY={[2, 4]} width="30%">
            <Skeleton variant="text" height={50} />
          </Box>
          <Box className={classes.imagesLayout}>
            {/* Generating 9 skeletons to show in loading state */}
            {Array.from(Array(10).keys()).map((skeleton) => (
              <Skeleton key={skeleton} variant="rect" height={400} />
            ))}
          </Box>
        </Box>
      );

    if (error)
      return (
        <Box className={classes.errorWrapper}>
          <Typography variant="h5">We are sorry :(</Typography>
          <Typography variant="h5">We couldn&apos;t load your images</Typography>
        </Box>
      );

    return (
      <>
        <Box
          paddingY={[2, 4]}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.contentHeader}
        >
          <Typography variant="h6">Preview Photos</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button endIcon={<ShareIcon />}>Share</Button>
            <Button endIcon={<SaveAltIcon />}>Download</Button>
          </Box>
        </Box>
        <Box className={classes.imagesLayout}>
          {images.map((image, index) => (
            <OdaImage
              key={`img-${index}`}
              src={showOriginal ? image.original.url : image.enhanced.url}
              alt={`oda image #${index}`}
              onClick={() => {}}
            />
          ))}
        </Box>
      </>
    );
  };

  return (
    <div className={classes.page}>
      <Box paddingX={[3, 10]} paddingY={2}>
        <Typography component="h1" variant="h3" color="textSecondary">
          oda
        </Typography>
      </Box>

      <Box paddingX={[3, 10]} paddingY={[2, 4]} className={classes.contentWrapper}>
        {renderContent()}
      </Box>

      {!isLoading && !error && (
        <Box className={classes.fabWrapper}>
          <CustomFab onClick={() => setShowOriginal((prevState) => !prevState)} active={showOriginal}>
            {showOriginal ? 'View Enhanced' : 'View original'}
          </CustomFab>
        </Box>
      )}
    </div>
  );
};

export default App;
