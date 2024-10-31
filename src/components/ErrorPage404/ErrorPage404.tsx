'use client';

import Link from 'next/link';

import { roboto } from '@/utils/fonts';

import s from './ErrorPage404.module.scss';

export default function Error404() {
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container} `}>
        <div className={s.content__block}>
          <svg className={s.img__404}>
            <use href="/symbol-defs.svg#404"></use>
          </svg>
          <h1 className={s.title}>Error 404 - Page not found</h1>
          <p className={s.details}>
            Ой, ви потрапили на таємну сторінку, якої не існує! Можливо,
            сторінка була видалена або переміщена. Перейдіть на нашу головну
            сторінку, щоб знайти потрібну інформацію
          </p>
          <Link className={`${s.link} ${s.button}`} href="/">
            головна сторінка
          </Link>
        </div>
      </div>
    </section>
  );
}
