import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CurrentWeatherCard = ({ currentWeather }) => {
  const { temp_c, wind_mph, humidity, feelslike_c, gust_mph } = currentWeather.current;
    console.log(currentWeather.current)

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Current Weather
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Temperature: {temp_c}°C
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Feels like: {feelslike_c}°C
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Wind speed: {wind_mph} mph
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Wind gusts: {gust_mph} mph
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Humidity: {humidity}%
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;