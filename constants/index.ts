import { CustomElement, Note } from '../interfaces';

export const GUIDLINES_NOTE: CustomElement[] = [
  {
    "type": "title",
    "children": [
      {
        "text": "Your title diary"
      }
    ]
  },
  {
    "type": "bulleted-list",
    "children": [
      {
        "type": "list-item",
        "children": [
          {
            "text": "Bullet list"
          }
        ]
      },
      {
        "type": "list-item",
        "children": [
          {
            "text": "ctrl+8",
            "code": true
          },
          {
            "text": " toggle the bullet list format"
          }
        ]
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "text": "toggle text",
        "bold": false,
        "code": false
      },
      {
        "bold": true,
        "text": " bold: "
      },
      {
        "bold": true,
        "text": "ctrl+b",
        "code": true
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "bold": false,
        "code": false,
        "text": "toggle "
      },
      {
        "bold": false,
        "code": true,
        "text": "code"
      },
      {
        "bold": false,
        "code": false,
        "text": ": "
      },
      {
        "bold": false,
        "code": true,
        "text": "ctrl+` "
      }
    ]
  }
]

export const INITIAL_NOTE: Note = {
  id: 1,
  content: [
    {
      type: 'title',
      children: [{ text: 'Your title diary' }],
    },
    {
      type: 'paragraph',
      children: [{ text: '...' }],
    },
  ]
}
