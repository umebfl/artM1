
export default `
function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeMethods(ref, () => ({
        /* 在此示例中，渲染 <FancyInput ref={fancyInputRef} /> 的父组件将能够调用 fancyInputRef.current.focus() */
        focus: () => {
        inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} ... />;
}

FancyInput = forwardRef(FancyInput);
`