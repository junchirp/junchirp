'use client';

import Link from 'next/link';

import { AppRouteEnum } from '@/libs/enums/enums';

import SignInFormik from './SignInFormik';
import SocialLoginGroup from '@/components/UI/SocialLoginGroup/SocialLoginGroup';
import AuthHeader from '../AuthHeader/AuthHeader';

import s from './signIn.module.scss';
import common from '@/components/Auth/commonAuthStyles.module.scss';

const SignIn = () => {
  return (
    <section className={`${common.section} `}>
      <div className={`${common.container} `}>
        <AuthHeader />
        <SignInFormik />
        <div className={common.box__link__group}>
          <p className={common.text}>Увійти за допомогою</p>
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
