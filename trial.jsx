import JSONEditor, { JSONEditorOptions, ValidationError } from "jsoneditor"
import { useEffect, useRef } from "react"
import formSchema from '@/data/schema/Forms/ServiceConnectionForm/form2.test.json'
import { AJV19 } from "@/utils/validateFormJSON"
import { error } from "console"
import { classNames } from "primereact/utils"

interface JsonComponentProps {
  FormJSON: any
  onChangeJson: (json: any) => void
  setValidJson: (valid: boolean) => void
  setCursor: (cursor: number) => void
  cn?: string
}

const EditorJSON = ({ FormJSON, onChangeJson, setValidJson, setCursor, cn = "" }: JsonComponentProps) => {
  const editor = useRef<JSONEditor | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('jsonEditor') !== null) {
      const options: JSONEditorOptions = {
        mode: 'code',
        onChange: async () => {
          onChangeJson(editor.current?.getText())
          // editor.current?.validate()
          // Validate the JSON on change and set the validJson state
          let errors = await editor.current?.validate()
          if (errors && errors.length > 0) {
            setValidJson(false)
          } else {
            setValidJson(true)
          }
        },
        // onValidationError: (error: any) => {
        //   console.log('onValidationError', error)
        //   if (error.length > 0) {
        //     setValidJson(false)
        //   } else {
        //     setValidJson(true)
        //   }
        // },
        onTextSelectionChange(start, end) {
          // console.log('onTextSelectionChange', start, end)
          setCursor(start.row)
        },
        schema: formSchema,
        allowSchemaSuggestions: true,
      }
      editor.current = new JSONEditor(document.getElementById('jsonEditor') as HTMLElement, options)
      editor.current.setText(FormJSON)
      return () => {
        editor.current?.destroy()
      }
    }
  }, [])


  return (
    <div id='jsonEditor' className={classNames('h-[60vh]', cn)}></div>
  )

}

export default EditorJSON