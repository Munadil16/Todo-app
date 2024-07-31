import { ring } from "ldrs";

ring.register();

const Loader = () => {
  return <l-ring size="40" stroke="4" bg-opacity="0" speed="2" color="white" />;
};

export default Loader;
