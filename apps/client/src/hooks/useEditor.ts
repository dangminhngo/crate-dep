import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'

import {
  basicSetup,
  createEditorThemeExtension,
  getCustomExtensionsFromConfig,
} from '@/lib/editor'
import { theme } from '@/stitches.config'
import { EditorConfig } from '@/types'

export function useEditor({
  code,
  setCode,
  config,
}: {
  code: string
  setCode: (code: string) => void
  config: EditorConfig
}): {
  ref: RefObject<HTMLDivElement>
  view: EditorView | null
} {
  const ref = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<EditorView | null>(null)

  const themeExtension = useMemo(() => createEditorThemeExtension(theme), [])

  const compartmentRef = useRef(new Compartment())

  useEffect(() => {
    const editor = ref.current
    if (!editor) return

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup(),
        themeExtension,
        EditorView.updateListener.of((vu: ViewUpdate) => {
          if (vu.docChanged) setCode(vu.state.doc.sliceString(0) ?? '')
        }),
        compartmentRef.current.of(getCustomExtensionsFromConfig(config)),
      ],
    })

    const _view = new EditorView({
      state: startState,
      parent: editor,
    })

    setView(_view)

    return () => {
      editor.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  // update code when the current note changes
  useEffect(() => {
    view?.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: code },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  // dynamic configs
  useEffect(() => {
    view?.dispatch({
      effects: compartmentRef.current.reconfigure(
        getCustomExtensionsFromConfig(config)
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  return { ref, view }
}
