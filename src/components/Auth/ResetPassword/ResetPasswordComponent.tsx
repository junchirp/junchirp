'use client';

import { useState } from 'react';
import { Form } from 'formik';
import { toast } from 'react-toastify';

import { useResetPasswordMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';

import { validationSchemaResetPassword } from '@/validation/validationResetPassword';

import { FormValuesResetPassword } from '@/components/Auth/ResetPassword/FormValuesResetPassword';

import Button from '@/components/UI/Button/Button';
import Loader from '@/components/UI/Loader/Loader';

import s from './styles.module.scss';
import common from '@/components/Auth/commonAuthStyles.module.scss';
import DynamicForm from '@/components/UI/Forms/DynamicForm/DynamicForm';
import { FormField } from '@/components/UI/Forms/CustomInput/CustomInput';

const ResetPasswordComponent = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const { pushRouter } = useRouterPush();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = () => {
    setBackendError(null);
  };
  const handleSubmit = async (
    values: FormValuesResetPassword,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, code, newPassword } = values;
      console.log('dsdsd');

      const res = await resetPassword({ email, code, newPassword }).unwrap();
      if (res) {
        toast.success(
          'Ваш пароль успішно змінено. Ви будете перенаправлені на сторінку входу.'
        );
        resetForm();
        pushRouter('/sign_in');
      }
    } catch (error) {
      toast.error('Неправильний email або code');

      let errorMessage = 'Неправильний email або code';

      setBackendError(errorMessage);
    }
  };
  return (
    <section className={common.section}>
      <div className={`${common.container} ${common.container__resend}`}>
        <h2 className={common.title}>Зміна пароля</h2>
        <p className={s.text}>
          Перевірте свою електронну пошту, ми відправили лист із подальшими
          інструкціями для відновлення паролю.
          <br />
          <br /> Якщо ви не отримали листа для відновлення паролю, перевірте
          папку зі спамом.
        </p>
        <DynamicForm
          initialValues={{ email: '', code: '', newPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaResetPassword}
        >
          {({
            errors,
            touched,
            dirty,
            isValid,
            handleChange: formikHandleChange,
          }) => (
            <Form className={common.form}>
              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                type={'email'}
                name={'email' as keyof object}
                error={touched.email && errors.email}
                label={'email'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />
              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                type="text"
                name="code"
                error={touched.code && errors.code}
                label={'Код'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />

              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                type={showPassword ? 'text' : 'password'}
                name={'newPassword' as keyof object}
                error={touched.newPassword && errors.newPassword}
                label={'Пароль'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />

              {backendError && (
                <div className={common.error__backend}>{backendError}</div>
              )}

              <div className={common.box__btn}>
                <Button
                  title="ВІДМІНИТИ"
                  className={common.resetBtn}
                  type="reset"
                  isDisabled={!dirty || isLoading}
                />
                <Button
                  className={`${common.styledBtn}
                 
                 ${
                   isLoading
                     ? common.styledBtn
                     : !touched.email || errors.email
                     ? ''
                     : !touched.email || errors.email || backendError
                     ? common.invalid
                     : common.valid
                 } `}
                  type="submit"
                  isDisabled={!dirty || !isValid || isLoading}
                >
                  {isLoading ? (
                    <>
                      Змінити пароль <Loader />
                    </>
                  ) : (
                    'Змінити пароль'
                  )}
                </Button>
              </div>
            </Form>
          )}
        </DynamicForm>
      </div>
    </section>
  );
};
export default ResetPasswordComponent;
