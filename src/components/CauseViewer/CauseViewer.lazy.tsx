import React, { lazy, Suspense } from 'react';
import Loading from '../Loading/Loading';
import type { CauseViewerProps } from './props';

const LazyCauseViewer = lazy(() => import('./CauseViewer'));

const CauseViewer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } & CauseViewerProps) => (
  <Suspense fallback={<Loading />}>
    <LazyCauseViewer {...props} />
  </Suspense>
);

export default CauseViewer;
