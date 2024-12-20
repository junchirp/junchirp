import { Link } from '@/i18n/routing';
import { roboto } from '@/utils/fonts';

import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';

import { Card } from '../types';

import s from './cardDetails.module.scss';

const CardDetails = ({ title, subtitle, description }: Card) => {
  return (
    <div className={s.card}>
      <h3 className={s.title}>{title}</h3>

      <div className={s.content}>
        <p className={s.subtitle}>{subtitle}</p>
        <p className={s.description}>{description}</p>
        <Link className={`${s.link} ${roboto.className}`} href="#">
          Перейти
          <SvgIcon
            className={s.content__icon}
            width={19}
            height={15}
            id="arrow-next-role"
          />
        </Link>
      </div>
    </div>
  );
};

export default CardDetails;
