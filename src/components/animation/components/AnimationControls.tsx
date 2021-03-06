import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { isBrowser } from 'react-device-detect';

interface AnimationControlsProps {
  primaryControls?: JSX.Element;
  secondaryControls?: JSX.Element;
  deviceControls?: JSX.Element;
}

const AnimationControls: FC<AnimationControlsProps> = ({
  primaryControls,
  secondaryControls,
  deviceControls
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={isBrowser ? 4 : 6}>
        {primaryControls}
      </Grid>
      <Grid item xs={12} md={isBrowser ? 4 : 6}>
        {secondaryControls}
      </Grid>
      {isBrowser ? (
        <Grid item xs={12} md={4}>
          {deviceControls}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default AnimationControls;
