import './style.css'
import React from 'react'
import ListObject from "../ListObject"
import { Box, Grid } from '@mui/material'
import Masonry from 'react-responsive-masonry'
import { useState, useEffect } from 'react'

const ListWindow = ({ allLists, setAllLists, searchTerm, setTriggerReload, fetchAllLists }) => {
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
      .filter((list) => {
        const { name, description, items } = list;
        const hasSearchTerm =
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          items.some((item) => item.itemText.includes(searchTerm));
        return hasSearchTerm;
      })
      .map((list) => (
        <div key={list.listId} style={{ marginBottom: '16px' }}>
          <ListObject
            list={list}
            setTriggerReload={setTriggerReload}
            allLists={allLists}
            setAllLists={setAllLists}
            fetchAllLists={fetchAllLists}
          />
        </div>
      ))}
  </Masonry>
</div>
  );
};

export default ListWindow;