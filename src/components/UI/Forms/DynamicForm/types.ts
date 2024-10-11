import { FormikHelpers, FormikProps } from 'formik';

export interface DynamicFormProps {
  initialValues: any;
  validationSchema?: any;
  onSubmit: (values: any, actions: FormikHelpers<any>) => void | Promise<void>;
  children: React.ReactNode | ((props: FormikProps<any>) => React.ReactNode);
  enableReinitialize?: boolean;
}
