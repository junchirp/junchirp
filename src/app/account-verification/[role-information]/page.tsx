import { getRoleForm } from '@/libs/enums/helpers/getRoleForm';
import { RoleType } from '@/components/RoleConfirmation/RoleConfirmation.types';

const RoleInformationPage = ({
  params,
}: {
  params: { 'role-information': RoleType };
}) => {
  const role = params['role-information'];

  return <section>{getRoleForm(role)}</section>;
};

export default RoleInformationPage;
