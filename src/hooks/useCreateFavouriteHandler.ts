import { CauseOfDeath } from "../models/causeOfDeath";

export const useCreateFavouriteHandler = (
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