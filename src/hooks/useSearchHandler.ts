import { ChangeEvent, useState }from "react";

export const useSearchHandler = (filter: (event: ChangeEvent<HTMLInputElement>) => void) => {

  const [search, setSearch] = useState("");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && search !== event.target.value && event.target.value.length > 2) {
      setSearch(event.target.value);
      filter(event);
    };
  };

  return { search, searchHandler };
}