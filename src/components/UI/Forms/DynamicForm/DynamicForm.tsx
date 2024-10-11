'use client';

import { Formik } from 'formik';
import { DynamicFormProps } from './types';

const DynamicForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize = false,
}: DynamicFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        // тут використовую фрагмент, т.я. <Form/> використовується безпосередньо у компоненті
        <>{typeof children === 'function' ? children(formikProps) : children}</>
      )}
    </Formik>
  );
};

export default DynamicForm;
