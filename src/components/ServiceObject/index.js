// Weather API Key  387f4b16451449a7917212913233105
// Required Field   City
// URL http://api.weatherapi.com/v1/forecast.json?key= 387f4b16451449a7917212913233105&q=Bristol&days=1&aqi=no&alerts=no

import './style.css'
import { Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ServiceObjectExpanded from '../ServiceObjectExpanded';

const ServiceObject = ({serviceItem}) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const serviceTitle = serviceItem.name
    const serviceDescription = serviceItem.description
    const serviceBullets = serviceItem.notes

    return (
        <>
        <Box className="servicecontainer">
            <Box className="servicetitlebar">
                <IconButton aria-label="Add Service to Favourites">
                    <FavoriteBorderIcon />
                </IconButton>
                <Typography variant="h6">
                {serviceTitle}
                </Typography>
                <IconButton aria-label="Edit Service">
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            <Box className="servicecontent">
                <Box className="servicedescription">
                    <Typography variant="body1" align="center" sx={{fontWeight: 'bold'}}>
                    {serviceDescription}
                    </Typography>
                </Box>
                <List>
                    {serviceBullets.map(feature => 
                        <ListItem key={feature.id} disablePadding>
                            <ListItemIcon sx={{minWidth: "25px"}}>
                                <CircleIcon fontSize="12px" />
                            </ListItemIcon>
                            <ListItemText primary={feature.text} />
                        </ListItem>
                    )}
                </List>
            </Box>
            <Box className="serviceobjectbuttons" align="center">
                <Button onClick={handleOpen}>Open Service</Button>
            </Box>
        </Box>
        <ServiceObjectExpanded isOpen={isOpen} handleClose={handleClose} serviceItem={serviceItem} />
        </>
    )
}


// const ServiceObject = () => {

//     const apiToken = "387f4b16451449a7917212913233105"

//     const [currentWeather, setCurrentWeather] = useState(null)
//     const [searchTerm, setSearchTerm] = useState("")

//     const handleChange = (e) => {
//         setSearchTerm(e.target.value)
//     }

//     const handleSubmit = () => {
//         console.log("handleSubmit")
//         console.log(searchTerm)
//         fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiToken}&q=${searchTerm}&days=1&aqi=no&alerts=no`)
//         .then(response => {
//             if (!response.ok) { 
//               throw new Error('Network response was not ok'); 
//             }
//             return response.json();
//           })
//           .then(data => setCurrentWeather(data))
//           .catch(error => console.error('Error:', error));
//     }

//     const testFunction = () => {
//         console.log(currentWeather)
//     }

//     return (
//         <Box
//             component="form"
//             noValidate
//             autoComplete="off"
//         >
//             <span onClick={testFunction}>Which City would you like the weather for?</span>
//             <TextField
//                 onChange={handleChange}
//                 required
//                 />
//             <Button onClick={handleSubmit}>Submit</Button>
//         </Box>
//     )
// }

export default ServiceObject