import { CauseOfDeath } from "../../models/causeOfDeath";

export interface CauseFinderProps {
  causesOfDeath: CauseOfDeath[];
  favourites: CauseOfDeath[];
  favouriteControl: {
    addFavourite: (favourite: CauseOfDeath) => void;
    removeFavourite: (favourite: CauseOfDeath) => void;
    isFavourite: (favourite: CauseOfDeath) => boolean;
  };
  selectedHandler: (causeOfDeath: CauseOfDeath) => () => void;
}