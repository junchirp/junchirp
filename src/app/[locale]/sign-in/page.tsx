import SignIn from '@/components/Auth/Login/SignIn';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const SignInPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return <SignIn />;
};
export default SignInPage;
