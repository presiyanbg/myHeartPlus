import { HERO } from "@/constants/links";
import Image from "next/image";

const HeroBanner = () => {
    return (
        <div className="w-full h-full-dynamic text-center flex items-center justify-items-center">
            <Image
                width={1200}
                height={1200}
                className="h-full-dynamic w-full"
                src={`${HERO?.url}`}
                alt="Image of the company" />
        </div>
    );
}

export default HeroBanner;