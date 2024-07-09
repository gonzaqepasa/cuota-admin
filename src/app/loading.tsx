import { Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";

const Loading = () => {
  return (
    <main
      className={`${Cookies.get(
        "theme"
      )} flex flex-col bg-primary-200 justify-center items-center min-h-screen w-screen `}
    >
      <Spinner color="primary" size="lg" />
    </main>
  );
};

export default Loading;
