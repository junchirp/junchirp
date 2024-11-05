'use client';

import { useState } from 'react';
import { Form } from 'formik';
import { toast } from 'react-toastify';

import { useResetPasswordMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';

import { validationSchemaResetPassword } from '@/validation/validationResetPassword';

import { FormValuesResetPassword } from '@/components/Auth/ResetPassword/FormValuesResetPassword';

import SvgIcon from '@/components/UI/SvgIcon/SvgIcon';
import ErrorFeedback from '@/components/Auth/ErrorFeedback/ErrorFeedback';
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
      <div className={`${common.container} ${s.container__resend}`}>
        <h2 className={s.title}>Зміна пароля</h2>
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
              {/* <div className={s.form__box}> */}
              {/* <label
                  className={`${s.label} ${
                    touched.email && errors.email ? s.invalid : ''
                  } `}
                >
                  Email
                  <SvgIcon id="icon" width={6} height={16} className={s.chip} />
                </label> */}
              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                // className={`${s.input} ${
                //   (touched.email && errors.email) || backendError
                //     ? //
                //       s.invalid
                //     : touched.email && !errors.email
                //     ? s.valid
                //     : ''
                // }`}
                type={'email'}
                name={'email' as keyof object}
                error={touched.email && errors.email}
                label={'email'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />
              {/* {(touched.email && errors.email) || backendError ? (
                <span className={s.warning}>!</span>
              ) : null} */}

              {/* <ErrorFeedback name="email" /> */}
              {/* </div> */}
              {/* <div className={s.form__box}> */}
              {/* <label
                  className={`${s.label} ${
                    touched.code && errors.code ? s.invalid : ''
                  } `}
                >
                  Код
                  <SvgIcon id="icon" width={6} height={16} className={s.chip} />
                </label> */}
              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                // className={`${s.input} ${
                //   (touched.code && errors.code) || backendError
                //     ? // || backendError
                //       s.invalid
                //     : touched.code && !errors.code
                //     ? s.valid
                //     : ''
                // }`}
                type="text"
                name="code"
                error={touched.code && errors.code}
                label={'Код'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />
              {/* {(touched.code && errors.code) || backendError ? (
                <span className={s.warning}>!</span>
              ) : null}
              <ErrorFeedback name="code" /> */}
              {/* </div> */}
              {/* <div className={`${s.form__box} ${s.nth__child}`}> */}
              {/* <label
                  className={`${s.label}  ${
                    touched.newPassword && errors.newPassword ? s.invalid : ''
                  }`}
                >
                  Пароль
                  <SvgIcon id="icon" width={6} height={16} className={s.chip} />
                </label> */}

              <FormField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                // className={`${s.input} ${
                //   touched.newPassword && errors.newPassword
                //     ? s.invalid
                //     : touched.newPassword && !errors.newPassword
                //     ? s.valid
                //     : ''
                // }`}

                type={showPassword ? 'text' : 'password'}
                name={'newPassword' as keyof object}
                error={touched.newPassword && errors.newPassword}
                label={'Пароль'}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />

              {/* {touched.newPassword && errors.newPassword && (
                <span className={s.warning}>!</span>
              )} */}

              {/* <SvgIcon
                id={showPassword ? 'eye-close' : 'eye'}
                width={40}
                height={40}
                className={s.chip__eye}
                onClick={togglePasswordVisibility}
              /> */}

              {/* <ErrorFeedback name="newPassword" /> */}
              {/* </div> */}

              {/* {backendError && (
                <div className={common.error__backend}>{backendError}</div>
              )} */}

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
