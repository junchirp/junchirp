import Support from '@/components/Support/Support';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const SupportPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <Support />;
};
export default SupportPage;
