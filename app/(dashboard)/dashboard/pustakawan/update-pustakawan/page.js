import UpdatePustakawan from '@/components/dashboard/pustakawan/update-pustakawan';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <UpdatePustakawan />
    </Suspense>
  );
}
