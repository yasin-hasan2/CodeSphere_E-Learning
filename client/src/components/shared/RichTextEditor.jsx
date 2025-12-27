import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function RichTextEditor({ input, setInput }) {
  // const [value, setValue] = useState("");

  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };
  return (
    <div>
      {/* <h1>Hello</h1>  */}
      <ReactQuill value={input?.description} onChange={handleChange} />
    </div>
  );
}

export default RichTextEditor;
