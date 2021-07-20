import { FiSearch } from 'react-icons/fi';
import React, { useState, useCallback } from 'react';

import { Container } from './styles';

interface SearchProps {
  setProvidersSearch: (state: any) => void;
}

const Search: React.FC<SearchProps> = ({ setProvidersSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <input
        name="search"
        placeholder="Pesquisar..."
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        onChange={event => {
          setProvidersSearch(event.target.value);
        }}
      />

      <FiSearch size={20} />
    </Container>
  );
};

export default Search;
