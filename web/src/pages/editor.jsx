import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor'

import { EditorData } from '../utils/editor-data'
import { Header } from '../widgets'

function Editor() {
  return (
    <section className="m-2 mt-10 p-4 dark:bg-secondary-dark-bg bg-light-gray dark:text-white">
      <Header category="Apps" title="Editor" />

      <div className="flex justify-center items-center">
        <RichTextEditorComponent>
          <EditorData />
          <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        </RichTextEditorComponent>
      </div>
    </section>
  )
}

export default Editor
