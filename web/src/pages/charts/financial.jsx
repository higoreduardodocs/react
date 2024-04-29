import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  HiloSeries,
  Tooltip,
  DateTime,
  Zoom,
  Logarithmic,
  Crosshair,
} from '@syncfusion/ej2-react-charts'

import {
  FinancialPrimaryXAxis,
  FinancialPrimaryYAxis,
  financialChartData,
} from '../../utils/financial-data'
import { ChartsHeader } from '../../widgets'

function Financial() {
  const returnValue = financialChartData.filter((filterValue) => filterValue)

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader category="Financial" title="AAPLE Historical" />

      <div className="flex justify-center items-center w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }}
          // background={theme === "dark" ? "#33373E" : "#fff"}
        >
          <Inject
            services={[
              HiloSeries,
              Tooltip,
              DateTime,
              Logarithmic,
              Crosshair,
              Zoom,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              yName="low"
              name="Apple Inc"
              type="Hilo"
              low="low"
              high="high"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </section>
  )
}

export default Financial
