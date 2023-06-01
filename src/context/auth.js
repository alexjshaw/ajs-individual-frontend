import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import LeftNav from "../components/LeftNav";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ProtectedRoute = ({ children }) => {
    return (
      <div className="container">
        <Grid2 container display="flex" flexDirection="column" height="100vh">
          <Grid2 item xs={12} height={72}>
            <TopNav />
          </Grid2>
          <Grid2 container flexGrow={1} display="flex" height="calc(100vh - 72px)">
            <Grid2 item xs={2}>
                <LeftNav />
            </Grid2>
            <Grid2 item xs={10} style={{ height: '100%', overflowY: 'auto'}}>
                {children}
            </Grid2>
          </Grid2>
        </Grid2>
      </div>
    );
  };

export {ProtectedRoute}