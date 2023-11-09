import './style.css'
import { Button, Typography } from '@mui/material'
import { SpaceDashboard } from '@mui/icons-material'
import TopNavButtons from '../TopNavButtons'
import { useNavigate } from 'react-router'
import { useLocation, Link as RouterLink } from 'react-router-dom';

const TopNav = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const pageTitles = {
        "/": "Telegram Connect",
        "/services": "Services",
        "/lists": "Lists & Notes",
        "/settings": "Settings"
    }

    const pageTitle = pageTitles[location.pathname] || ""

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className="topnav">
            <Button
                className="homebutton"
                variant="text"
                color="inherit"
                startIcon={<SpaceDashboard />}
                sx={{
                    "paddingLeft": "2rem"
                }}
                onClick={handleClick}
            >
                PDA MK2
            </Button>
            <Typography 
                className="pagetitle"
                variant="h4"
                sx={{
                    color:`rgba(0,0,0,0.5)`
                }}
            >
                {pageTitle}
            </Typography>
            <TopNavButtons />
        </div>
    )
}

export default TopNav