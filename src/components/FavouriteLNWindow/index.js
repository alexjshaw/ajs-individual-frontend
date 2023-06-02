
import React from 'react'
import ListObject from "../ListObject"
import { Box, Grid } from '@mui/material'
// import { Masonry } from '@mui/lab'
import Masonry from 'react-responsive-masonry'
import useResizeObserver from '@react-hook/resize-observer'
import { useState, useEffect } from 'react'
import { debounce } from 'lodash';

const FavouriteLNWindow = ({ allLists, setTriggerReload, handleDeleteList, setAllLists }) => {
    const [columns, setColumns] = useState(getColumnsCount());
  
    useEffect(() => {
      function handleResize() {
        setColumns(getColumnsCount());
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const updateListObject = (updatedList) => {
      setAllLists((prevLists) =>
        prevLists.map((list) => (list.listId === updatedList.listId ? updatedList : list))
      );
    };
  
    function getColumnsCount() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 800) {
        return 1;
      } else if (windowWidth < 1200) {
        return 2;
      } else {
        return 3;
      }
    }
  
    return (
      <div style={{ maxWidth: '100%' }}>
        <Masonry columnsCount={columns} gutter="16px">
          {allLists
            .filter((list) => list.favourite)
            .map((list) => (
              <div key={list.listId} style={{ marginBottom: '16px' }}>
                <ListObject
                  list={list}
                  setTriggerReload={setTriggerReload}
                  handleDeleteList={handleDeleteList}
                  setAllLists={setAllLists}
                  updateListObject={updateListObject}
                />
              </div>
            ))}
        </Masonry>
      </div>
    );
  };
  
  

export default FavouriteLNWindow