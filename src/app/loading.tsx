import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full">
      <Spinner color="primary" size="lg" />
    </main>
  );
};

export default Loading;
