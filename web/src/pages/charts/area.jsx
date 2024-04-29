import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  SplineAreaSeries,
  Legend,
} from '@syncfusion/ej2-react-charts'

import {
  areaPrimaryXAxis,
  areaPrimaryYAxis,
  areaCustomSeries,
} from '../../utils/area-data'
import { ChartsHeader } from '../../widgets'

function Area() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />

      <div className="flex justify-center items-center w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          // background={theme === 'dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {areaCustomSeries?.length > 0 &&
              areaCustomSeries.map((item, index) => (
                <SeriesDirective key={index} {...item} />
              ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </section>
  )
}

export default Area
