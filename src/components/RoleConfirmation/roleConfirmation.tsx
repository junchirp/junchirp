'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { Form, Formik } from 'formik';

import { useSetRoleMutation } from '@/services/auth-and-user-services';
import { customError } from '@/utils/types/customError';
import { AppRouteEnum } from '@/libs/enums/enums';
import { rolesValidationSchema } from '../../validation/rolesValidation';

import { RoleList } from './roleList';
import { roleCardData } from './roleCardText';
import Button from '@/components/UI/Button/Button';

import s from './roleConfirmation.module.scss';

export const RoleConfirmation = () => {
  const [setRole, { isLoading }] = useSetRoleMutation();
  const router = useRouter();
  const [backendError, setBackendError] = useState<string | null>(null);

  const handleSubmit = async (values: { role: string }) => {
    try {
      setBackendError(null);
      await setRole({ role: [values.role] }).unwrap();
      router.push(`${AppRouteEnum.ACCOUNT_VERIFICATION}/${values.role}`);
    } catch (e) {
      const customError = e as customError;
      if (customError.status === 404) {
        setBackendError('Користувача не знайдено');
      } else if (customError.status === 401) {
        setBackendError('Користувач не авторизований');
      } else if (customError.status === 403) {
        setBackendError('Користувач не має достатньо прав');
      }
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Formik
          initialValues={{ role: '' }}
          validationSchema={rolesValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={s.form}>
              <RoleList
                roles={roleCardData}
                onSelectRole={(roleId) => {
                  setFieldValue('role', roleId);
                  console.log('Selected role:', roleId);
                }}
              />
              <div className={s.button__wrapper}>
                <Button
                  title="Вибрати"
                  type="submit"
                  className={cn(s.button, { [s.disabled]: isLoading })}
                  isDisabled={isLoading}
                />
              </div>

              {errors.role && touched.role && (
                <div className={s.error}>{errors.role}</div>
              )}
              {backendError && <div className={s.error}>{backendError}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
