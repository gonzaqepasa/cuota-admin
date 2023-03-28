import Image from "next/image";
import barsSvg from "./bars2.svg";

interface Props {
  size?: number;
}

const Loading: React.FC<Props> = ({ size }) => {
  return (
    <>
      <div className="bars-container">
        <Image
          height={size ? size : 50}
          width={size ? size : 50}
          src={barsSvg}
          alt=""
          priority={false}
        />
      </div>

      <style jsx>{`
        .bars-container {
          // width:100%;
          // height: 100%;
          position: relative;
          margin: auto auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Loading;
