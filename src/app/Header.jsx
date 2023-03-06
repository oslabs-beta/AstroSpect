import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';

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
              src="https://lh3.googleusercontent.com/fife/AMPSemfd2MG3nLl1sn7_cU7UiAXeTrh8TJZet8Yedp-uBqMQelh2iSxr-70QFTd0jM4GMIfIcqM44gfDW9th6s-EBdS2nYVvh47MskkQRXvUra65GYbkbasPwyOs7ruNDMjg5acu9sYOXJWJqFi4WlUxnNMwqC--LFdM2KW7nQN5w7e8a9GmlWox1kYWesrqQFNMI16axjvEe5eJA77ZaRhDVPMzxQ5-35-HyXu0Qmb7O-5xlRO65kUUzJZY-RM483cCnZyfIR5C7m83RTdbK285fQLQuKEw0Gp1kpU4--2tP9-yxlul5moSpGDfrEbROldLYY9SVzFajfiBXZcXRNqr5YEE7IxvGOSWsrSEASBqqZvYAqg2h3pEGrhYO36hQxG0YniyI9lqNmF4Wv4FA4mEkCUZvzW38g-tB8Ri7lHE-cNepHmK4QfZuX01HrVLLYOHJlBfc8Nt-DyDoPVaiWvYdt-jaIY5Xy5MRabApl8Pk7zKgbk793KUIk0sxmD9yHqeEHsg6ml7X3U54v0sfPUUmyVi_oH0eqwfo_zC43BqRdQDu3uQzni2tfFkr1PFG42sdi19M9hzjAa4Zl3aYT-pjv0KVaRD-KoUjPvF6PWwFUMR2nw-bBowqpgjizsi04Z1vx3eM8rtIyZkG6uNveDo_HmAxZqAT0BS0a21KKyCxLRpX2_c6tsk0Fb5PpGWakqMSQZz10SR5EBSJcETOUmnMYNySPlsK7covgS6ZSpTI-e6Y-SC5AGKkedoPlZ3h9Qh1uRt-O01QBO567je9TRxcZVD4uefpi4Tfptf6Cu6m94n1un2dXHY9Av2IxK9NrMPNX_RHsIG5HVxzJ0bhbyU_ZUQ2WZh057B3iY7Rzq0_VNjNEQe40ABL_55fTVOvjQVonSfQSnlrr9gvpvj9GBsxjUC-2zbmmWgJ5PalJpbIHZlEZQ78j-iGmTRccXgNCRjGn9nuYaOIYBBKfJb6ibuOMzHSjKrNfFSNiOUjT3giFUxQkquNuoZ9ja_lejQ65aNA3RK8EqjD8PlM6Pzo5O2kZxOQYcxZano5-9KXYWD_z3R8bWMhX1m_NctacdU9NfP56EQRA9MKZgHmiBQ91AgGt9-dc2_GZzP95QstTiVSwRECKtC3Phb9E5g-w600JJhJCgk0mT-isk06Rho9PT8Dw0bh3xFFm0xTp8bo4TsQ4dgecqWii7hJsBPNz3enm7OT5WlGKKcWEr5VkdwR_iWTuxN-yNfXgHC7VuZcLCUWbxAavDcbqKgau0JhtHjE7ZvxeCDlIzrlEBCz6-328aPXIrPEK1GNKu2ChHsdOaHO2nl2HghL3U270wgtIh0O1uL2v-WIDaR7fy_YYxn2OeTlKs2kMMtgGhZ2rBv6bMEHI20J7ykFnuFM0Syl13-uO5r8_N6vFNvfNifYFkoiGS0jOHw8Qex2AXR7VZgzu5Ek1mxMolMHALFDhHO64wqmsUnWwnw8Vj-0yYKe2cFbsEcSCGHGP0pXhu-44c6mbLUVxVeQmrFS-EDFg=k"
              alt="AstroSpect logo"
            />
          </Typography>

          {/* media query that gets rid of the 'GitHub' and 'Site' text? */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitHubIcon />
              <Typography
                variant="p"
                component="div"
                sx={{ flexGrow: 1, fontFamily: 'sans-serif' }}
              >
                GitHub
              </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <WebIcon />
              <Typography
                variant="p"
                component="div"
                sx={{ flexGrow: 1, fontFamily: 'sans-serif' }}
              >
                Site
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
