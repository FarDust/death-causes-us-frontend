import React from "react";

export function useFavouritesSelector<T>() {
  const [favourites, setFavourites] = React.useState<T[]>([]);
  const addFavourite = (favourite: T) => setFavourites([...favourites, favourite]);
  const removeFavourite = (favourite: T) => setFavourites(favourites.filter((f) => f !== favourite));
  const isFavourite = (favourite: T) => favourites.includes(favourite);
  return { favourites, favouriteControl: { addFavourite, removeFavourite, isFavourite } };
} 