import ConfirComponent from '@/components/Confirm/ConfirmComponent';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const ConfirmPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <ConfirComponent />;
};

export default ConfirmPage;
