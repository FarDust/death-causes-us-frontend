import React, { lazy, Suspense } from 'react';

const LazyCauseViewer = lazy(() => import('./CauseViewer'));

const CauseViewer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCauseViewer {...props} />
  </Suspense>
);

export default CauseViewer;
