import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// search bar in panel
const SearchBar = (props) => {
  const { handleExpandClick, expanded } = props;
  // searches through the tree to find text that matches the value of the text input
  function search() {
    //   const myTreeView = document.getElementById('tree-view');
    //   myTreeView.ExpandAll();
    // assign the text input value to a variable
    let textToSearch = document.getElementById('text-to-search').value;
    // assign the searched text (tree view) to a variable
    let searchContents = document.querySelectorAll('.MuiTreeItem-label');
    // changing textToSearch to be a string that can be used as literal string in a regular expression without any unintended special meaning
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //object created which contains the escaped search string and flags 'gi' (means search is global and case sensitive)
    let pattern = new RegExp(`${textToSearch}`, 'gi');

    // loop through each element in searchContents
    searchContents.forEach((item) => {
      // get the textContent inside each element
      // replace any matches of the pattern with a highlighted version of the match
      const highlightedText = item.textContent.replace(
        pattern,
        (match) => `<mark>${match}</mark>` // performs the highlighting
      );
      // this replaces the original text content with the highlighted version in the actual HTML of the page
      item.innerHTML = highlightedText;
    });
  }

  function handleInputChange() {
    search();
  }
  return (
    <div id="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        id="text-to-search"
        placeholder="Filter..."
        onChange={handleInputChange}
        style={styles.searchbar}
        onClick={handleExpandClick}
      />
      <div className="separator" />
      <Button onClick={handleExpandClick}>
        {expanded.length === 0 ? 'Expand' : 'Collapse'}
      </Button>
    </div>
  );
};

const styles = {
  searchbar: {
    width: '100%',
    fontSize: '14px',
  },
};
export default SearchBar;

// <button onClick={search}>Search</button>
