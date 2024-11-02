'use client';

import SocialLoginGroup from '../../UI/SocialLoginGroup/SocialLoginGroup';

import RegisterFormik from './RegisterFormik';
import AuthHeader from '../AuthHeader/AuthHeader';

import common from '@/components/Auth/commonAuthStyles.module.scss';

const Register = () => {
  return (
    <section className={`${common.section} `}>
      <div className={`${common.container} `}>
        <AuthHeader />
        <RegisterFormik />
        <div className={common.box__link__group}>
          <p className={common.text}>Зареєструватись за допомогою</p>
          <SocialLoginGroup />
        </div>
      </div>
    </section>
  );
};

export default Register;
