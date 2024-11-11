'use client';

import { Form } from 'formik';

import { validationSchemaConfirm } from '@/validation/validationConfirm';
import useEmailConfirmation from '@/hooks/useEmailConfirmation';
import useCodeInput from '@/hooks/useCodeInput';

import Button from '@/components/UI/Button/Button';
import Loader from '@/components/UI/Loader/Loader';

import DynamicForm from '../../UI/Forms/DynamicForm/DynamicForm';
import { FormField } from '../../UI/Forms/CustomInput/CustomInput';

import styles from './styles.module.scss';
import common from '@/components/Auth/commonAuthStyles.module.scss';

const ConfirComponent = () => {
  const {
    cooldown,
    email,
    timeLeft,
    isLoading,
    handleSubmit,
    handleResendCode,
    formatTime,
    backendError,
    handleChangeBackend,
  } = useEmailConfirmation();

  const { inputRefs, handleChange, handlePaste } = useCodeInput();

  return (
    <section className={styles.section}>
      <div className={`${common.container}    ${common.container__resend}`}>
        <h2 className={styles.title}>Підтвердження електронної пошти</h2>
        <p className={styles.text}>
          Введіть 6 значний код, який ми надіслали на Вашу електронну пошту{' '}
          <span className={styles.email__text}> {email} </span>{' '}
        </p>
        <p className={styles.timer}>
          {cooldown !== null
            ? `Кнопка стане доступною для нового запиту, а код залишиться активним ще   ${formatTime(
                cooldown
              )}.`
            : `Код активний ще ${formatTime(timeLeft)}.`}
        </p>
        <DynamicForm
          initialValues={{ code: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaConfirm}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            dirty,
            handleChange: formikHandleChange,
          }) => (
            <Form className={styles.form}>
              <div
                className={styles.form__box}
                onPaste={(e) => handlePaste(e, setFieldValue)}
              >
                {[...Array(6)].map((_, index) => (
                  <FormField
                    key={index}
                    name={`code[${index}]` as keyof object}
                    type="text"
                    touched={touched}
                    errors={errors}
                    backendError={backendError}
                    label=""
                    className={`${styles.input} ${
                      (touched.code && errors.code) || backendError
                        ? styles.invalid
                        : touched.code && !errors.code
                        ? styles.valid
                        : ''
                    }`}
                    maxLength={'1'}
                    value={values.code[index] || ''}
                    innerRef={(ref: HTMLInputElement) =>
                      (inputRefs.current[index] = ref)
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formikHandleChange(e);
                      handleChangeBackend();
                      handleChange(e, index, setFieldValue, values);
                    }}
                  />
                ))}
              </div>
              {backendError && (
                <div className={common.error__backend}>{backendError}</div>
              )}
              <Button
                className={`${common.styledBtn} ${styles.submit__comfirmBtn} ${
                  (touched.code && errors.code) || backendError
                    ? common.invalid
                    : touched.code && !errors.code
                    ? common.valid
                    : ''
                }
              ${backendError ? styles.invalid__backendError : ''}`}
                type="submit"
                isDisabled={isLoading || !dirty}
              >
                {isLoading ? (
                  <>
                    Підтвердити
                    <Loader />
                  </>
                ) : (
                  'Підтвердити'
                )}
              </Button>
            </Form>
          )}
        </DynamicForm>
        <Button
          title="Надіслати код повторно"
          onClick={() => email && handleResendCode(email)}
          className={`${styles.btn__resend} ${
            cooldown !== null ? styles.disabled : ''
          }`}
          isDisabled={cooldown !== null || isLoading}
        />
      </div>
    </section>
  );
};

export default ConfirComponent;
