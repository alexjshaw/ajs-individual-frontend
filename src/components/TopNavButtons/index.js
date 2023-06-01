import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './style.css'
import { IconButton } from '@mui/material';
import {Avatar} from '@mui/material';

const TopNavButtons = () => {
    return (
        <div className='topnavbuttons'>
            <IconButton
            className="navbutton"
            aria-label="notifications"
            size="large">
                <NotificationsNoneIcon sx={{fontSize:40}} />
            </IconButton>
            <IconButton
            className="navbutton"
            aria-label="help"
            size="large">
                <HelpOutlineIcon sx={{fontSize:40}} className="navicon" />
            </IconButton>
            <Avatar
            alt="User Name"
            src= "/images/Bill_Bassett.jpg"
            sx={{width: 50, height: 50}}
            />
        </div>
    )
}

export default TopNavButtons