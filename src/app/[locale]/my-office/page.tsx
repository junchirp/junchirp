'use client';

import Image from 'next/image';

import useSaveUser from '@/hooks/useSaveUser';
import { SearchParams } from '@/types/commonTypes';

const MyOfficePage = ({ searchParams }: SearchParams) => {
  const { userName, token, email, photo } = searchParams;
  useSaveUser({ userName, token, email, photo });
  return (
    <div>
      <h1>MyOfficePage</h1>
      <p>{userName}</p>
      <p>{email}</p>
      {photo && (
        <Image src={`${photo}`} alt="user photo" width={100} height={100} />
      )}
    </div>
  );
};

export default MyOfficePage;
