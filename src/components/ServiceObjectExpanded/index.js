import './style.css'
import React from "react";
import { Dialog, Box, MenuItem } from "@mui/material";
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CurrentWeatherCard from './CurrentWeatherCard';
import Forecast from './Forecast';

const ServiceObjectExpanded = ({isOpen, handleClose, serviceItem}) => {

    const serviceTitle = serviceItem.name
    const serviceFeatures = serviceItem.features
    const [activeFeature, setActiveFeature] = useState("")
    const [parameters, setParameters] = useState([])
    const [searchParams, setSearchParams] = useState({})
    const [currentWeather, setCurrentWeather] = useState({})
    const [weatherForecast, setWeatherForecast] = useState({})
    const [showCurrent, setShowCurrent] = useState(false)
    const [showForecast, setShowForecast] = useState(false)

// WEATHER API SETTINGS

    const weatherToken = "387f4b16451449a7917212913233105"
    const currentWeatherURL=`http://api.weatherapi.com/v1/current.json?key=${weatherToken}&q=${searchParams[1]}&aqi=no`
    const weatherForecastURL=`http://api.weatherapi.com/v1/forecast.json?key=${weatherToken}&q=${searchParams[1]}&days=${searchParams[2]}&aqi=no&alerts=no`

      useEffect(() => {
        const selectedFeature = serviceFeatures.find(feature => feature.name === activeFeature)
        if (selectedFeature) {
          setParameters(selectedFeature.searchParameters)
        }
      }, [activeFeature, serviceFeatures])

    useEffect(() => {
    if (isOpen) {
        setActiveFeature(serviceFeatures[0].name)
        setSearchParams({})
        setShowCurrent(false)
        setShowForecast(false)
    }
    }, [isOpen, serviceFeatures])

    const featureSelect = (e) => {
        setActiveFeature(e.target.value)
    }

    const saveSearchParams = (param) => (event) => {
        setSearchParams(prevState => ({
            ...prevState,
            [param.id]: event.target.value,
        }));
    }

    const fetchCurrentWeather = () => {
        const fetchData = async () => {
            try {
              const response = await fetch(currentWeatherURL);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              await setCurrentWeather(data); // Update the state with the fetched data
            } catch (error) {
              console.error('Error:', error);
            }
          };
          fetchData().then(() => {
            setShowCurrent(true)
            setShowForecast(false)
          })
          
    }

    const fetchWeatherForecast = () => {
        const fetchData = async () => {
            try {
              const response = await fetch(weatherForecastURL);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setWeatherForecast(data); // Update the state with the fetched data
            } catch (error) {
              console.error('Error:', error);
            }
          };
          fetchData().then(() => {
            setShowCurrent(false)
            setShowForecast(true)
          })
    }

    const serviceSearch = () => {
        console.log(searchParams)
        console.log(searchParams[1])
        console.log(searchParams[2])
        if (activeFeature === "Current Weather") {
            fetchCurrentWeather()
        } else {
            fetchWeatherForecast()
        }
    }

    const testFunction = () => {
        console.log("weatherForecastURL", weatherForecastURL)
        console.log("currentWeatherURL", currentWeatherURL)
        console.log("currentWeather", currentWeather)
        console.log("weatherForecast", weatherForecast)
    }

    return (
        <>
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md"
        sx={{
            "& .MuiPaper-root": {
              borderRadius: "10px",
              "maxWidth": "100%",
              backgroundColor: 'transparent'
                },
                backdropFilter: "blur(5px)"
            }}
        >
            <Box className="servicecontainerexpanded">
                <Box className="servicetitlebar">
                    <IconButton aria-label="Add Favourite Service">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <Typography variant="h6">
                    {serviceTitle}
                    </Typography>
                    <IconButton aria-label="Edit Service" onClick={testFunction}>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
                <Box className="serviceinteractioncontainer">
                <Box className="servicefeatureselect"
                    display="flex"
                    justifyContent="center"
                >
                    <Box
                        className="featureselectlist"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                          }}
                          noValidate
                          autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="select-service-feature"
                                select
                                size="small"
                                defaultValue={serviceFeatures[0].name}
                                helperText="What would you like to check?"
                                onChange={featureSelect}
                            >
                                {serviceFeatures.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                
                </Box>
                <Box className="searchparameters">
                    <Typography variant='body1' sx={{textAlign: "center", pb:"10px"}}>
                        Required Information
                    </Typography>
                    <Box
                        sx={{
                            display:"flex",
                            flexWrap:"wrap",
                            justifyContent:"center"
                        }}>
                    {parameters.map((param, index) => (
                        <TextField
                        variant="outlined"
                        key={param.id}
                        helperText={param.parameter}
                        size="small"
                        placeholder={param.parameter}
                        required
                        sx={{width: 200, px: "10px"}}
                        onChange={saveSearchParams(param)}
                        />
                    ))}
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"center"}}>
                        <Button onClick={serviceSearch}>
                            Search
                        </Button>
                    </Box>
                </Box>
                    {showCurrent && <CurrentWeatherCard currentWeather={currentWeather} />}
                    {showForecast && <Forecast forecastData={weatherForecast} />}
                </Box>
            </Box>
        </Dialog>
        </>
    )
}

export default ServiceObjectExpanded