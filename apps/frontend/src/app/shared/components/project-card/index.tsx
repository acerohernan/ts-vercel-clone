import { Link } from "react-router-dom";
import { LuGitBranch } from "react-icons/lu";
import { AiFillGithub } from "react-icons/ai";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { IProjectWithLatestDeployment } from "@/api/project/types";

interface Props {
  project: IProjectWithLatestDeployment;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const { latestDeployment: deployment } = project;

  return (
    <Link to={`projects/${project.name}`}>
      <Card className="w-full h-full bg-background hover:border-black dark:hover:border-white flex flex-col justify-between">
        <div>
          <CardHeader>
            <div className="flex items-center gap-4">
              <img className="w-8 h-8 rounded-full" src="https://vercel.com/api/www/avatar?u=acerohernan&s=44" />
              <div>
                <CardTitle className="font-normal text-md">{project.name}</CardTitle>
                <CardDescription>{project.name}.vercel.app</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">
              <p>{deployment.sourceGitCommitMessage}</p>
              <span className="flex items-center gap-1 font-light mt-2">
                <LuGitBranch />
                From {deployment.sourceGitBranch}
              </span>
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">36d ago vía</span>
            <span className="text-lg">
              <AiFillGithub />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
