import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const AboutPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <>AboutPage</>;
};
export default AboutPage;
