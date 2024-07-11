import { Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";

const Loading = () => {
  const theme = Cookies.get("theme") || "dark";
  return (
    <main
      className={`${theme} flex flex-col bg-primary-200 justify-center items-center min-h-screen w-screen `}
    >
      <Spinner color="primary" size="lg" />
    </main>
  );
};

export default Loading;
