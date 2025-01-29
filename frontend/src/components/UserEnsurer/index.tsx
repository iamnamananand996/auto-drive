'use client';

import { FC, PropsWithChildren } from 'react';
import { useUserStore } from '../../states/user';

export const UserEnsurer: FC<PropsWithChildren> = ({ children }) => {
  const user = useUserStore(({ user }) => user);

  return user && children;
};
