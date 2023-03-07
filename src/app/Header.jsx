import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import Logo from './astrospect-logo.png';

export default function Header() {
  return (
    // possibly pass in the system light/dark mode preferences into the props?

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#152642' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              gap: '8px',
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            AstroSpect
            <img
              width="28px"
              src={Logo}
              alt="AstroSpect logo"
            />
          </Typography>

          {/* media query that gets rid of the 'GitHub' and 'Site' text? */}
          <div className='header-element-wrapper'>
            <div className='header-element'>
              <GitHubIcon />
              <Typography
                variant="p"
                component="div"
                sx={{ flexGrow: 1, fontFamily: 'sans-serif' }}
              >
                GitHub
              </Typography>
            </div>

            <div className='header-element'>
              <WebIcon />
              <Typography
                variant="p"
                component="div"
                sx={{ flexGrow: 1, fontFamily: 'sans-serif' }}
              >
                Website
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
