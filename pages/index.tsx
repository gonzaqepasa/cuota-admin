import HomePage from "../src/components/HomePage/HomePage";
import ProviderAuth from "./ProviderAuth";

export default function Home() {
  return (
    <>
      <ProviderAuth>
        <main className="main">
          <HomePage />
        </main>
      </ProviderAuth>
    </>
  );
}
