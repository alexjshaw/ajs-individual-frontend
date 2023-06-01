import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import FavouriteLNWindow from '../../components/FavouriteLNWindow';
import ListWindow from '../../components/ListWindow';
import NoteWindow from '../../components/NoteWindow';
import SearchBar from '../../components/SearchBar';
import listsData from '../../data/lists.json'

const NotesListsPage = () => {

    const [selectedTab, setSelectedTab] = useState(0)
    const lists = listsData.lists

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const getTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <ListWindow
                    lists={lists}
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