'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FormikValues } from 'formik';

import { customError } from '@/types/commonTypes';
import { AppRouteEnum } from '@/libs/enums/enums';
import { useAppDispatch, useAppSelector } from './redux-hook';
import {
  useConfirmEmailMutation,
  useResendConfirmationCodeMutation,
} from '../services/auth-and-user-services';
import authSelector from '@/redux/auth/authSelector';
import useRouterPush from './useRouter';
import { setAttempts, setCooldown, setTimeLeft } from '@/redux/auth/authSlice'; // додали дії з authSlice

const useEmailConfirmation = () => {
  const [confirm, { isLoading }] = useConfirmEmailMutation();
  const [resendCode] = useResendConfirmationCodeMutation();
  const { pushRouter } = useRouterPush();
  const dispatch = useAppDispatch();

  const email = useAppSelector(authSelector.getEmail);
  const timeLeft = useAppSelector((state) => state.auth.timeLeft);
  const attempts = useAppSelector((state) => state.auth.attempts);
  const cooldown = useAppSelector((state) => state.auth.cooldown);

  const [backendError, setBackendError] = useState<string | null>(null);

  useMemo(() => {
    const storedEmailData =
      sessionStorage.getItem('registrationFormData') ||
      sessionStorage.getItem('loginFormData');

    if (storedEmailData) {
      const { email } = JSON.parse(storedEmailData);
      // Синхронізуємо email, якщо його не було вказано
    }
  }, [email]);

  useEffect(() => {
    if (!email) {
      pushRouter('/register');
    }
  }, [email, pushRouter]);

  useEffect(() => {
    if (cooldown !== null) {
      const interval = setInterval(() => {
        const newCooldown = cooldown - 1;
        dispatch(setCooldown(newCooldown));

        if (newCooldown <= 0) {
          clearInterval(interval);
          dispatch(setCooldown(null));
          dispatch(setAttempts(0));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldown, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        dispatch(setTimeLeft(timeLeft - 1));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, dispatch]);

  const handleResendCode = async (email: string) => {
    dispatch(setTimeLeft(600));

    if (cooldown !== null) {
      toast.error(
        `Код активний ще ${formatTime(cooldown)}. Будь ласка, зачекайте.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    if (attempts >= 5) {
      toast.error(
        'Ви вичерпали всі спроби отримання нового коду підтвердження на сьогодні. Будь ласка, спробуйте завтра.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    try {
      await resendCode({ email }).unwrap();

      dispatch(setAttempts(attempts + 1));
      dispatch(setTimeLeft(0));
      dispatch(setCooldown(600));

      toast.success(`Новий код підтвердження успішно надіслано на ${email}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      const customError = error as customError;
      const status = customError.data?.statusCode;
      if (status === 400) {
        toast.error('Користувача вже підтверджено', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await confirm({ email, code: values.code }).unwrap();

      if (res.user.accessToken) {
        dispatch(setTimeLeft(0));
        dispatch(setCooldown(null));
        pushRouter(`${AppRouteEnum.ROLE_CONFIRMATION}`);
      }
    } catch (error) {
      if (error && (error as customError).data) {
        const status = (error as customError).data.statusCode;
        let errorMessage =
          'Неправильний код. Будь ласка, перевірте і спробуйте ще раз ';

        if (status === 400) {
          errorMessage =
            'Неправильний код. Будь ласка, перевірте і спробуйте ще раз';
        } else if (status === 410) {
          errorMessage =
            'Термін дії коду закінчився. Будь ласка, запросіть новий код для підтвердження';
        } else if (status === 429) {
          errorMessage =
            'Ви вичерпали всі спроби отримання нового коду підтвердження. Будь ласка, зачекайте 24 години перед наступною спробою отримання нового коду';
        }
        setBackendError(errorMessage);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleChangeBackend = () => {
    setBackendError(null);
  };

  return {
    backendError,
    email,
    timeLeft,
    isLoading,
    cooldown,
    handleSubmit,
    handleResendCode,
    formatTime,
    pushRouter,
    handleChangeBackend,
  };
};

export default useEmailConfirmation;
