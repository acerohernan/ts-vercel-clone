import { db } from "@/db";
import { deploymentsCount } from "@/db/schema/deployment/count";
import { lastDeployments } from "@/db/schema/deployment/last-deployment";
import { projects } from "@/db/schema/project";
import { projectBuildSettings } from "@/db/schema/project/build-settings";
import { projectsCount } from "@/db/schema/project/count";
import { projectEnvVariables } from "@/db/schema/project/env-variables";
import { projectRepositories } from "@/db/schema/project/repository";
import {
  NewProjectRepository,
  NewProject,
  NewProjectBuildSettings,
  NewProjectEnvVariable,
  Project,
  ProjectRepository as DBProjectRepository,
  ProjectBuildSettings,
} from "@/db/types";
import { eq, sql } from "drizzle-orm";
import { injectable } from "inversify";
import { v4 } from "uuid";

interface ICreateParams {
  project: NewProject;
  repository: NewProjectRepository;
  buildSettings: NewProjectBuildSettings;
  envVariables: Array<NewProjectEnvVariable>;
}
export interface IProjectRepository {
  create: (params: ICreateParams) => Promise<void>;
  getById: (projectId: string) => Promise<Project | undefined>;
  getRepository: (
    projectId: string
  ) => Promise<DBProjectRepository | undefined>;
  getBuildSettings: (
    projectId: string
  ) => Promise<ProjectBuildSettings | undefined>;
  getAll: (params: {
    userId: string;
  }) => Promise<{ projects: Project[]; totalCount: number }>;
}

@injectable()
export class ProjectRepository implements IProjectRepository {
  async getAll({ userId }: { userId: string }) {
    const [projectsResult, totalCount] = await Promise.all([
      db.query.projects.findMany({
        where: eq(projects.userId, userId),
        limit: 9,
        offset: 0,
      }),
      db.query.projectsCount.findFirst({
        where: eq(projectsCount.userId, userId),
      }),
    ]);

    return {
      projects: projectsResult,
      totalCount: totalCount ? totalCount.totalCount : 0,
    };
  }

  async create({
    project,
    repository,
    buildSettings,
    envVariables,
  }: ICreateParams) {
    await db.transaction(async (tx) => {
      await tx.insert(projects).values(project);

      await Promise.all([
        tx.insert(projectRepositories).values(repository),
        tx.insert(projectBuildSettings).values(buildSettings),
        envVariables.map((variable) =>
          tx.insert(projectEnvVariables).values(variable)
        ),
        tx
          .insert(deploymentsCount)
          .values({ id: v4(), projectId: project.id!, totalCount: 0 }),
        tx.insert(lastDeployments).values({
          id: v4(),
          projectId: project.id!,
          deploymentId: null,
        }),
        tx
          .update(projectsCount)
          .set({ totalCount: sql`${projectsCount.totalCount} + 1` })
          .where(eq(projectsCount.userId, projects.userId)),
      ]);
    });
  }

  async getById(projectId: string) {
    return db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });
  }

  async getRepository(projectId: string) {
    return db.query.projectRepositories.findFirst({
      where: eq(projectRepositories.projectId, projectId),
    });
  }

  async getBuildSettings(projectId: string) {
    return db.query.projectBuildSettings.findFirst({
      where: eq(projectBuildSettings.projectId, projectId),
    });
  }
}
