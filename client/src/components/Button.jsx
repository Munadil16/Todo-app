const Button = ({ content }) => {
  return (
    <>
      <button
        className="mt-2 py-2 w-[20rem] rounded-lg font-medium bg-neutral-900 text-white dark:bg-slate-100 dark:text-black"
        type="submit"
      >
        {content}
      </button>
    </>
  );
};

export default Button;
