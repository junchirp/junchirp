import { ErrorMessage } from 'formik';

import { roboto } from '@/utils/fonts';

import s from './errorFeedback.module.scss';

export interface ErrorFeedbackProps {
  name: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => (
        <span className={`${s.error} ${roboto.className}`}>{errorMessage}</span>
      )}
    </ErrorMessage>
  );
};
export default ErrorFeedback;
