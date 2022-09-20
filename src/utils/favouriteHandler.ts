import { CauseOfDeath } from "../models/causeOfDeath";

export const createFavouriteHandler = (
  causeOfDeath: CauseOfDeath,
  addFavourite: (favourite: CauseOfDeath) => void,
  removeFavourite: (favourite: CauseOfDeath) => void,
  isFavourite: (favourite: CauseOfDeath) => boolean) => {
  return () => {
    if (isFavourite(causeOfDeath)) {
      removeFavourite(causeOfDeath);
    } else {
      addFavourite(causeOfDeath);
    }
  }
}