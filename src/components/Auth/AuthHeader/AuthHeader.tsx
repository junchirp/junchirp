import { AppRouteEnum } from '@/libs/enums/enums';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import s from './AuthHeader.module.scss';

const AuthHeader = () => {
  const pathname = usePathname();

  return (
    <div className={s.box__link}>
      <Link
        href={AppRouteEnum.SIGN_IN}
        className={` ${s.link} ${
          pathname === `${AppRouteEnum.SIGN_IN}` ? s.link__sign_in : ''
        } `}
      >
        Увійти
      </Link>
      <span>/</span>
      <Link
        href={AppRouteEnum.SIGN_UP}
        className={` ${s.link} ${
          pathname === `${AppRouteEnum.SIGN_UP}` ? s.link__register : ''
        } `}
      >
        Зареєструватись
      </Link>
    </div>
  );
};

export default AuthHeader;
