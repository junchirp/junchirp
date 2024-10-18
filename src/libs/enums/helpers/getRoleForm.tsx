import { RoleType } from '@/components/RoleConfirmation/RoleConfirmation.types';
import { Roles } from '../app/Role';

import JuniorForm from '@/components/UI/Forms/RoleFormes/junior/JuniorForm';
import PartnerForm from '@/components/UI/Forms/RoleFormes/partner/PartnerForm';
import MentorForm from '@/components/UI/Forms/RoleFormes/mentor/MentorForm';
import InvestorForm from '@/components/UI/Forms/RoleFormes/investor/InvestorForm';

export const getRoleForm = (role: RoleType): React.ReactElement => {
  console.log(Roles.JUNIOR);
  switch (role) {
    case Roles.INVESTOR:
      return <InvestorForm />;
    case Roles.JUNIOR:
      return <JuniorForm />;
    case Roles.MENTOR:
      return <MentorForm />;
    case Roles.PARTNER:
      return <PartnerForm />;
    default:
      return <p>No form available for this role.</p>;
  }
};
