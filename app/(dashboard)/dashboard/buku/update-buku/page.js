import UpdateBukuComponent from '@/components/dashboard/buku/update-buku';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <UpdateBukuComponent />
    </Suspense>
  );
}
