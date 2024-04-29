import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from '@syncfusion/ej2-react-charts'

import {
  barPrimaryXAxis,
  barPrimaryYAxis,
  barCustomSeries,
} from '../../utils/bar-data'
import { ChartsHeader } from '../../widgets'

function Bar() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />

      <div className="flex justify-center items-center w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          // background={theme === "dark" ? "#33373E" : "#fff"}
          legendSettings={{ background: 'white' }}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
          />
          <SeriesCollectionDirective>
            {barCustomSeries?.length > 0 &&
              barCustomSeries.map((item, index) => (
                <SeriesDirective key={index} {...item} />
              ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </section>
  )
}

export default Bar
