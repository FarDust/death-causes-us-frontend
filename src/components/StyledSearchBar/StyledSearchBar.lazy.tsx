import React, { lazy, Suspense } from 'react';

const LazyStyledSearchBar = lazy(() => import('./StyledSearchBar'));

const StyledSearchBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStyledSearchBar {...props} />
  </Suspense>
);

export default StyledSearchBar;
