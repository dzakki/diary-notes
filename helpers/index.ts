import { BaseEditor,  Editor, Transforms, Text } from 'slate'
import { ReactEditor } from 'slate-react'

type EditorTypes = BaseEditor & ReactEditor

export const CustomEditor = {
  isBoldMarkActive(editor: EditorTypes) {
    const [match] = Editor.nodes(editor, {
      match: (n: Element) => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor: EditorTypes) {
    const [match] = Editor.nodes(editor, {
      match: n => n.code === true,
    })

    return !!match
  },

  isBulletList(editor: EditorTypes) {
    let isActive = false

    const { selection } = editor
    if (selection) {
      const [match] =  Array.from(Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => n.type === 'bulleted-list',
      }))

      isActive = !!match
    }

    return isActive
  },

  toggleBoldMark(editor: EditorTypes) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? false : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: EditorTypes) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { code: isActive ? false : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  bulletList(editor: EditorTypes) {
    let isActive = CustomEditor.isBulletList(editor)

    Transforms.unwrapNodes(editor, {
      match: n => n.type === 'bulleted-list',
      split: true,
    })

    Transforms.setNodes(editor, {
      type: !isActive ? 'list-item' : 'paragraph'
    })
    
    if (!isActive) {
      Transforms.wrapNodes(editor, {
        type: 'bulleted-list',
        children: []
      })
    }

  }
}
