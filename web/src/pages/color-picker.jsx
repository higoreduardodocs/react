/* eslint-disable react/prop-types */
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs'

import { Header } from '../widgets'

const change = (args) => {
  document.getElementById('preview').style.backgroundColor =
    args.currentValue.hex
}

const CustomColorPicker = ({ id, mode }) => (
  <ColorPickerComponent
    id={id}
    mode={mode}
    modeSwitcher={false}
    inline
    showButtons={false}
    change={change}
  />
)

function ColorPicker() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Apps" title="Color Picker" />

      <div className="flex justify-center items-center">
        <div className="text-center">
          <div id="preview" />
          <div className="flex justify-center items-center gap-20 flex-wrap">
            <div>
              <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
              <CustomColorPicker id="inline-palette" mode="Palette" />
            </div>
            <div>
              <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
              <CustomColorPicker id="inline-picker" mode="Picker" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ColorPicker
