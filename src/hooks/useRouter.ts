'use client';

import { useRouter } from '@/i18n/routing';

const useRouterPush = () => {
  const router = useRouter();

  const pushRouter = (route: string) => {
    router.push(route);
  };
  return { pushRouter };
};

export default useRouterPush;
