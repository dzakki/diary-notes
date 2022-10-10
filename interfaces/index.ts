import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type TitleElement = { type: 'title'; children: Descendant[] }
export type ParagraphElement = { type: string; children: CustomText[] }
export type CustomText = { text: string; bold?: boolean; type?: string; code?: boolean }
export type Element = ParagraphElement | TitleElement | BulletedListElement

export type Note = {
  id: number
  content: Element[]
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: Element
    Text: CustomText
  }
}