import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const loading = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);

  return <div style={{ color: 'white' }}>loading</div>;
};

export default loading;
