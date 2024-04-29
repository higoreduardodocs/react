import { ChartsHeader } from '../../widgets'
import { Stacked as StackedChart } from '../../components'

import {
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
  stackedCustomSeries,
} from '../../utils/ecommerce-data'

function Stacked() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader category="Stacked" title="Revenue Breakdown" />

      <div className="flex justify-center items-center w-full">
        <StackedChart
          stackedPrimaryXAxis={stackedPrimaryXAxis}
          stackedPrimaryYAxis={stackedPrimaryYAxis}
          stackedCustomSeries={stackedCustomSeries}
          width="250px"
          height="360px"
        />
      </div>
    </section>
  )
}

export default Stacked
