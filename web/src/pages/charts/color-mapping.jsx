import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  RangeColorSettingsDirective,
  RangeColorSettingDirective,
} from '@syncfusion/ej2-react-charts'

import {
  ColorMappingPrimaryXAxis,
  ColorMappingPrimaryYAxis,
  colorMappingData,
  rangeColorMapping,
} from '../../utils/color-mapping-data'
import { ChartsHeader } from '../../widgets'

function ColorMapping() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <ChartsHeader
        category="Color Mapping"
        title="USA CLIMATE - WEATHER BY MONTH"
      />

      <div className="flex justify-center items-center w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={ColorMappingPrimaryXAxis}
          primaryYAxis={ColorMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: 'Range', background: 'white' }}
          tooltip={{ enable: true }}
          // background={theme === "dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={colorMappingData[0]}
              name="USA"
              xName="x"
              yName="y"
              type="Column"
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {rangeColorMapping?.length > 0 &&
              rangeColorMapping.map((item, index) => (
                <RangeColorSettingDirective key={index} {...item} />
              ))}
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </section>
  )
}

export default ColorMapping
