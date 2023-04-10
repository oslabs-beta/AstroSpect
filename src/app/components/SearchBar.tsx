import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SearchBarProps } from '../types/types';

// search bar in panel
const SearchBar: React.FC<SearchBarProps> = (
  props: SearchBarProps
): JSX.Element => {
  const { handleExpandClick, expanded } = props;
  const [found, setFound] = useState<HTMLElement[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [searchVal, setSearchVal] = useState<string>('');

  // searches through the tree to find text that matches the value of the text input
  const search = (): void => {
    // resets found and current
    setFound([]);
    setCurrent(0);
    // assign the text input value to a variable
    let textToSearch: string = (
      document.getElementById('text-to-search') as HTMLInputElement
    ).value;
    setSearchVal(textToSearch);
    // assign the searched text (tree view) to a variable
    const searchContents = document.querySelectorAll('.MuiTreeItem-label');
    // changing textToSearch to be a string that can be used as literal string in a regular expression without any unintended special meaning
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // object created which contains the escaped search string and flags 'gi' (means search is global and case sensitive)
    const pattern: RegExp = new RegExp(`${textToSearch}`, 'gi');
    // sets new array to be filled with matched elements
    const newArr: HTMLElement[] = [];
    // loop through each element in searchContents
    searchContents.forEach((item) => {
      const htmlItem = item as HTMLElement;
      if (htmlItem.textContent && htmlItem.textContent.match(pattern)) {
        newArr.push(htmlItem);
      }
      // get the textContent inside each element
      // replace any matches of the pattern with a highlighted version of the match
      const content = htmlItem.textContent || '';
      const highlightedText: string = content.replace(
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
  const scrollNext = (): void => {
    current < found.length - 1 ? setCurrent(current + 1) : setCurrent(0);
    found[current].scrollIntoView();
  };

  // scrolls to previous found element
  const scrollPrev = (): void => {
    current === 0 ? setCurrent(found.length - 1) : setCurrent(current - 1);
    found[current].scrollIntoView();
  };

  // // searchs when input field is updated
  // const handleInputChange = () => {
  //   search();
  // };

  return (
    <div id='search-bar'>
      <SearchIcon className='search-icon' />
      <input
        className='search-bar-text'
        type='text'
        id='text-to-search'
        placeholder='Filter...'
        onChange={search}
        onClick={expanded.length === 0 ? handleExpandClick : undefined}
      />
      <div>
        {searchVal.length > 0 && (
          <div className='prev-next'>
            <KeyboardArrowUpIcon onClick={scrollPrev} />
            <KeyboardArrowDownIcon onClick={scrollNext} />
            <div>
              {found.length === 0 ? 0 : current + 1}/{found.length}
            </div>
          </div>
        )}
      </div>
      <div className='separator' />
      <Button className='expand-collapse' onClick={handleExpandClick}>
        {expanded.length === 0 ? 'Expand' : 'Collapse'}
      </Button>
    </div>
  );
};

export default SearchBar;
