import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import FavouriteLNWindow from '../../components/FavouriteLNWindow';
import ListWindow from '../../components/ListWindow';
import NoteWindow from '../../components/NoteWindow';
import SearchBar from '../../components/SearchBar';
import listsData from '../../data/lists.json'
import {deleted, get, post} from "../../service/apiClient"

const NotesListsPage = () => {

    const [allLists, setAllLists] = useState([])
    const [triggerReload, setTriggerReload] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchAllLists()
    }, [triggerReload])

    const fetchAllLists = async () => {
        try {
            const lists = await get(`lists`)
            setAllLists(lists)
        } catch (error) {
            console.error("Error fetching lists", error)
        }
    }

    const [selectedTab, setSelectedTab] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    // const handleDeleteList = async (currentList) => {
    //     try {
    //       await deleted(`lists/${currentList.listId}`, { "listId": currentList.listId });
    //       const response = await fetch('http://localhost:3001/lists');
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const listData = await response.json();
    //       setAllLists(listData || []);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
      
    const testFunction = () => {
        // fetchAllLists()
        console.log("TEST")
        console.log(allLists)
    }
      

    const getTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <ListWindow
                        allLists={allLists}
                        setAllLists={setAllLists}
                        searchTerm={searchTerm}
                        setTriggerReload={setTriggerReload}
                        fetchAllLists={fetchAllLists}
                    />;
            case 1:
                return <NoteWindow />;
            case 2:
                return <FavouriteLNWindow
                        allLists={allLists}
                        setAllLists={setAllLists}
                        searchTerm={searchTerm}
                        setTriggerReload={setTriggerReload}
                        fetchAllLists={fetchAllLists}
                    />;
            default:
                return null;
        }
    }

    return (
        <>
        {/* <div onClick={testFunction}>TEXT</div> */}
        <Box className={`mainwindow`}>
            <Box className="tabbar">
                {/* <button onClick={testFunction}>TEST</button> */}
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Lists" />
                    <Tab label="Notes" />
                    <Tab label="Favourites" />
                </Tabs>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </Box>
            <Container sx={{ marginTop: "24px" }}>
                {getTabContent()}
            </Container>
        </Box>
        </>
    )
}

export default NotesListsPage