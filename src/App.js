import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, CircularProgress, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Controls from './components/Controls';
import Graph from './components/Graph';

function App() {
  const [metric, setMetric] = useState('lcp');
  const [device, setDevice] = useState('mobile');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://example-metrics.speedvitals.workers.dev/?metric=${metric}&device=${device}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log('Raw API Response:', result);

        if (result && result.timeseries && result.values) {
          const dataPoints = result.timeseries.map((time, index) => ({
            x: time,
            y: result.values[index]
          }));

          setData({
            data: dataPoints,
            metric: metric,
            device: device
          });
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [metric, device]);

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <Controls
          metric={metric}
          device={device}
          onMetricChange={handleMetricChange}
          onDeviceChange={handleDeviceChange}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box color="error.main" textAlign="center" p={4}>
            {error}
          </Box>
        ) : (
          <Graph data={data} />
        )}
      </Container>
    </>
  );
}

export default App;
