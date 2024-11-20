'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import cn from 'classnames';

// import { faqs } from "./faqsText";
import { AppRouteEnum } from '@/libs/enums/enums';

import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';

import s from './faqs.module.scss';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  };
  const t = useTranslations('faqs');
  const faqs = [
    { id: 1, question: t('1.question'), answer: t('1.answer') },
    { id: 2, question: t('2.question'), answer: t('2.answer') },
    { id: 3, question: t('3.question'), answer: t('3.answer') },
  ];

  return (
    <section className={s.section}>
      <div className={s.container}>
        <section className={s.faqs}>
          <div className={s.container__faqs}>
            <h2 className={s.faq__title}> {t('0.heading')}</h2>
            {faqs.map((faq) => (
              <div className={s.faq} key={faq.id}>
                <div
                  className={s.faq__item}
                  onClick={() => handleToggle(faq.id)}
                >
                  <h3 className={s.faq__question}>{faq.question}</h3>
                  <div
                    className={clsx(
                      s.toggleIcon,
                      activeIndex === faq.id && s.toggleIconActive
                    )}
                  >
                    {activeIndex === faq.id ? '-' : '+'}
                  </div>
                </div>

                <h4
                  className={cn(s.faq__answer, {
                    [s.active]: activeIndex === faq.id,
                  })}
                >
                  {faq.answer}
                </h4>
              </div>
            ))}
          </div>

          <div className={s.container__link}>
            <Link className={s.link} href={AppRouteEnum.SUPPORT}>
              <span className={s.link__text}>{t('0.button_look')}</span>
              <SvgIcon width={19} height={15} id="arrow-down" />
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Faqs;
