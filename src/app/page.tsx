import { redirect } from '@/i18n/routing';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect(
    `/ua` as unknown as {
      href: { pathname: string; query?: Record<string, string> };
      locale: string;
    }
  );
}
