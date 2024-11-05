'use client';

import { useState } from 'react';
import { Form } from 'formik';

import { useRequestPasswordResetMutation } from '@/services/auth-and-user-services';
import useRouterPush from '@/hooks/useRouter';
import { customError } from '@/types/commonTypes';

import { validationSchemaRequestPasswordReset } from '../../../validation/validationRequestPasswordReset';
import { FormValuesRequestPasswordReset } from './FormValuesRequestPasswordReset';

import Loader from '@/components/UI/Loader/Loader';
import Button from '@/components/UI/Button/Button';
import DynamicForm from '@/components/UI/Forms/DynamicForm/DynamicForm';
import { FormField } from '@/components/UI/Forms/CustomInput/CustomInput';

import s from './requestPasswordReset.module.scss';
import common from '@/components/Auth/commonAuthStyles.module.scss';

const RequestPasswordReset = () => {
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();
  const { pushRouter } = useRouterPush();
  const [backendError, setBackendError] = useState<string | null>(null);
  console.log(backendError);

  const handleChange = () => {
    setBackendError(null);
  };
  const handleSubmit = async (
    values: FormValuesRequestPasswordReset,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email } = values;
      const res = await requestPasswordReset({ email }).unwrap();

      if (res) {
        resetForm();
        pushRouter('/reset_password');
      }
    } catch (error) {
      const err = error as customError;
      const status = err.status;
      let errorMessage = 'Користувача не знайдено';
      if (status === 404) setBackendError(errorMessage);
    }
  };
  return (
    <section className={common.section}>
      <div className={`${common.container}    ${common.container__resend}`}>
        <h2 className={common.title}>Відправити запит на зміну паролю ?</h2>
        <DynamicForm
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaRequestPasswordReset}
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
                //     ? s.invalid
                //     : touched.email && !errors.email
                //     ? s.valid
                //     : ''
                // }`}
                type={'email'}
                name={'email'}
                label={'email'}
                error={touched.email && errors.email}
                touched={touched}
                errors={errors}
                backendError={backendError}
              />
              {/* {(touched.email && errors.email) || backendError ? (
                  <span className={s.warning}>!</span>
                ) : null}
                <ErrorFeedback name="email" /> */}
              {/* </div> */}
              {/* {backendError && (
                <div className={s.error__backend}>{backendError}</div>
              )} */}
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
                    відновити пароль <Loader />
                  </>
                ) : (
                  'відновити пароль'
                )}
              </Button>
            </Form>
          )}
        </DynamicForm>
      </div>
    </section>
  );
};

export default RequestPasswordReset;
