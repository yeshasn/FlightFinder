import Image from "next/image";
import React from "react";

const LoadingTing = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto w-[200px] h-[200px]">
      <Image
        src="/earth.png"
        width={800}
        height={800}
        alt="yo"
        className="absolute w-full h-full blurry rounded-full"
      ></Image>
      <Image
        src="/icons/airplane.svg"
        width={50}
        height={50}
        alt="Airplane"
        className="absolute w-full h-full animate-rotate"
      />
      <Image
        src="/icons/airplane.svg"
        width={50}
        height={50}
        alt="Airplane"
        className="absolute w-full h-full animate-rotate animation-delay-2000 opacity-0"
      />
    </div>
  );
};

export default LoadingTing;
