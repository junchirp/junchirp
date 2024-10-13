'use client';

import Link from 'next/link';

import { roboto } from '@/utils/fonts';

import s from './ErrorPage505.module.scss';

export default function Error505() {
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container}`}>
        <div className={s.content__block}>
          <svg className={s.img__505} width="242" height="210">
            <use href="/symbol-defs.svg#505"></use>
          </svg>
          <h1 className={s.title}>Error 505 - Internal Server Error</h1>
          <p className={s.details}>
            Упс… Щось пішло не так з нашим сервером. Технічна команда вже працює
            над вирішенням проблеми. Поки що, будь ласка, поверніться на головну
            сторінку
          </p>
          <Link href="/" className={`${s.link} ${s.button}`}>
            головна сторінка
          </Link>
        </div>
      </div>
    </section>
  );
}
