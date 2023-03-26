import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

export const LoaderComponent: React.FC = () => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="blue"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel='circles-with-bar-loading'
    />
  );
};
