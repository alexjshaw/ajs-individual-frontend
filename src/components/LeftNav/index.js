import './style.css'
import NavMenuButton from '../NavMenuButton'
import { Box } from '@mui/material'
import MenuList from '@mui/material/MenuList';
import NavMenuItem from '../NavMenuItem';

const LeftNav = () => {
    return (
        <Box className="leftnav">
            <NavMenuItem text="Services" to="/services" />
            <NavMenuItem text="Lists & Notes" to="/lists" />
            <NavMenuItem text="Settings" to="/settings" />
            <NavMenuButton text="Log Out" className="logoutbutton" />
        </Box>
    )
}

export default LeftNav