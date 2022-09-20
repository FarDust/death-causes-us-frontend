import {
  Toolbar,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  CardContent,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavouriteIcon from '@mui/icons-material/Favorite';
import styles from "./CauseFinder.module.scss";
import { StyledSearchBar } from "../StyledSearchBar/StyledSearchBar";
import { CauseOfDeath } from "../../models/causeOfDeath";
import { useFilterCauseOfDeath } from "../../hooks/useFilterCauseOfDeath";
import { useCreateFavouriteHandler } from "../../hooks/useCreateFavouriteHandler";
import { useSearchHandler } from "../../hooks/useSearchHandler";
import { CauseFinderProps } from "./props";


const pages = ["Enfermedad", "Favoritos"];
export interface ListCauseOfDeathProps {
  causesOfDeath: CauseOfDeath[];
  setSelectedCauseOfDeath: (causeOfDeath: CauseOfDeath) => () => void;
  favouriteControl: {
    addFavourite: (favourite: CauseOfDeath) => void;
    removeFavourite: (favourite: CauseOfDeath) => void;
    isFavourite: (favourite: CauseOfDeath) => boolean;
  }
}

const ListCauseOfDeath: FC<ListCauseOfDeathProps> = ({ causesOfDeath, favouriteControl, setSelectedCauseOfDeath }) => {
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
            { favouriteControl.isFavourite(causeOfDeath) ? <FavouriteIcon sx={{ color: 'red' }} /> : <FavouriteBorderIcon sx={{ color: 'white' }}/> }
            </ListItemIcon>
            <ListItemButton onClick={ setSelectedCauseOfDeath(causeOfDeath) }>
              <ListItemText primary={causeOfDeath.name} />
            </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}; 

const CauseFinder: FC<CauseFinderProps> = ({ causesOfDeath, favourites, favouriteControl, selectedHandler }) => {
  const [selectedPage, setSelectedPage] = React.useState(pages[0]);
  
  const { filteredCausesOfDeath, filterCausesOfDeath } = useFilterCauseOfDeath(causesOfDeath);
  
  const { search, searchHandler } = useSearchHandler(filterCausesOfDeath);
  const handlePageChange = (page: string) => () => setSelectedPage(page);

  const visibleCausesOfDeath = search.length > 2 ? filteredCausesOfDeath : causesOfDeath;
  
  return (
    <div className={styles.CauseFinder} data-testid="CauseFinder">
      <Card>
      <CardContent>
      <div className={styles['flex-column-container']}>
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
              <ListCauseOfDeath causesOfDeath={visibleCausesOfDeath} favouriteControl={favouriteControl} setSelectedCauseOfDeath={ selectedHandler }  />
            )}
            {selectedPage === pages[1] && (
              <ListCauseOfDeath causesOfDeath={favourites} favouriteControl={favouriteControl} setSelectedCauseOfDeath={ selectedHandler }/>
            )}
          </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CauseFinder;
