import { Link } from '@/i18n/routing';

import { roboto, montserrat } from '@/utils/fonts';

import Logo from '../UI/Logo/Logo';
import FooterNav from './FooterNav';
import FooterIcons from './FooterIcons';

import s from './footer.module.scss';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('headerFooter');
  return (
    <footer className={`${roboto.className} ${s.container} `}>
      <div className={s.footer}>
        <div className={s.footer_logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className={`${montserrat.className} ${s.classNavMoreM}`}>
          <FooterNav />
        </div>
        <div className={`${montserrat.className} ${s.footerIconsMoreM}`}>
          <FooterIcons />
        </div>
        <p className={`${montserrat.className} ${s.copywriteMoreM}`}>
          &copy; {new Date().getFullYear()}
        </p>

        <div className={s.footer_nav}>
          <div className={s.contacts}>
            <div className={`${montserrat.className} ${s.contact_title}`}>
              {t('contacts')}
            </div>
            <div className={s.footerIcons}>
              <FooterIcons />
            </div>
            <div>
              <p className={`${montserrat.className} ${s.copywrite}`}>
                &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div className={`${montserrat.className} ${s.classNav}`}>
            <FooterNav />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
