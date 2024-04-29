/* eslint-disable react/prop-types */

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from '@syncfusion/ej2-react-charts'

function LineChart({ LinePrimaryXAxis, LinePrimaryYAxis, lineCustomSeries }) {
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      // background={theme === 'dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {lineCustomSeries?.length > 0 &&
          lineCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default LineChart
