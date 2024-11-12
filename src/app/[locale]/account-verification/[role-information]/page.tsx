import getRoleForm from '@/libs/enums/helpers/getRoleForm';
import { setRequestLocale } from 'next-intl/server';
import { Props } from '@/types/commonTypes';

const RoleInformationPage = ({ params }: Props) => {
  const role = params['role-information'];
  setRequestLocale(params.locale);

  return <section>{getRoleForm(role)}</section>;
};

export default RoleInformationPage;
