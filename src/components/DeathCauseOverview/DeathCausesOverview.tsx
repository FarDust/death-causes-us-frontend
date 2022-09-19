import { FC, Suspense } from "react";
import CauseFinder from "../CauseFinder/CauseFinder.lazy";
import CauseViewer from "../CauseViewer/CauseViewer.lazy";
import Loading from "../Loading/Loading";
import styles from './DeathCausesOverview.module.scss'

export interface DeathCausesOverviewProps {}

export const DeathCausesOverview: FC<DeathCausesOverviewProps> = () => {
  

  return (
    <div className={ styles['base-container'] }>
      <h1>Visor de causas de muerte</h1>
      <div className={styles['viewer-flex-container']}>
        <Suspense fallback={<Loading />}>
          <CauseFinder></CauseFinder>
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CauseViewer></CauseViewer>
        </Suspense>
      </div>
    </div>
  );
};