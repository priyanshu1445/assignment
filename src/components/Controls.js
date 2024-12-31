import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ControlContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  padding: '20px',
  justifyContent: 'center',
});

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
});

const Controls = ({ metric, device, onMetricChange, onDeviceChange }) => {
  return (
    <ControlContainer>
      <StyledFormControl>
        <InputLabel>Metric</InputLabel>
        <Select
          value={metric}
          label="Metric"
          onChange={onMetricChange}
        >
          <MenuItem value="lcp">LCP</MenuItem>
          <MenuItem value="cls">CLS</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <InputLabel>Device</InputLabel>
        <Select
          value={device}
          label="Device"
          onChange={onDeviceChange}
        >
          <MenuItem value="mobile">Mobile</MenuItem>
          <MenuItem value="desktop">Desktop</MenuItem>
        </Select>
      </StyledFormControl>
    </ControlContainer>
  );
};

export default Controls;
