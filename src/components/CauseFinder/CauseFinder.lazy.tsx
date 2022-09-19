import React, { lazy, Suspense } from 'react';

const LazyCauseFinder = lazy(() => import('./CauseFinder'));

const CauseFinder = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCauseFinder {...props} />
  </Suspense>
);

export default CauseFinder;
