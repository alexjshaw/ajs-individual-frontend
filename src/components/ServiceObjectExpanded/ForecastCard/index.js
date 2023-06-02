import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const ForecastCard = ({ forecast }) => {
  const { date, day: { maxtemp_c, mintemp_c, avgtemp_c, maxwind_mph, daily_chance_of_rain }} = forecast;

  return (
    <Box m={1}>
      <Card sx={{width:250}}>
        <CardContent>
          <Typography variant="h6" component="div">
            {date}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Max Temp: {maxtemp_c}°C
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Min Temp: {mintemp_c}°C
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Avg Temp: {avgtemp_c}°C
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Max Wind Speed: {maxwind_mph} mph
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chance of Rain: {daily_chance_of_rain}%
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForecastCard;
