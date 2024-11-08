import RequestPasswordReset from '@/components/Auth/RequestPasswordReset/RequestPasswordReset';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const RequestPasswordResetPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <RequestPasswordReset />;
};

export default RequestPasswordResetPage;
