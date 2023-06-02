import * as React from 'react';
import Grid from '@mui/material/Grid';
import ForecastCard from '../ForecastCard';

const Forecast = ({ forecastData }) => {
  const { forecastday } = forecastData.forecast;

  return (
    <Grid container spacing={2}>
      {forecastday.map((forecast, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ForecastCard forecast={forecast} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;
