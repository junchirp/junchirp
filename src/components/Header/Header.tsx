'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useEffect, useState } from 'react';

import authSelector from '@/redux/auth/authSelector';
import { clearToken } from '@/redux/auth/authSlice';
import { useLogoutMutation } from '@/services/auth-and-user-services';
import { AppRouteEnum } from '@/libs/enums/enums';
import useWindowWidth from '@/hooks/useWindowWidth';
import useRouterPush from '@/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';

import Logo from '@/components/UI/Logo/Logo';
import BurgerButton from '@/components/UI/BurgerButton/BurgerButton';
import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';

import s from './header.module.scss';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const pathname = usePathname();
  const token = useAppSelector(authSelector.selectToken);
  const isConfirmed = useAppSelector(authSelector.selectIsConfirmed);
  const [logout] = useLogoutMutation();
  const { pushRouter } = useRouterPush();
  const windowWidth = useWindowWidth();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      if (res) {
        dispatch(clearToken());
        pushRouter(AppRouteEnum.ROOT);
      }
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen && windowWidth !== undefined && windowWidth < 1280) {
      document.body.classList.add('body-no-scroll');
      document.documentElement.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
      document.documentElement.classList.remove('body-no-scroll');
    }
    return () => {
      document.body.classList.remove('body-no-scroll');
      document.documentElement.classList.remove('body-no-scroll');
    };
  }, [menuOpen, windowWidth]);

  const t = useTranslations('headerFooter');

  return (
    <header className={s.header}>
      <div className={`${s.container} `}>
        <div className={` ${s.container__header} `}>
          <Link
            href={AppRouteEnum.ROOT}
            className={s.logo__link}
            onClick={() => setMenuOpen(false)}
          >
            <Logo />
          </Link>
          <Link href={AppRouteEnum.ROOT} className={s.text__link}>
            <SvgIcon
              id="future-of-it"
              width={438}
              height={50}
              className={s.text__link__chip}
            />
          </Link>
          {pathname !== AppRouteEnum.SIGN_IN &&
            pathname !== AppRouteEnum.SIGN_UP &&
            pathname !== AppRouteEnum.CONFIRM && (
              <nav className={`${s.nav}`}>
                <LocaleSwitcher />
                <Link
                  className={s.link}
                  href={
                    token
                      ? isConfirmed
                        ? AppRouteEnum.MY_OFFICE
                        : AppRouteEnum.CONFIRM
                      : AppRouteEnum.SIGN_IN
                  }
                >
                  {token ? t('office') : t('login')}
                </Link>
                <BurgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                {token && (
                  <button
                    className={s.btn__exit}
                    type="button"
                    onClick={handleLogout}
                  >
                    <SvgIcon
                      id="exit"
                      width={25}
                      height={20}
                      className={s.exit__chip}
                    />
                  </button>
                )}
              </nav>
            )}
        </div>
      </div>
      <div className={`${s.menu_burger} ${menuOpen ? s.open : ''}`}>
        <ul className={s.nav_burger}>
          <li>
            {' '}
            <Link href="about" onClick={() => setMenuOpen(false)}>
              {t('about')}
            </Link>
          </li>
          <li>
            {' '}
            <Link href="terms-of-service" onClick={() => setMenuOpen(false)}>
              {t('terms')}
            </Link>
          </li>
          <li>
            <Link href="privacy-policy" onClick={() => setMenuOpen(false)}>
              {t('policy')}
            </Link>
          </li>
        </ul>
        <Link
          className={`${s.link} ${s.open}`}
          href={
            token
              ? isConfirmed
                ? AppRouteEnum.MY_OFFICE
                : AppRouteEnum.CONFIRM
              : AppRouteEnum.SIGN_IN
          }
          onClick={() => setMenuOpen(false)}
        >
          {token ? t('office') : t('login')}
        </Link>
      </div>
    </header>
  );
};

export default Header;
