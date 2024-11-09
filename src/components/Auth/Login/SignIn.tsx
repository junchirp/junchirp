'use client';

import { Link, usePathname } from '@/i18n/routing';

import { AppRouteEnum } from '@/libs/enums/enums';

import SignInFormik from './SignInFormik';
import SocialLoginGroup from '@/components/UI/SocialLoginGroup/SocialLoginGroup';

import s from './signIn.module.scss';

const SignIn = () => {
  const pathname = usePathname();

  return (
    <section className={`${s.section} `}>
      <div className={`${s.container} `}>
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
        <SignInFormik />
        <div className={s.box__link__group}>
          <p className={s.text}>Увійти за допомогою</p>
          <SocialLoginGroup />
          <Link
            href={AppRouteEnum.REQUEST_PASSWORD_RESET}
            className={s.link__forgot__password}
          >
            Забули пароль?
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
