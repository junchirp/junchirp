'use client';

import { Link } from '@/i18n/routing';
import { roboto } from '@/utils/fonts';

import s from './ErrorPage505.module.scss';
import { useTranslations } from 'next-intl';

export default function Error505() {
  const t = useTranslations('error505');
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container}`}>
        <div className={s.content__block}>
          <svg className={s.img__505}>
            <use href="/symbol-defs.svg#505"></use>
          </svg>
          <h1 className={s.title}>{t('errorTitle')}</h1>
          <p className={s.details}>{t('errorMessage')}</p>
          <Link className={`${s.link} ${s.button}`} href="/">
            {t('homeButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}
