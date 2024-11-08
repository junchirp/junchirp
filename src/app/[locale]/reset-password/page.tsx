import ResetPasswordComponent from '@/components/ResetPassword/ResetPasswordComponent';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const ResetPasswordPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <ResetPasswordComponent />;
};

export default ResetPasswordPage;
