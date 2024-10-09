import { FC } from 'react';

import { RoleCard as RoleCardType } from '@/utils/types/RoleCard';
import { RoleCard } from './roleCard';

import s from './roleConfirmation.module.scss';

type Props = {
  roles: RoleCardType[];
  onSelectRole: (roleId: string) => void;
};

export const RoleList: FC<Props> = ({ roles, onSelectRole }) => {
  return (
    <div className={s.list}>
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} onSelectRole={onSelectRole} />
      ))}
    </div>
  );
};
