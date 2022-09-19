import {
  AppBar,
  Toolbar,
  InputBase,
  alpha,
  Theme as MaterialTheme,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, PropsWithChildren } from "react";
import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavouriteIcon from '@mui/icons-material/Favorite';
import styles from "./CauseFinder.module.scss";
import { StyledSearchBar } from "../StyledSearchBar/StyledSearchBar";
import { CauseOfDeath } from "../../models/causeOfDeath";

interface CauseFinderProps {}

const pages = ["Enfermedad", "Favoritos"];

export const useSearchHandler = (filter: (event: React.ChangeEvent<HTMLInputElement>) => void) => {

  const [search, setSearch] = React.useState("");

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && search !== event.target.value && event.target.value.length > 2) {
      setSearch(event.target.value);
      filter(event);
    };
  };

  return { search, searchHandler };
}

export const useFilterCauseOfDeath = (causesOfDeath: CauseOfDeath[]) => {
  const [filteredCausesOfDeath, setFilteredCausesOfDeath] = React.useState<CauseOfDeath[]>([]);
  const filterCausesOfDeath = (event: React.ChangeEvent<HTMLInputElement>) => setFilteredCausesOfDeath(
    causesOfDeath.filter((causeOfDeath) =>
      causeOfDeath.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
  );
  return { filteredCausesOfDeath, filterCausesOfDeath };
}

export const useCauseOfDeathState = () => {
  const [causesOfDeath, setCausesOfDeath] = React.useState<CauseOfDeath[]>([
    {
      id: 1,
      name: "Enfermedad 1",
    },
    {
      id: 2,
      name: "Enfermedad 2",
    }
  ]);
  const [selectedCauseOfDeath, setSelectedCauseOfDeath] = React.useState<CauseOfDeath | null>(null);

  return {
    causesOfDeath,
    setCausesOfDeath,
    selectedCauseOfDeath,
    setSelectedCauseOfDeath,
  };
}

export function useFavouritesSelector<T>() {
  const [favourites, setFavourites] = React.useState<T[]>([]);
  const addFavourite = (favourite: T) => setFavourites([...favourites, favourite]);
  const removeFavourite = (favourite: T) => setFavourites(favourites.filter((f) => f !== favourite));
  const isFavourite = (favourite: T) => favourites.includes(favourite);
  return { favourites, favouriteControl: { addFavourite, removeFavourite, isFavourite } };
} 

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

export interface ListCauseOfDeathProps {
  causesOfDeath: CauseOfDeath[];
  favouriteControl: {
    addFavourite: (favourite: CauseOfDeath) => void;
    removeFavourite: (favourite: CauseOfDeath) => void;
    isFavourite: (favourite: CauseOfDeath) => boolean;
  }
}

const ListCauseOfDeath: FC<ListCauseOfDeathProps> = ({ causesOfDeath, favouriteControl }) => {
  return (
    <List component="nav">
      {causesOfDeath.map((causeOfDeath) => (
        <ListItem key={causeOfDeath.id}>
          
          <ListItemIcon sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}} onClick={useCreateFavouriteHandler(
            causeOfDeath,
            favouriteControl.addFavourite,
            favouriteControl.removeFavourite,
            favouriteControl.isFavourite
          )}>
            { favouriteControl.isFavourite(causeOfDeath) ? <FavouriteIcon sx={{ color: 'red' }} /> : <FavouriteBorderIcon /> }
            </ListItemIcon>
            <ListItemButton>
              <ListItemText primary={causeOfDeath.name} />
            </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const CauseFinder: FC<CauseFinderProps> = () => {
  const {
    causesOfDeath,
    setCausesOfDeath,
    selectedCauseOfDeath,
    setSelectedCauseOfDeath,
  } = useCauseOfDeathState();
  const [selectedPage, setSelectedPage] = React.useState(pages[0]);

  const { filteredCausesOfDeath, filterCausesOfDeath } = useFilterCauseOfDeath(causesOfDeath);

  const { search, searchHandler } = useSearchHandler(filterCausesOfDeath);
  const handlePageChange = (page: string) => () => setSelectedPage(page);
  const { favourites, favouriteControl } = useFavouritesSelector<CauseOfDeath>();

  const visibleCausesOfDeath = search !== '' ? filteredCausesOfDeath : causesOfDeath;

  return (
    <div className={styles.CauseFinder} data-testid="CauseFinder">
      <AppBar position="static">
        <div className={ styles['flex-column-container']}>
          <Toolbar variant="dense">
            <div className={ styles['flex-column-container']}>
            <Box sx={{ flexGrow: 0, display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 1, color: 'white', display: 'block' }}
                  onClick={handlePageChange(page)}
                  variant={selectedPage === page ? "contained" : "outlined"}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <StyledSearchBar handleSearch={searchHandler} />
            </div>
          </Toolbar>
          <Box sx={{ width: '100%' }}>
            {selectedPage === pages[0] && (
              <ListCauseOfDeath causesOfDeath={visibleCausesOfDeath} favouriteControl={favouriteControl} />
            )}
            {selectedPage === pages[1] && (
              <ListCauseOfDeath causesOfDeath={favourites} favouriteControl={favouriteControl}/>
            )}
          </Box>
        </div>
      </AppBar>
    </div>
  );
};

export default CauseFinder;
