import { useCallback, useEffect, useState } from "react";
import { CauseOfDeath } from "../models/causeOfDeath";
import { deathCauseService } from "../services/DeathCause.service";

export const useDeathCausesService = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [causesOfDeath, setCausesOfDeath] = useState<CauseOfDeath[]>([]);
  useEffect(() => {
    if (!subscribed) {
      deathCauseService.subscribe((causesOfDeath: CauseOfDeath[]) => {
        setCausesOfDeath(causesOfDeath);
      });
      deathCauseService.list();
      setSubscribed(true);
    }
  }, [subscribed]);

  
  return { causesOfDeath };
};