import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#2196f3',
});

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Metrics Dashboard
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
