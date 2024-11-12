'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';

// import testimonials from "./testimonials.json";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import s from './testimonials.module.scss';
import { useTranslations } from 'next-intl';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  project: string;
  imageSrc: string;
}

const Testimonials = () => {
  const generateBreakpoints = () => {
    const baseConfig = {
      slidesPerView: 1,
      spaceBetween: 10,
    };

    return {
      375: { ...baseConfig, slidesPerView: 1 },
      425: { ...baseConfig, slidesPerView: 1.3 },
      500: { ...baseConfig, slidesPerView: 1.4 },
      520: { ...baseConfig, slidesPerView: 1.5 },
      540: { ...baseConfig, slidesPerView: 1.6 },
      560: { ...baseConfig, slidesPerView: 1.7 },
      580: { ...baseConfig, slidesPerView: 1.8 },
      600: { ...baseConfig, slidesPerView: 1.9 },
      768: { slidesPerView: 2 },
      850: { slidesPerView: 2.2 },
      1024: { slidesPerView: 2.5 },
      1100: { slidesPerView: 2.7 },
      1150: { slidesPerView: 2.8 },
      1200: { slidesPerView: 2.9 },
      1280: { slidesPerView: 3 },
    };
  };
  const t = useTranslations('reviews');
  const testimonials = [
    {
      id: 1,
      text: t('1.text'),
      name: t('1.name'),
      title: t('1.title'),
      project: t('1.project'),
      imageSrc: t('1.imageSrc'),
    },
    {
      id: 2,
      text: t('2.text'),
      name: t('2.name'),
      title: t('2.title'),
      project: t('2.project'),
      imageSrc: t('2.imageSrc'),
    },
    {
      id: 3,
      text: t('3.text'),
      name: t('3.name'),
      title: t('3.title'),
      project: t('3.project'),
      imageSrc: t('3.imageSrc'),
    },
    {
      id: 4,
      text: t('4.text'),
      name: t('4.name'),
      title: t('4.title'),
      project: t('4.project'),
      imageSrc: t('4.imageSrc'),
    },
    {
      id: 5,
      text: t('5.text'),
      name: t('5.name'),
      title: t('5.title'),
      project: t('5.project'),
      imageSrc: t('5.imageSrc'),
    },
  ];

  return (
    <section className={s.section__testimonials}>
      <div className={`${s.container__testimonials}  ${s.container}  `}>
        {/* */}
        <h2 className={s.title__testimonials}>{t('0.reviews')}</h2>
        <div className={s.swiper__box}>
          <Swiper
            navigation={{
              nextEl: '.swiper__button__next',
              prevEl: '.swiper__button__prev',
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
            slidesPerView={'auto'}
            spaceBetween={30}
            breakpoints={generateBreakpoints()}
          >
            {testimonials &&
              testimonials.length > 0 &&
              testimonials.map((testimonial: Testimonial) => (
                <SwiperSlide key={testimonial.id} className={s.swiper__box}>
                  <div className={s.container__slide}>
                    <SvgIcon
                      id="vector-1"
                      width={20}
                      height={20}
                      className={s.chip__vector}
                    />

                    <p className={s.text__slide}>{testimonial.text}</p>
                    <div className={s.box__slide}>
                      <Image
                        src={testimonial.imageSrc}
                        alt="user"
                        height={100}
                        width={100}
                        className={s.img}
                      />
                      <div className={s.box__title}>
                        <h3 className={s.title}>{testimonial.name}</h3>
                        <p className={s.subtitle}>{testimonial.title}</p>

                        <p>Назва пет-проєкту: {testimonial.project}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            className={`${s.swiperButton} ${s.swiperButtonPrev} swiper__button__prev`}
          >
            <SvgIcon id="arrow-left" className={s.swiper__button__left} />
          </div>
          <div
            className={`${s.swiperButton} ${s.swiperButtonNext} swiper__button__next`}
          >
            <SvgIcon id="arrow-right" className={s.swiper__button__right} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
