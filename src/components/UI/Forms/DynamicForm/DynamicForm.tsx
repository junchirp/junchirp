'use client';

import { Form, Formik } from 'formik';

import { DynamicFormProps } from './types';

const DynamicForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize = false,
  classForm,
}: DynamicFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <>{typeof children === 'function' ? children(formikProps) : children}</>
      )}
    </Formik>
  );
};

export default DynamicForm;
