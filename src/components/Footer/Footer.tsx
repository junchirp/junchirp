import { Link } from '@/i18n/routing';

import { roboto, montserrat } from '@/utils/fonts';

import Logo from '../UI/Logo/Logo';
import FooterNav from './FooterNav';
import FooterIcons from './FooterIcons';

import s from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={`${roboto.className} ${s.container} `}>
      <div className={`${s.footer}`}>
        <div className={s.footer_logo}>
          <Link href="/">
            <Logo />
          </Link>
          <Link
            className={`${s.btn_confirm} ${s.display_none_tablet}`}
            href="#"
          >
            Підтримай нас
          </Link>
        </div>
        <Link className={`${s.btn_confirm} ${s.display_none_767}`} href="#">
          Підтримай нас
        </Link>
        <div className={` ${s.footer_nav}`}>
          <div className={`${s.footerIcons} ${s.display_none_tablet} `}>
            <FooterIcons>
              <p className={montserrat.className}>
                &copy; {new Date().getFullYear()}
              </p>
            </FooterIcons>
          </div>

          <div className={s.footer_nav}>
            {' '}
            <FooterNav />
          </div>
        </div>
        <div className={`${s.footerIcons} ${s.display_none_768}`}>
          <FooterIcons />
        </div>
      </div>
      <p className={`${montserrat.className} ${s.copywrite}`}>
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};
export default Footer;
