import Router from "express-promise-router";

import { container } from "@v1/shared/container";
import { CONTAINER_TYPES } from "@v1/shared/container/types";
import { verifyJwt } from "@v1/shared/middlewares/verifyJwt";

import { ProjectController } from "./project.controller";

export const projectRouter = Router();

const controller = container.get<ProjectController>(
  CONTAINER_TYPES.ProjectController
);

projectRouter.get("/", verifyJwt, (req, res) =>
  controller.getProjectsHandler(req, res)
);

projectRouter.post("/", verifyJwt, (req, res) =>
  controller.createProjectHandler(req, res)
);

projectRouter.get("/:projectName", verifyJwt, (req, res) =>
  controller.getProjectHandler(req, res)
);

projectRouter.get("/:projectName/deployment", verifyJwt, (req, res) =>
  controller.getDeploymentsHandler(req, res)
);
