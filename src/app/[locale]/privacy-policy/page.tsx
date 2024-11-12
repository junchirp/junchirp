import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const PrivacyPolicyPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);

  return <>PrivacyPolicyPage</>;
};
export default PrivacyPolicyPage;
