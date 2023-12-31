import { AiFillGithub } from "react-icons/ai";
import { FaGitlab } from "react-icons/fa";
import { IoLogoBitbucket } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SocialLoginForm = () => {
  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        size="lg"
        type="button"
        asChild
        className="w-full text-md flex items-center justify-center gap-2"
      >
        <a className="cursor-pointer" href={`${import.meta.env.VITE_API_URL}/auth/github`}>
          <div className="text-2xl">
            <AiFillGithub />
          </div>
          Continue with Github
        </a>
      </Button>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant="outline"
                size="lg"
                type="button"
                className="w-full text-md flex items-center justify-center gap-2 bg-violet-700"
                disabled
              >
                <div className="text-xl">
                  <FaGitlab />
                </div>
                Continue with Gitlab
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Soon...</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant="outline"
                size="lg"
                type="button"
                disabled
                className="w-full text-md flex items-center justify-center gap-2 bg-blue-600"
              >
                <div className="text-2xl">
                  <IoLogoBitbucket />
                </div>
                Continue with Bitbucket
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Soon...</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
