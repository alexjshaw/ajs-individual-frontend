import { MenuItem } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotesIcon from '@mui/icons-material/Notes';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Typography} from "@mui/material";
import { useLocation, Link as RouterLink } from 'react-router-dom';

const icons ={
    "Services": LocationOnIcon,
    "Lists & Notes": NotesIcon,
    "Settings": SettingsIcon,
    "Log Out": LogoutIcon
}

const NavMenuItem = ({text, to, ...props}) => {
    const Icon = icons[text] || null
    const location = useLocation();
    const selected = location.pathname === to;

    return (
        <>
            <MenuItem
                component={RouterLink}
                to={to}
                selected={selected}
                {...props}
                sx={{
                    ...(selected && {color:"#1976d2"})
                }}>
                    <ListItemIcon>
                        {Icon && <Icon />}
                    </ListItemIcon>
                    <Typography variant="inherit">{text}</Typography>
            </MenuItem>
        </>
    )
}

export default NavMenuItem