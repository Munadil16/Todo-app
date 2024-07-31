import { useRecoilValue } from "recoil";
import { navbarHeightAtom } from "../store/atoms/navbarHeight";

const Profile = () => {
  const navbarHeight = useRecoilValue(navbarHeightAtom);

  return (
    <div
      style={{ minHeight: `calc(100dvh - ${navbarHeight}px)` }}
      className="flex items-center justify-center text-2xl bg-white text-black dark:text-white dark:bg-black"
    >
      <p>Under development</p>
    </div>
  );
};

export default Profile;
