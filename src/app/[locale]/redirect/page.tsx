import { redirect } from '@/i18n/routing';

type Props = {
  params: { locale: string };
};
// This page only renders when the app is built statically (output: 'export')
export default function Error505Redirect({ params: { locale } }: Props) {
  redirect(
    `/${locale}` as unknown as {
      href: { pathname: string; query?: Record<string, string> };
      locale: string;
    }
  );
}
