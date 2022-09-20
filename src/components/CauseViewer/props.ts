import { CauseOfDeath } from "../../models/causeOfDeath";
import { Death } from "../../models/death";

export interface CauseViewerProps {
  causeOfDeath: CauseOfDeath;
  favourite: boolean;
  deathData: Death[];
}
