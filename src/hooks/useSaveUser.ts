'use client';

import { useEffect } from 'react';

import { setUser } from '@/redux/auth/authSlice';

import { useAppDispatch } from './redux-hook';
import { IUser } from '@/types/commonTypes';

const useSaveUser = ({ userName, token, email, photo }: IUser) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setUser({ accessToken: token, userName, email, photo }));
    }
  }, [dispatch, email, photo, token, userName]);
};

export default useSaveUser;
