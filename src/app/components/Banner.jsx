import Image from "next/image";
import earnestIcon from "public/logo.svg";

const Banner = () => {
    return (
        <div className={"p-5 shadow-md"}>
            <Image priority src={earnestIcon} alt={"EarnestGPT"} />
        </div>
    );
};

export default Banner;
