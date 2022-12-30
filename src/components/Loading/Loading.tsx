import Image from "next/image";
import barsSvg from "./bars.svg";
export default function Loading() {
  return (
    <>
      <div  className="bars-container">
        <Image  height={50} width={50} src={barsSvg} alt="" priority={false} />
      </div>

      <style jsx>{`
        .bars-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
