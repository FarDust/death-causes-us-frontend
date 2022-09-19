import React, { FC } from 'react';
import styles from './CauseViewer.module.scss';

interface CauseViewerProps {}

const CauseViewer: FC<CauseViewerProps> = () => (
  <div className={styles.CauseViewer} data-testid="CauseViewer">
    CauseViewer Component
  </div>
);

export default CauseViewer;
