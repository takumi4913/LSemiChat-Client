import { ChangeEvent } from "react"
import styles from "./form.module.scss"

interface TextProps {
  type: "text" | "password",
  name: string,
  label: string,
  value: string,
  handleChange(evt: ChangeEvent<HTMLInputElement>): void,
}

interface TextareaProps {
  name: string,
  label: string,
  value: string,
  handleChange(evt: ChangeEvent<HTMLTextAreaElement>): void,
}

export function InputText(props: TextProps) {
  return (
    <div className="mb-10">
      <div>
        <label className={styles.inputLabel}>{ props.label }</label>
      </div>
      <input type={props.type} className={styles.inputText} name={ props.name } value={ props.value } onChange={ props.handleChange } />
    </div>
  )
}

export function InputTextarea(props: TextareaProps) {
  return (
    <div className="mb-10">
      <div>
        <label className={styles.inputLabel}>{props.label}</label>
      </div>
      <textarea className={styles.textarea} value={props.value} name={props.name} onChange={props.handleChange}>
      </textarea>
    </div>
  )
}