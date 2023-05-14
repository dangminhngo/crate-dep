export interface EditorConfig {
  autocomplete: boolean
  highlightActiveLine: boolean
  lineNumbers: boolean
  lineWrapping: boolean
  tabSize: number
}

export type ArrayElementType<T> = T extends (infer Item)[] ? Item : T
