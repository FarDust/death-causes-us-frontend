import React, { FC } from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => (
  <div className={styles.Loading} data-testid="Loading">
    Loading...
  </div>
);

export default Loading;
