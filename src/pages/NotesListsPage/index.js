import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import FavouriteLNWindow from '../../components/FavouriteLNWindow';
import ListWindow from '../../components/ListWindow';
import NoteWindow from '../../components/NoteWindow';
import SearchBar from '../../components/SearchBar';
import listsData from '../../data/lists.json'
import {deleted} from "../../service/apiClient"

const NotesListsPage = () => {

    const [allLists, setAllLists] = useState([])
    const [triggerReload, setTriggerReload] = useState(false)

    useEffect(() => {
        const fetchList = async () => {
            try {
              const response = await fetch('http://localhost:3001/lists');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const listData = await response.json();
              setAllLists(listData || {});
            } catch (error) {
              console.error(error);
            }
          };
          fetchList();
          setTriggerReload(false)
    }, [triggerReload])

    const [selectedTab, setSelectedTab] = useState(0)
    // const lists = listsData.lists

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const handleDeleteList = (listId) => {
        setTimeout(() => {
          setAllLists((prevLists) => prevLists.filter((list) => list.listId !== listId));
        }, 0);
      };
      

    const getTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <ListWindow
                    allLists={allLists}
                    setAllLists={setAllLists}
                    setTriggerReload={setTriggerReload}
                    handleDeleteList={handleDeleteList}
                    />;
            case 1:
                return <NoteWindow />;
            case 2:
                return <FavouriteLNWindow />;
            default:
                return null;
        }
    }


      

    return (
        <Box className={`mainwindow`}>
            <Box className="tabbar">
                {/* <button onClick={testFunction}>TEST</button> */}
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Lists" />
                    <Tab label="Notes" />
                    <Tab label="Favourites" />
                </Tabs>
                <SearchBar />
            </Box>
            <Container sx={{ marginTop: "24px" }}>
                {getTabContent()}
            </Container>
        </Box>
    )
}

export default NotesListsPage