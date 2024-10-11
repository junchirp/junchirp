'use client';
import s from './roleConfirmation.module.scss';
import { RoleList } from './roleList';
import { roleCardData } from './roleCardText';
import Button from '../UI/Button/Button';
import { rolesValidationSchema } from '../../validation/rolesValidation';
import { useRouter } from 'next/navigation';
import { AppRouteEnum } from '@/libs/enums/enums';
import { useSetRoleMutation } from '@/services/auth-and-user-services';
import { customError } from '@/utils/types/customError';
import { useState } from 'react';
import cn from 'classnames';
import DynamicForm from '../UI/Forms/DynamicForm/DynamicForm';
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
        <DynamicForm
          initialValues={{ role: '' }}
          validationSchema={rolesValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <>
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
                <div className={s.error}>
                  {typeof errors.role === 'string' && errors.role}
                </div>
              )}
              {backendError && <div className={s.error}>{backendError}</div>}
            </>
          )}
        </DynamicForm>
      </div>
    </section>
  );
};
