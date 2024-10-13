"use client";

import Image from "next/image";

import { SearchParams } from "@/utils/types/SearchParams";
import useSaveUser from "@/hooks/useSaveUser";

const UserData = ({ searchParams }: SearchParams) => {
  const { userName, token, email, photo } = searchParams;
  useSaveUser({ userName, token, email, photo });
  return (
    <div>
      <h1>UserData</h1>
      <p>{userName}</p>
      <p>{email}</p>
      {photo && (
        <Image src={`${photo}`} alt="user photo" width={100} height={100} />
      )}
    </div>
  );
};

export default UserData;
