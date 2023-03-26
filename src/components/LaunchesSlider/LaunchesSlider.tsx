import React, { FC } from 'react';
import Slider from 'react-slick';
import s from './LaunchesSlider.module.scss';
import 'slick-carousel/slick/slick.css';

type Props = {
  rocketImages: string[],
  name: string,
};

export const LaunchesSlider: FC<Props> = ({ rocketImages, name }) => {
  const settings = {
    customPaging: (i = 0) => {
      return (
        <div className={s.productSliderPaginationImageContainer}>
          <img
            className={s.productSliderPaginationImage}
            src={rocketImages[i]}
            alt={name}
          />
        </div>
      );
    },
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    dotsClass: s.productSliderPagination,
    autoplay: true,
  };

  return (
    <>
      <Slider
        {...settings}
        className={s.productSlider}
      >
        {rocketImages.map(rocketImage => (
          <div
            className={s.productSliderImageContainer}
            key={rocketImage}
          >
            <img
              src={rocketImage}
              alt={rocketImage}
              className={s.productSliderImage}
            />
          </div>
        ))}
      </Slider>
    </>
  );
};