import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import ActiveServiceWindow from '../../components/ActiveServicesWindow'
import AllServicesWindow from '../../components/AllServicesWindow'
import FavouriteServicesWindow from '../../components/FavouriteServicesWindow'
import SearchBar from '../../components/SearchBar';
import servicesData from '../../data/services.json'

const ServicesPage = () => {

    const [selectedTab, setSelectedTab] = useState(0)
    const services = servicesData.services

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const getTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <ActiveServiceWindow
                services={services}
                />;
            case 1:
                return <AllServicesWindow />;
            case 2:
                return <FavouriteServicesWindow />;
            default:
                return null;
        }
    }

    return (
        <Box className="mainwindow">
            <Box className="tabbar">
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Active Services" />
                    <Tab label="All Services" />
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

export default ServicesPage