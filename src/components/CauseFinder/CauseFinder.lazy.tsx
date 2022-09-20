import React, { lazy, Suspense } from 'react';
import Loading from '../Loading/Loading';
import type { CauseFinderProps } from './props';

const LazyCauseFinder = lazy(() => import('./CauseFinder'));

const CauseFinder = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & CauseFinderProps) => (
  <Suspense fallback={<Loading />}>
    <LazyCauseFinder {...props} />
  </Suspense>
);

export default CauseFinder;
