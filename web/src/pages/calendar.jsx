/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

import { scheduleData } from '../utils/calendar-data'
import { Header } from '../widgets'

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>

function Calendar() {
  const [scheduleObj, setScheduleObj] = useState()

  const onDragStart = (arg) => {
    arg.navigation.enable = true
  }
  const change = (args) => {
    scheduleObj.selectedDate = args.value
    scheduleObj.dataBind()
  }

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Apps" title="Calendar" />

      <div className="flex justify-center items-center">
        <ScheduleComponent
          height="650px"
          ref={(schedule) => setScheduleObj(schedule)}
          selectedDate={new Date(2021, 0, 10)}
          eventSettings={{ dataSource: scheduleData }}
          dragStart={onDragStart}
        >
          <ViewsDirective>
            {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
              <ViewDirective key={item} option={item} />
            ))}
          </ViewsDirective>
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>

        <PropertyPane>
          <table style={{ width: '100%', background: 'white' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <DatePickerComponent
                    value={new Date(2021, 0, 10)}
                    showClearButton={false}
                    placeholder="Current Date"
                    floatLabelType="Always"
                    change={change}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
    </section>
  )
}

export default Calendar
