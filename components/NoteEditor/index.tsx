import { CSSProperties, FC, useCallback, useMemo } from 'react'
import { createEditor, Descendant,  Node, Transforms, Element as SlateElement, } from 'slate'
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory } from 'slate-history'
import styles from '../../styles/Home.module.css'
import { CustomEditor } from '../../helpers'


const withLayout = (editor: ReactEditor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      for (const [child, childPath] of Node.children(editor, path)) {
        let type = child.type || 'paragraph'
        const slateIndex = childPath[0]
        const enforceType = (type: string) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type }
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: childPath,
            })
          }
        }
        switch (slateIndex) {
          case 0:
            type = 'title'
            enforceType(type)
            break
          case 1:
            if (child.type === 'title') {
              type = 'paragraph'
            }
            enforceType(type)
          default:
            break
        }
      }
    }

    return normalizeNode([node, path])
  }

  return editor
}

const Leaf = (props: RenderLeafProps) => {
  const styles: CSSProperties = {}
  const bold = props.leaf?.bold
  if (bold !== undefined) {
    styles.fontWeight = bold ? 'bold' : 'normal'
  }

  const isCode = props.leaf?.code
  if (isCode) {
    return (
      <code {...props.attributes}>
          <span
            {...props.attributes}
            style={styles}
          >
            {props.children}
          </span>
      </code>
    )
  }
    
  return (
    <span
      {...props.attributes}
      style={styles}
    >
      {props.children}
    </span>
  )
}

interface NoteEditorProps {
  initialValue: Descendant[] 
}

const NoteEditor: FC<NoteEditorProps> = ({ initialValue }) => {
  const editor = useMemo(() => withLayout(withHistory(withReact(createEditor()))), [])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'title':
        return <h2 {...props.attributes} className={styles.titleCard} >{props.children}</h2>
      case 'bulleted-list':
        return <ul {...props.attributes}>{props.children}</ul>
      case 'list-item':
        return <li {...props.attributes}>{props.children} </li>
      default:
        return <p {...props.attributes}>{props.children}</p>
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])


  return (
    <div style={{ height: '100%' }}>
      <Slate editor={editor} value={initialValue}>
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }
  
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }
  
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }

              case '8': {
                event.preventDefault()
                CustomEditor.bulletList(editor)
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default NoteEditor
