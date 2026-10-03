import { redirect } from 'next/navigation';

export default function CircuitsRedirect({
  searchParams,
}: {
  searchParams?: { zone?: string };
}) {
  const zone = searchParams?.zone || 'north';
  redirect(`/hopping?zone=${zone}`);
}
