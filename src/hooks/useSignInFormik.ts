'use client';

import { useLoginMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';


import { FormValuesSignIn } from '@/components/Auth/Login/FormValuesSignIn';
import useAuthFormCommon from './useAuthFormCommon';
import { customError } from '@/types/commonTypes';

const useSignInFormik = () => {
  // хук, який повертає дані, спільні для реєстрації і логіну
  const {
    showPassword,
    backendError,
    togglePasswordVisibility,
    handleChange,
    setBackendError,
  } = useAuthFormCommon();

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { pushRouter } = useRouterPush();

  const handleSubmit = async (
    values: FormValuesSignIn,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, password } = values;

      const res = await login({ user: { email, password } }).unwrap();
      if (res) {
        resetForm();

        pushRouter('/');
      }
    } catch (error) {
      const status = (error as customError)?.status;
      let errorMessage = 'Неправильна електронна пошта або пароль';

      if (status === 401) {
        sessionStorage.setItem(
          'loginFormData',
          JSON.stringify({ email: values.email })
        );

        errorMessage =
          'Для завершення реєстрації підтвердіть свою електронну пошту';
        pushRouter('/confirm');
      } else if (status === 422) {
        errorMessage = 'Неправильна електронна пошта або пароль';
      }

      setBackendError(errorMessage);
    }
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
    handleChange,
    isError,
    error,
  };
};

export default useSignInFormik;
