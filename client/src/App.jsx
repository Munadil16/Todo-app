import { RecoilRoot } from "recoil";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <RecoilRoot>
      <Navbar />
      <Outlet />
    </RecoilRoot>
  );
};

export default App;
