import { useState } from 'react';
import { Field, Form } from 'formik';

import useRegisterFormik from '@/hooks/useRegisterFormik';
import Error from '@/app/[locale]/register/error';
import { CustomError } from '@/types/commonTypes';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator/PasswordStrengthIndicator';
import { validationSchemaRegister } from '@/validation/validationRegister';

import { FormField } from '@/components/UI/Forms/CustomInput/CustomInput';
import DynamicForm from '@/components/UI/Forms/DynamicForm/DynamicForm';
import Button from '@/components/UI/Button/Button';
import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';
import Loader from '@/components/UI/Loader/Loader';

import s from './register.module.scss';
import common from '@/components/Auth/commonAuthStyles.module.scss';

const RegisterFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    isLoading,
    backendError,
    handleChange,
    isError,
    error,
  } = useRegisterFormik();

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // функція, яка обробляє умови для визначення класу на кнопці submit і повертає певне значення
  const getButtonClass = ({
    isLoading,
    isValid,
    touched,
    errors,
    backendError,
  }: {
    isLoading: boolean;
    isValid: boolean;
    touched: any;
    errors: any;
    backendError: string | null;
  }) => {
    if (isLoading || isValid) {
      return common.valid;
    }

    if (
      !touched.userName ||
      errors.userName ||
      !touched.email ||
      errors.email ||
      !touched.password ||
      errors.password ||
      !touched.confirmPassword ||
      errors.confirmPassword ||
      !touched.rememberMe ||
      errors.rememberMe
    ) {
      return ' ';
    }

    return backendError ? common.invalid : common.valid;
  };

  return (
    <>
      {isError && error && (
        <Error
          error={{
            status: (error as CustomError).status,
            data: (error as CustomError).data,
          }}
          reset={() => window.location.reload()}
        />
      )}
      <DynamicForm
        initialValues={{
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
          rememberMe: false,
        }}
        validationSchema={validationSchemaRegister}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          dirty,
          values,
          handleChange: formikHandleChange,
          isValid,
        }) => (
          <Form className={common.form}>
            <FormField
              name={'userName'}
              label={'Ім`я'}
              type={'text'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
            />
            <FormField
              name={'email'}
              label={'Email'}
              type={'email'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
            />
            <FormField
              name={'password'}
              label={'Пароль'}
              type={'password'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              isThisPassword={true}
            />

            <PasswordStrengthIndicator password={values.password} />

            <FormField
              name={'confirmPassword'}
              label={'Повторити пароль'}
              type={'password'}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              isThisPassword={true}
            />

            <div className={s.form__box__checkbox}>
              <div className={s.form__box__checkbox__field}>
                <div className={s.checkbox__wraper}>
                  <Field
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formikHandleChange(e);
                      handleChange();
                    }}
                    type="checkbox"
                    name="rememberMe"
                    className={`${s.checkbox} `}
                  />
                  <SvgIcon
                    id="checkbox"
                    width={14}
                    height={12}
                    className={s.chip__checkbox}
                  />
                </div>

                <label className={`${s.checkboxLabel} `}>
                  <p className={s.text}>
                    Я погоджуюсь з{' '}
                    <span className={s.text__chip__checkbox}>
                      {' '}
                      Умовами використання{' '}
                    </span>{' '}
                    та{' '}
                    <span className={s.text__chip__checkbox}>
                      {' '}
                      Політикою конфіденційності{' '}
                    </span>
                  </p>
                </label>
              </div>
              {errors.rememberMe && touched.rememberMe && (
                <div className={s.invalid__checkbox__message}>
                  {typeof errors.rememberMe === 'string' && errors.rememberMe}
                </div>
              )}
            </div>

            {backendError && (
              <div className={common.error__backend}>{backendError}</div>
            )}
            <div className={common.box__btn}>
              <Button
                title="ОЧИСТИТИ"
                className={common.resetBtn}
                type="reset"
                isDisabled={!dirty || isLoading}
              />
              <Button
                className={`${common.styledBtn} ${
                  isLoading || isValid
                    ? common.valid
                    : !touched.userName ||
                      errors.userName ||
                      !touched.email ||
                      errors.email ||
                      !touched.password ||
                      errors.password ||
                      !touched.confirmPassword ||
                      errors.confirmPassword ||
                      !touched.rememberMe ||
                      errors.rememberMe
                    ? ' '
                    : backendError
                    ? common.invalid
                    : common.valid
                }`}
                type="submit"
                isDisabled={!dirty || isLoading}
              >
                {isLoading ? (
                  <>
                    Зареєструватись
                    <Loader />
                  </>
                ) : (
                  'Зареєструватись'
                )}
              </Button>
            </div>
          </Form>
        )}
      </DynamicForm>
    </>
  );
};
export default RegisterFormik;
