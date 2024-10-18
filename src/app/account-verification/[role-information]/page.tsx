import { RoleType } from '@/components/RoleConfirmation/RoleConfirmation.types';
import { getRoleForm } from '@/libs/enums/helpers/getRoleForm';


const RoleInformationPage = ({
  params,
}: {
  params: { 'role-information': RoleType };
}) => {
  const role = params['role-information'];

  return <section>{getRoleForm(role)}</section>;
};

export default RoleInformationPage;
