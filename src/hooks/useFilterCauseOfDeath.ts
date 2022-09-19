import React from "react";
import { CauseOfDeath } from "../models/causeOfDeath";

export const useFilterCauseOfDeath = (causesOfDeath: CauseOfDeath[]) => {
  const [filteredCausesOfDeath, setFilteredCausesOfDeath] = React.useState<CauseOfDeath[]>([]);
  const filterCausesOfDeath = (event: React.ChangeEvent<HTMLInputElement>) => setFilteredCausesOfDeath(
    causesOfDeath.filter((causeOfDeath) =>
      causeOfDeath.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
  );
  return { filteredCausesOfDeath, filterCausesOfDeath };
}