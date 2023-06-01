import { Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotesIcon from '@mui/icons-material/Notes';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const icons ={
    "Services": LocationOnIcon,
    "Lists & Notes": NotesIcon,
    "Settings": SettingsIcon,
    "Log Out": LogoutIcon
}

const NavMenuButton = ({text, ...props}) => {
    const Icon = icons[text] || null

    return (
        <>
            <Button
                {...props}
                variant="text"
                color="inherit"
                startIcon={Icon && <Icon />}
                sx={{
                    "paddingLeft": "2rem",
                    "justifyContent": "start",
                    height: "36px",
                }}
            >
                {text}
            </Button>
        </>
    )
}

export default NavMenuButton