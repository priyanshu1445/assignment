import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GraphContainer = styled(Box)({
  padding: '20px',
  height: '400px',
});

const Graph = ({ data }) => {
  useEffect(() => {
    console.log('Graph Data:', data);
  }, [data]);

  const chartData = data?.data || [];

  const option = {
    title: {
      text: data?.metric?.toUpperCase() || '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const dataPoint = params[0];
        return `Time: ${dataPoint.name}<br/>
                Value: ${dataPoint.value}`;
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.x) || [],
      name: 'Time',
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: {
        rotate: 0,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: 'Value',
      nameLocation: 'middle',
      nameGap: 50,
      scale: true
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    series: [
      {
        data: chartData.map(item => item.y) || [],
        type: 'line',
        smooth: true,
        name: data?.metric?.toUpperCase() || 'Value',
        symbolSize: 8,
        lineStyle: {
          width: 3
        },
        areaStyle: {
          opacity: 0.2
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Maximum' },
            { type: 'min', name: 'Minimum' }
          ]
        }
      }
    ]
  };

  return (
    <GraphContainer>
      <ReactECharts 
        option={option} 
        style={{ height: '100%' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </GraphContainer>
  );
};

export default Graph;
