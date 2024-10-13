'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useRegisterMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';
import { customError } from '@/utils/types/customError';
import useAuthFormCommon from './useAuthFormCommon';

import { FormValuesRegister } from '@/components/Auth/Register/types/types';

const useRegisterFormik = () => {
  // хук, який обробляє логіку, спільну для реєстрації і логіну
  const {
    showPassword,
    backendError,
    togglePasswordVisibility,
    handleChange,
    setBackendError,
  } = useAuthFormCommon();

  const [register, { isLoading, isSuccess, error, isError }] =
    useRegisterMutation();
  const { pushRouter } = useRouterPush();

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Реєстрація успішна!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      pushRouter('/confirm');
    }
  }, [isSuccess, pushRouter]);

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { userName, email, password } = values;

      sessionStorage.setItem('registrationFormData', JSON.stringify({ email }));

      await register({
        user: { userName, email, password },
      }).unwrap();

      resetForm();
      setBackendError(null);
    } catch (error) {
      const customError = error as customError;

      const status = customError?.status;
      let errorMessage = 'Електронна адреса вже існує.';

      if (status === 400) {
        errorMessage =
          'Електронна адреса вже існує, але не підтверджена. Надіслано новий код підтвердження.';
        console.log('Status 400 detected, redirecting to /confirm');
        pushRouter('/confirm');
      }

      setBackendError(errorMessage);
    }
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    isLoading,
    backendError,
    handleChange,
    isError,
    error,
  };
};

export default useRegisterFormik;
