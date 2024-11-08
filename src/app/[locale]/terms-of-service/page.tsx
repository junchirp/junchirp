import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const TermsServicePage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <>TermsService</>;
};
export default TermsServicePage;
