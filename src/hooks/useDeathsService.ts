import { useState, useEffect } from "react";
import { CauseOfDeath } from "../models/causeOfDeath";
import { Death } from "../models/death";
import { deathsService } from "../services/Deaths.service";

export const useDeathsService = (deathCause: CauseOfDeath | null) => {
  const [subscribed, setSubscribed] = useState(false);
  const [lastDeathCause, setLastDeathCause] = useState<CauseOfDeath | null>(null);
  const [deaths, setDeaths] = useState<Death[]>([]);
  
  useEffect(() => {
    if (!subscribed) {
      deathsService.subscribe((deaths: Death[]) => {
        setDeaths(deaths);
      });
      setSubscribed(true);
    }
  }, [subscribed]);

  useEffect(() => {
    if (deathCause && lastDeathCause !== deathCause) {
      deathsService.list(deathCause.id);
      setLastDeathCause(deathCause);
    }
  }, [deathCause, lastDeathCause]);

  return { deaths };
};