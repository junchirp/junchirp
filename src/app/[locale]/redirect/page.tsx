import { redirect } from 'next/navigation';
type Props = {
  params: { locale: string };
};
// This page only renders when the app is built statically (output: 'export')
export default function Error505Redirect({ params: { locale } }: Props) {
  redirect(`/${locale}`);
}
