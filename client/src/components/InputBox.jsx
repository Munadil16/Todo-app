const InputBox = ({
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  children,
}) => {
  return (
    <div
      id={`${id}InputBox`}
      className="flex justify-between border-[1px] border-slate-800 rounded-lg py-2 pl-2 mb-3 sm:w-[20rem]"
    >
      <input
        className="border-0 outline-none bg-white text-black dark:bg-black dark:text-white w-full"
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        spellCheck="false"
        autoComplete="off"
      />
      {children}
    </div>
  );
};

export default InputBox;
