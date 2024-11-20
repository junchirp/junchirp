import { useTranslations } from 'next-intl';
import s from './projectStatistics.module.scss';

const ProjectStatistics = () => {
  const t = useTranslations('projectStatistics');
  return (
    <section className={`${s.section__statistics}`}>
      <div className={`${s.container}`}>
        <ul className={s.list}>
          <li className={s.list__item}>
            <h3 className={`${s.item__title} `}>{t('statisticTitle.0')}</h3>
            <p className={s.item__text}>{t('statisticText.0')}</p>
          </li>
          <li className={s.list__item}>
            <h3 className={s.item__title}>{t('statisticTitle.1')}</h3>
            <p className={s.item__text}>{t('statisticText.1')}</p>
          </li>
          <li className={s.list__item}>
            <h3 className={s.item__title}>{t('statisticTitle.2')}</h3>
            <p className={s.item__text}>{t('statisticText.2')}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default ProjectStatistics;
