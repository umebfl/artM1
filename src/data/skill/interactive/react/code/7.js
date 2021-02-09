
export default `
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useLayoutEffect(() => {
    textRef.current = text; // 将 text 写入到 ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 中读取 text
    alert(currentText);
  }, [textRef]); // handleSubmit 只会依赖 textRef 的变化。不会在 text 改变时更新

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
`