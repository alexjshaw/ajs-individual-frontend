// import logo from './logo.svg';
// import { Routes, Route } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import MainWindow from './components/MainWindow';
import { ProtectedRoute } from './context/auth';
import NotesListsPage from './pages/NotesListsPage';
import ServicesPage from './pages/ServicesPage'
import SettingsPage from './pages/SettingsPage'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
    <Routes>
      <Route 
        path="/"
        element={
          <Navigate to="/login" />
        }
      />
      <Route 
        path="login"
        element={
          <Login />
        }
      />
      <Route 
        path="register"
        element={
          <Register />
        }
      />
      <Route 
        path="services"
        element={
          <ProtectedRoute>
            <ServicesPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="lists"
        element={
          <ProtectedRoute>
            <NotesListsPage />
          </ProtectedRoute>
        }
      />
      {/* <Route 
        path="notes"
        element={
          <ProtectedRoute>
            <NotesListsPage />
          </ProtectedRoute>
        }
      /> */}
      <Route 
        path="settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;