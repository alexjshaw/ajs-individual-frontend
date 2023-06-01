import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import SettingsUser from '../../components/SettingsUser'
import SettingsTutorial from '../../components/SettingsTutorial'

const SettingsPage = () => {

    const [selectedTab, setSelectedTab] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const getTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <SettingsUser />;
            case 1:
                return <SettingsTutorial />;
            default:
                return null;
        }
    }

    return (
        <Box className="mainwindow">
            <Box className="tabbar">
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="User Profile" />
                    <Tab label="Tutorials" />
                </Tabs>
            </Box>
            <Container>
                {getTabContent()}
            </Container>
        </Box>
    )
}

export default SettingsPage