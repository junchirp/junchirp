import RoleConfirmation from '@/components/RoleConfirmation/roleConfirmation';
import { Props } from '@/types/commonTypes';
import { setRequestLocale } from 'next-intl/server';

const RoleConfirmationPage = ({ params: { locale } }: Props) => {
  setRequestLocale(locale);
  return (
    <section>
      <RoleConfirmation />
    </section>
  );
};
export default RoleConfirmationPage;
