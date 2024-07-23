import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col w-[90vw] h-[90vh] text-center justify-center items-center mx-auto gap-5 sm:gap-7 md:gap-9">
      <h1 className="font-bold   text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:font-extrabold ">
        <span className="text-[red]">Uncover Your Next Journey with AI</span>
        <br />
        <span className="text-[black]">
          Tailored itineraries at your fingertips
        </span>
      </h1>
      <p className="text-gray-500  px-2 text-xs sm:text-sm md:text-md lg:text-lg">
        Your dedicated trip planner and travel curator, focused on crafting
        personalized travel guides that match your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
