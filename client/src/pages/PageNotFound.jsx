import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { navbarHeightAtom } from "../store/atoms/navbarHeight";
import PageNotFoundIllustration from "../assets/images/PageNotFound.webp";

const PageNotFound = () => {
  const navigate = useNavigate();
  const navbarHeight = useRecoilValue(navbarHeightAtom);

  return (
    <div
      style={{ minHeight: `calc(100dvh - ${navbarHeight}px)` }}
      className="flex flex-col items-center bg-white dark:bg-black"
    >
      <img
        className="h-80"
        src={PageNotFoundIllustration}
        alt="Page not found illustration"
      />

      <button
        className="py-3 px-5 mt-10 rounded-full font-medium text-white bg-black dark:text-black dark:bg-white"
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
