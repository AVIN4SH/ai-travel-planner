// import LightLogo from "../../assets/logoLight.png";
import DarkLogo from "../../assets/logoDark.png";
import { Button } from "../ui/button";
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
import { useState } from "react";

function Header() {
  const [openDailog, setOpenDailog] = useState(false);

  const handleClick = () => {
    setOpenDailog(true);
  };

  const handleOpenChange = (isOpen) => {
    setOpenDailog(isOpen);
  };

  return (
    <>
      <div className="p-3 px-5 container border-b border-gray-400  flex justify-between items-center">
        {/* <img src={LightLogo} alt="" /> */}
        <img src={DarkLogo} alt="app logo" className="w-12" />
        <Button onClick={handleClick}>Sign in</Button>
      </div>
      <>
        <Dialog open={openDailog} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl my-2">
                Coming Soon 🚀🚀🚀
              </DialogTitle>
              <DialogDescription>
                <p className="">
                  <span className="font-semibold"> Feature coming soon:</span>{" "}
                  This project was built with the purpose of creating a user
                  interface for real-world applications and handling different
                  types of behaviors that users may possibly try to input in
                  various categories of data fields.
                </p>
                <p className="">
                  You can visit my GitHub profile from below link to view more
                  projects.
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
    </>
  );
}

export default Header;
