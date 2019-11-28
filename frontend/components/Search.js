import React, { useState } from 'react';
import Downshift from 'downshift';
import { SearchStyle, DropDown, DropDownItem } from '../styles/SearchStyle';
import useDebounce from './hooks/useDebounce';
import useGetAPI from './hooks/useGetAPI';

const uri = process.env.DEV_API;

const Search = () => {
  const submitQuery = (e) => {
    if (e) e.preventDefault();
    console.log('submitting', e);
  };

  const [query, setQuery] = useState('');

  const debouncedValue = useDebounce(query, 250);

  const [results, getQueryResults] = useGetAPI(`${uri}search?q=${query}`);

  const handleInput = (e) => {
    if (e) e.preventDefault();
    setQuery(e.target.value);
    if (debouncedValue) {
      getQueryResults();
    }
  };

  const handleResultClick = (e) => {
    console.log('clicked, redirect');
  };
  return (
    <SearchStyle>
      <Downshift
        onChange={handleResultClick}
        itemToString={item => (item === null ? '' : item.description)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search Caches',
                id: 'search',
                className: results.loading ? 'loading' : '',
                onChange: (e) => {
                  e.persist();
                  handleInput(e);
                },
              })}
            />
            {results.data && isOpen && (
              <DropDown>
                {results.data.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    {item.description}
                  </DropDownItem>
                ))}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyle>
  );
};

export default Search;
