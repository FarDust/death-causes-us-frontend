import React, { FC, PropsWithChildren } from 'react';
import {
  InputBase,
  alpha,
  Theme as MaterialTheme,
  Box
} from "@mui/material";
import { Theme } from "@mui/system/createTheme/createTheme";
import SearchIcon from "@mui/icons-material/Search";
import styles from './StyledSearchBar.module.scss';

const inputBaseTheme = (theme: MaterialTheme) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
});

const searchTheme = (theme: Theme) => {
  return {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  };
};

const Search: FC<PropsWithChildren> = (props) => (
  <Box sx={(theme) => searchTheme(theme)}>{props.children}</Box>
);

const searchIconWrapperTheme = (theme: Theme) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SearchIconWrapper: FC<PropsWithChildren> = (props) => (
  <Box sx={(theme) => searchIconWrapperTheme(theme)}>{props.children}</Box>
);

interface StyledSearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StyledSearchBar: FC<StyledSearchBarProps> = (props) => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <InputBase
      sx={inputBaseTheme}
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      onChange={props.handleSearch}
    />
  </Search>
);
