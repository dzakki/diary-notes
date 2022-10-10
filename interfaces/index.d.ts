import { BaseEditor, Descendant, Node, BaseElement } from 'slate';
import { ReactEditor } from 'slate-react';

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type TitleElement = { type: 'title'; children: Descendant[] }
export type ParagraphElement = { type: string; children: CustomText[] }
export type CustomText =  { text: string; bold?: boolean; type?: string; code?: boolean }
export type CustomElement = ParagraphElement | TitleElement | BulletedListElement

export type CustomEditor = BaseEditor & ReactEditor

export type Note = {
  id: number
  content: CustomElement[]
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
