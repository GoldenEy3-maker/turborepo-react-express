import { useState, type FC } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
]

const HomePage: FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <main className="home">
      <Slate editor={editor} initialValue={initialValue}>
        <Editable />
      </Slate>
    </main>
  )
}

export default HomePage
