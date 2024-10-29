import Link from 'next/link';

import { roboto } from '@/utils/fonts';

import './globals.scss';

const NotFoundPage = () => {
  return (
    <section className={'section'}>
      <div className={`${roboto.className} ${'container'} `}>
        <div className={'content__block'}>
          <svg className={'img__404'} >
            <use href="/symbol-defs.svg#404"></use>
          </svg>
          <h1 className={'title'}>Error 404 - Page not found</h1>
          <p className={'details'}>
            Ой, ви потрапили на таємну сторінку, якої не існує! Можливо,
            сторінка була видалена або переміщена. Перейдіть на нашу головну
            сторінку, щоб знайти потрібну інформацію
          </p>
          <Link className="button"  href='/'>головна сторінка</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
