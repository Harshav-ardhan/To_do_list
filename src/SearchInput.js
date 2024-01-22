// SearchInput.js
import React from 'react';

const SearchInput = ({ search, setSearch }) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <input
        id='search'
        type='text'
        placeholder='Search Item'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
