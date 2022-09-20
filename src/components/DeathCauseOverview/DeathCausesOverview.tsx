import { Card, CardContent, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useDeathCausesService } from "../../hooks/useDeathCausesService";
import { useDeathsService } from "../../hooks/useDeathsService";
import { useFavouritesSelector } from "../../hooks/useFavouritesSelector";
import { CauseOfDeath } from "../../models/causeOfDeath";
import CauseFinder from "../CauseFinder/CauseFinder.lazy";
import CauseViewer from "../CauseViewer/CauseViewer.lazy";
import Loading from "../Loading/Loading";
import styles from './DeathCausesOverview.module.scss'

export const useCauseOfDeathState = () => {
  const [selectedCauseOfDeath, setSelectedCauseOfDeath] = useState<CauseOfDeath | null>(null);

  return {
    selectedCauseOfDeath,
    setSelectedCauseOfDeath,
  };
}


export interface DeathCausesOverviewProps {}

export const DeathCausesOverview: FC<DeathCausesOverviewProps> = () => {
  
  const {
    selectedCauseOfDeath,
    setSelectedCauseOfDeath,
  } = useCauseOfDeathState();

  const { causesOfDeath } = useDeathCausesService();
  const { deaths } = useDeathsService(selectedCauseOfDeath);

  const { favourites, favouriteControl } = useFavouritesSelector<CauseOfDeath>();
  const isSelectedFavourite = selectedCauseOfDeath ? favouriteControl.isFavourite(selectedCauseOfDeath) : false;

  const selectedHandler = (causeOfDeath: CauseOfDeath) => () => {
    setSelectedCauseOfDeath(causeOfDeath);
  }

  return (
    <div className={ styles['base-container'] }>
      <h1>Visor de causas de muerte</h1>
      <div className={styles['viewer-flex-container']}>
        <CauseFinder causesOfDeath={causesOfDeath} favourites={favourites} favouriteControl={favouriteControl} selectedHandler={selectedHandler}></CauseFinder>
        {
          selectedCauseOfDeath ?
            <CauseViewer causeOfDeath={selectedCauseOfDeath} favourite={isSelectedFavourite} deathData={deaths}></CauseViewer>
            :
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  No hay ninguna causa de muerte seleccionada
                </Typography>
              </CardContent>
            </Card>
        }
      </div>
    </div>
  );
};