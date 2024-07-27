import { useEffect, useRef } from "react";
import errorIcon from "../assets/images/error.webp";

const DisplayError = ({ setErrorStatus, errorMessage }) => {
  const errorDiv = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      errorDiv.current.classList.toggle("animate-errorAnimateDown");
      errorDiv.current.classList.toggle("animate-errorAnimateUp");

      // To show animation
      setTimeout(() => {
        setErrorStatus(false);
      }, 1250);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={errorDiv}
      className="flex items-center gap-4 absolute left-[50%] -translate-x-2/4 w-[90vw] max-w-72 p-3 bg-[#ff8793] border-2 border-[#ff162e] rounded-md animate-errorAnimateDown"
    >
      <img className="w-6" src={errorIcon} alt="Error Icon" />
      <p>{errorMessage}</p>
    </div>
  );
};

export default DisplayError;
