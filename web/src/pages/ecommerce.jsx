import { BsCurrencyDollar } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { IoIosMore } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

import {
  earningData,
  SparklineAreaData,
  stackedPrimaryXAxis,
  stackedPrimaryYAxis,
  stackedCustomSeries,
  PieChartData,
  dropdownData,
  recentTransactions,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
  lineCustomSeries,
  weeklyStats,
  medicalproBranding,
} from '../utils/ecommerce-data'
import { useStateContext } from '../contexts/context'
import { Header } from '../widgets'
import { Button, SparkLine, Stacked, Pie, LineChart } from '../components'

import product9 from '/assets/product9.jpg'

// eslint-disable-next-line react/prop-types
const DropDown = ({ theme }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: theme === 'dark' && 'white' }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
)

function Ecommerce() {
  const { theme, color } = useStateContext()

  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray">
      <Header category="Dashboard" title="Ecommerce" />

      {/* OVERVIEW */}
      <div className="h-44 w-full dark:bg-light-gray bg-gray-200 p-10 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="font-bold text-gray-400">Earnings</p>
            <p className="text-2xl">$63,448.78</p>
          </div>
          <button
            type="button"
            style={{ backgroundColor: color }}
            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
          >
            <BsCurrencyDollar />
          </button>
        </div>

        <Button content="Download" />
      </div>

      {/* BOXES */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        {earningData?.length > 0 &&
          earningData.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-4 flex-1 dark:bg-light-gray bg-gray-200 p-4"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {<item.icon />}
              </button>

              <p className="mt-3">
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
            </div>
          ))}
      </div>

      {/* CHARTS */}
      <div className="flex flex-wrap justify-between gap-4 w-full mb-4">
        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <p className="font-semibold text-xl">Revenue Updates</p>

          <div className="flex justify-between flex-wrap gap-4 my-10">
            <div className="flex-1 text-center">
              <span className="text-3xl font-semibold">$93,438</span>
              <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                23%
              </span>
              <p className="text-gray-500 mt-1">Budget</p>
            </div>

            <div className="flex-1 text-center">
              <p className="text-3xl font-semibold">$48,487</p>
              <p className="text-gray-500 mt-1">Expense</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <SparkLine
              id="line-sparkLine"
              type="Line"
              height="80px"
              width="250px"
              data={SparklineAreaData}
            />

            <Stacked
              stackedPrimaryXAxis={stackedPrimaryXAxis}
              stackedPrimaryYAxis={stackedPrimaryYAxis}
              stackedCustomSeries={stackedCustomSeries}
              width="250px"
              height="360px"
            />
          </div>
        </div>

        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
              <span>
                <GoDotFill />
              </span>
              <span>Expense</span>
            </p>

            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
              <span>
                <GoDotFill />
              </span>
              <span>Budget</span>
            </p>
          </div>

          <div className="flex justify-between flex-wrap gap-4 my-10">
            <div className="flex-1">
              <p className="font-semibold text-2xl">Earnings</p>
              <p className="text-2xl font-semibold mt-8">$63,448.78</p>
              <p className="text-gray-600">Monthly revenue</p>
            </div>

            <div className="flex-1">
              <SparkLine
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                customColor="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-5 flex flex-wrap justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={PieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex flex-wrap justify-between gap-4 w-full mb-4">
        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <DropDown theme={theme} />
          </div>

          <div className="my-10">
            {recentTransactions?.length > 0 &&
              recentTransactions.map((item, i) => (
                <div key={i} className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl p-4 hover:drop-shadow-xl"
                    >
                      {<item.icon />}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
          </div>

          <div className="flex justify-between items-center border-t-1 pt-4 border-color">
            <Button content="Add" />
            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>

        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown theme={theme} />
          </div>

          <div className="md:w-full overflow-auto">
            <LineChart
              LinePrimaryXAxis={LinePrimaryXAxis}
              LinePrimaryYAxis={LinePrimaryYAxis}
              lineCustomSeries={lineCustomSeries}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4 w-full mb-4">
        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weekly Stats</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>

          <div className="my-10">
            {weeklyStats?.length > 0 &&
              weeklyStats.map((item, i) => (
                <div key={i} className="flex justify-between mt-4 w-full">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{ background: item.iconBg }}
                      className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                    >
                      {<item.icon />}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>

                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
          </div>

          <SparkLine
            id="area-sparkLine"
            height="160px"
            type="Area"
            data={SparklineAreaData}
            width="320"
            color="rgb(242, 252, 253)"
          />
        </div>

        <div className="dark:bg-light-gray bg-gray-200 flex-1 p-4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">MedicalPro Branding</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-400"
            >
              <IoIosMore />
            </button>
          </div>

          <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
            16 APR, 2021
          </p>

          <div className="flex gap-4 border-b-1 border-color my-6">
            {medicalproBranding?.data.map((item, i) => (
              <div key={i} className="border-r-1 border-color pr-4 pb-2">
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Teams</p>

            <div className="flex gap-4">
              {medicalproBranding?.teams.map((item) => (
                <p
                  key={item.name}
                  style={{ background: item.color }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-md font-semibold mb-2">Leaders</p>
            <div className="flex gap-4">
              {medicalproBranding?.leaders.map((item, index) => (
                <img
                  key={index}
                  className="rounded-full w-8 h-8"
                  src={item.image}
                  alt="Leader"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t-1 pt-4 border-color">
            <Button content="Add" />
            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-light-gray bg-gray-200 p-4">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Daily Activities</p>
          <button type="button" className="text-xl font-semibold text-gray-500">
            <IoIosMore />
          </button>
        </div>

        <div className="mt-10">
          <img className="md:w-96 h-50" src={product9} alt="" />
          <div className="mt-8">
            <p className="font-semibold text-lg">React 18 coming soon!</p>
            <p className="text-gray-400 ">By Johnathan Doe</p>
            <p className="mt-8 text-sm text-gray-400">
              This will be the small description for the news you have shown
              here. There could be some great info.
            </p>
            <div className="mt-3">
              <Button content="Read More" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ecommerce
