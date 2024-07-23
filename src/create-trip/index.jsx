import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SelectBudgetOptions, SelectTravelesList } from "../utils/constants";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

// import { chatSession } from "@/geminiService/AiModal";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [formData, setFormData] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [maxDaysMessage, setMaxDaysMessage] = useState("");
  const [incompleteInputMessage, setIncompleteInputMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [openDailog, setOpenDailog] = useState(false);

  const handleFormInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate location
    if (name === "location") {
      const locationRegex = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;
      if (!locationRegex.test(value)) {
        // toast('Please enter a valid location in the format "City, Country".');
        setValidationMessage(
          'Please enter a valid location in the format "City, Country".'
        );
      } else {
        setValidationMessage("");
      }
    }

    // Validate number of days
    if (name === "numberOfDays") {
      const numberOfDays = parseInt(value, 10);
      if (isNaN(numberOfDays) || numberOfDays > 8 || numberOfDays < 1) {
        // toast("Trip duration should not exceed 15 days.");
        if (numberOfDays < 1)
          setMaxDaysMessage("Trip duration cannot be less than 1.");
        if (numberOfDays > 8)
          setMaxDaysMessage("Trip duration should not exceed 8 days.");
      } else {
        setMaxDaysMessage("");
      }
    }
  };

  useEffect(() => {
    if (hasAttemptedSubmit) {
      const isFormIncomplete =
        !formData.location ||
        !formData.numberOfDays ||
        !formData.budget ||
        !formData.traveler;
      setIsButtonDisabled(isFormIncomplete);
      if (!isFormIncomplete) setIncompleteInputMessage("");
    }
  }, [formData, hasAttemptedSubmit]);

  const onGenerateTrip = async () => {
    // console.log(formData);
    if (
      !formData.location ||
      !formData.numberOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      // setIncompleteInputMessage("Please input data in all fields");
      toast("Please input data in all fields");
      setIsButtonDisabled(true);
      setHasAttemptedSubmit(true);
    } else {
      setIncompleteInputMessage("");
      setOpenDailog(true);
      // ! Gemini data fetching logic:
      // const AiPrompt =
      //   "Generate Travel plan for Location: " +
      //   formData.location +
      //   ", for " +
      //   formData.numberOfDays +
      //   " days for " +
      //   formData.traveler +
      //   " for a " +
      //   formData.budget +
      //   " budget, give me hotels option list with hotel name, hotel address, price, hotel image url, geo coordinates, rating description, and suggest itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, timeToTravel each of location for " +
      //   formData.numberOfDays +
      //   " days with each day plan with best time to visit in JSON format";
      // console.log(formData);
      // console.log(AiPrompt);
      // const result = await chatSession.sendMessage(AiPrompt);
      // console.log(result.response.text());
      // console.log("done");
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpenDailog(isOpen);
  };

  return (
    <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10 container">
      <h2 className="font-semibold sm:font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Tell us your Travel Preference 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg">
        Just provide some basic information, & our trip planner will generate a{" "}
        customized itenerary based on your preferences.
      </p>

      <div className="flex flex-col gap-4 sm:gap-5 md:gap-8 lg:gap-10 mt-5 sm:mt-8 md:mt-12 lg:mt-16">
        <div className="">
          <h2 className="text-xl sm:text-2xl my-3 font-medium">
            What is destination of your choice?
          </h2>
          <Input
            type="text"
            placeholder="Example: Bali, Indonesia"
            className=""
            onChange={(e) => {
              handleFormInputChange("location", e.target.value);
            }}
          />
          {validationMessage && (
            <p className="text-red-500 mt-2">{validationMessage}</p>
          )}
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_REACT_APP_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          /> */}
        </div>
        <div className="">
          <h2 className="text-xl sm:text-2xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            placeholder="Example: 5"
            className=""
            onChange={(e) => {
              handleFormInputChange("numberOfDays", e.target.value);
            }}
          />
          {maxDaysMessage && (
            <p className="text-red-500 mt-2">{maxDaysMessage}</p>
          )}
        </div>
        <div className="">
          <h2 className="text-xl sm:text-2xl my-3 font-medium">
            What is your Budget?
          </h2>
          <p className="mt-3 text-gray-500 text-xs sm:text-sm md:text-md">
            The budget is exclusively allocated for activities & dining
            purposes.
          </p>
          <div className="flex flex-col justify-center items-center text-center sm:grid sm:grid-cols-3 mt-5 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                onClick={() => handleFormInputChange("budget", item?.title)}
                className={`p-4 border  w-full rounded-lg cursor-pointer shadow-sm hover:shadow-xl ${
                  formData?.budget == item.title && "shadow-xl border-black/40"
                } `}
                key={index}
              >
                <h2 className="p-1 text-4xl">{item.icon}</h2>
                <h2 className="p-1 font-semibold text-lg">{item.title}</h2>
                <h2 className="p-1 text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-xl sm:text-2xl my-3 font-medium">
            Who do you want to travel with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 justify-center items-center text-center sm:grid sm:grid-cols-4 mt-5 gap-5">
            {SelectTravelesList.map((item, index) => (
              <div
                onClick={() => handleFormInputChange("traveler", item?.people)}
                className={`p-4 border  w-full rounded-lg cursor-pointer shadow-sm hover:shadow-xl ${
                  formData?.traveler == item.people &&
                  "shadow-xl border-black/40"
                } `}
                key={index}
              >
                <h2 className="p-1 text-4xl">{item.icon}</h2>
                <h2 className="p-1 font-semibold text-lg">{item.title}</h2>
                <h2 className="p-1 text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 mx-auto text-center">
        {validationMessage && (
          <p className="text-red-500 my-2">
            {"Enter location in specified valid formate"}
          </p>
        )}
        {maxDaysMessage && (
          <p className="text-red-500 my-2">
            {"Trip duration should not exceed 8 Days"}
          </p>
        )}
        {incompleteInputMessage && (
          <p className="text-red-500 my-2">{incompleteInputMessage}</p>
        )}
        <Button
          disabled={validationMessage || maxDaysMessage || isButtonDisabled}
          onClick={onGenerateTrip}
          className="w-full lg:w-[20vw] hover:scale-105 transition-transform"
        >
          Generate Trip
        </Button>
      </div>
      <>
        <Toaster className="" />
      </>
      <>
        <Dialog open={openDailog} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl my-2">
                Coming Soon 🚀🚀🚀
              </DialogTitle>
              <DialogDescription>
                <p className="">
                  <span className="font-semibold">Feature coming soon: </span>
                  This project was built with the purpose of creating a user
                  interface for real-world applications and handling different
                  types of behaviors that users may possibly try to input in
                  various categories of data fields. <br />
                  <span className="">
                    You can visit my GitHub profile from below to view more
                    projects.
                  </span>
                </p>
                <div className="text-center">
                  <a
                    href="https://github.com/AVIN4SH"
                    target="_blank"
                    className=""
                  >
                    <Button className="w-full text-center flex gap-2 items-center mt-4 mb-2">
                      <FaGithub className="h-6 w-6" />{" "}
                      <span className="text-lg font-semibold tracking-wider">
                        GitHub
                      </span>
                    </Button>
                  </a>
                </div>
              </DialogDescription>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 text-white w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}

export default CreateTrip;
