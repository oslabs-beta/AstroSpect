import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import Logo from '../../extension/assets/astrospect-logo.png';

const Header: React.FC = (): JSX.Element => {
  return (
    // possibly pass in the system light/dark mode preferences into the props?

    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#202427', fontFamily: 'Figtree sans-serif' }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            className='astrospect-wrapper'
            sx={{ fontFamily: 'Figtree' }}
          >
            <div className='astrospect-text'>AstroSpect</div>
            <img width='28px' src={Logo} alt='AstroSpect logo' />
          </Typography>

          {/* media query that gets rid of the 'GitHub' and 'Site' text? */}
          <div className='header-element-wrapper'>
            <div className='header-element'>
              <a
                href='https://github.com/oslabs-beta/AstroSpect/tree/main'
                target='_blank'
              >
                <GitHubIcon />
              </a>

              <a
                href='https://github.com/oslabs-beta/AstroSpect/tree/main'
                target='_blank'
              >
                <Typography
                  variant='body1'
                  component='div'
                  sx={{ flexGrow: 1, fontFamily: 'Figtree' }}
                >
                  GitHub
                </Typography>
              </a>
            </div>

            <div className='header-element'>
              <a href='https://astrospect.dev' target='_blank'>
                <WebIcon />
              </a>

              <a href='https://astrospect.dev' target='_blank'>
                <Typography
                  variant='body1'
                  component='div'
                  sx={{ flexGrow: 1, fontFamily: 'Figtree' }}
                >
                  Website
                </Typography>
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
