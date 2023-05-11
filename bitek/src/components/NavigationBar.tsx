import Image from "next/image";
import type { StaticImageData } from "next/image";
import SmallLogo from "../assets/svg/small-logo.svg";
const NavigationBar = () => {
  return (
    <div className="flex">
      <div className="relative h-10 w-10">
        <Image src={SmallLogo as StaticImageData} alt="wow" fill />
      </div>
    </div>
  );
};

export default NavigationBar;
