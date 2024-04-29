import { ChartsHeader } from '../../widgets'
import { Pie as PieChart } from '../../components'

import { pieChartData } from '../../utils/pie-data'

function Pie() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader category="Pie" title="Project Cost Breakdown" />

      <div className="flex justify-center items-center w-full">
        <PieChart
          id="chart-pie"
          data={pieChartData}
          legendVisiblity
          height="full"
        />
      </div>
    </section>
  )
}

export default Pie
