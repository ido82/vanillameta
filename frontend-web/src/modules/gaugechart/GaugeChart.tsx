import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { getAggregationData } from '@/modules/utils/chartUtil';

const GaugeChart = props => {
  const { option, dataSet } = props;

  const [componentOption, setComponentOption] = useState({});

  const defaultComponentOption = {
    series: [],
  };

  useEffect(() => {
    if (option && dataSet) {
      const newOption = createComponentOption();
      setComponentOption(newOption);
    }
  }, [option, dataSet]);

  /**
   *
   * 위젯옵션과 데이터로
   * 컴포넌트에 맞는 형태로 생성
   */
  const createComponentOption = () => {
    let newOption = {};

    if (option.field) {
      const op = {
        tooltip: {
          formatter: `{a} <br/>{b} : {c}${option.suffix ?? ''}`,
        },
        series: [
          {
            name: option.title,
            type: 'gauge',
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: 'true',
              formatter: '{value}',
            },
            data: [
              {
                value: getAggregationData(option.aggregation, dataSet, option.field),
                name: option.field,
              },
            ],
            itemStyle: {
              color: option.color,
            },
          },
        ],
      };

      newOption = { ...defaultComponentOption, ...op };
    }

    console.log(newOption);
    return newOption;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <ReactECharts option={componentOption} style={{ height: '100%', width: '100%' }} lazyUpdate={true} notMerge={true} />
    </Box>
  );
};

export default GaugeChart;
