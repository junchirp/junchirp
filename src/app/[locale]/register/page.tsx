import Register from '@/components/Auth/Register/Register';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const RegisterPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  console.log('page set:', locale);
  return <Register />;
};
export default RegisterPage;
