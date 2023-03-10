import React, { useState } from 'react';
import Button from '@mui/material/Button';

// search bar in panel
const SearchBar = (props) => {
  const { handleExpandClick, expanded } = props;
  const [found, setFound] = useState([]);
  const [current, setCurrent] = useState(0);
  const [searchVal, setSearchVal] = useState('');

  // searches through the tree to find text that matches the value of the text input
  const search = () => {
    // resets found and current
    setFound([]);
    setCurrent(0);
    // assign the text input value to a variable
    let textToSearch = document.getElementById('text-to-search').value;
    setSearchVal(textToSearch);
    // assign the searched text (tree view) to a variable
    let searchContents = document.querySelectorAll('.MuiTreeItem-label');
    // changing textToSearch to be a string that can be used as literal string in a regular expression without any unintended special meaning
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //object created which contains the escaped search string and flags 'gi' (means search is global and case sensitive)
    let pattern = new RegExp(`${textToSearch}`, 'gi');
    // sets new array to be filled with matched elements
    const newArr = [];
    // loop through each element in searchContents
    searchContents.forEach((item) => {
      if (item.textContent.match(pattern)) {
        newArr.push(item);
      }
      // get the textContent inside each element
      // replace any matches of the pattern with a highlighted version of the match
      const highlightedText = item.textContent.replace(
        pattern,
        (match) => `<mark>${match}</mark>` // performs the highlighting
      );
      // this replaces the original text content with the highlighted version in the actual HTML of the page
      item.innerHTML = highlightedText;
    });
    // sets found to the array of matching elements
    setFound([...newArr]);
    // scrolls automatically to first found element
    if (found[current]) found[current].scrollIntoView();
  };

  // scroll to next found element
  const scrollNext = () => {
    current < found.length - 1 ? setCurrent(current + 1) : setCurrent(0);
    found[current].scrollIntoView();
  };

  // scrolls to previous found element
  const scrollPrev = () => {
    current === 0 ? setCurrent(found.length - 1) : setCurrent(current - 1);
    found[current].scrollIntoView();
  };

  const handleInputChange = () => {
    search();
  };

  return (
    <div className={'search-bar'}>
      <input
        type='text'
        id='text-to-search'
        placeholder='Search Bar'
        onChange={handleInputChange}
        style={styles.searchbar}
        onClick={handleExpandClick}
      />
      <div>
        <button onClick={scrollPrev}>Prev</button>
        <button onClick={scrollNext}>Next</button>
        {searchVal.length > 0 && (
          <div>
            {current + 1}/{found.length}
          </div>
        )}
      </div>
      <Button onClick={handleExpandClick}>
        {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
      </Button>
    </div>
  );
};

const styles = {
  searchbar: {
    width: '50%',
    fontSize: '14px',
    marginLeft: '10px',
    marginBottom: '10px',
  },
};
export default SearchBar;

// <button onClick={search}>Search</button>
