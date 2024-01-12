import HomePage from "../src/components/HomePage/HomePage";
import ProviderAuth from "./providerAuth";

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
