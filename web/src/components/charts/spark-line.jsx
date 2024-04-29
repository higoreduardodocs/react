import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
} from '@syncfusion/ej2-react-charts'

import { useStateContext } from '../../contexts/context'

// eslint-disable-next-line react/prop-types
function SparkLine({ id, height, width, customColor, data, type }) {
  const { color } = useStateContext()

  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill={customColor ?? color}
      border={{ color: color, width: 2 }}
      tooltipSettings={{
        visible: true,
        // eslint-disable-next-line no-template-curly-in-string
        format: '${x} : data ${yval}',
        trackLineSettings: {
          visible: true,
        },
      }}
      markerSettings={{ visible: ['All'], size: 2.5, fill: color }}
      dataSource={data}
      xName="x"
      yName="yval"
      type={type}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  )
}

export default SparkLine
