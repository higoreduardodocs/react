/* eslint-disable react/prop-types */

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from '@syncfusion/ej2-react-charts'

function Stacked({
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
  stackedCustomSeries,
  width,
  height,
}) {
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      // background={theme === "dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries?.length > 0 &&
          stackedCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked
