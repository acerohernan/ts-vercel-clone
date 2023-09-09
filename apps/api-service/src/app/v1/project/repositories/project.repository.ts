import { db } from "@/db";
import { projects } from "@/db/schema/project";
import { projectBuildSettings } from "@/db/schema/project/build-settings";
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
    const result = await db.query.projects.findMany({
      where: eq(projects.userId, userId),
    });

    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.userId, userId));

    return {
      projects: result,
      totalCount: totalCount[0].count,
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
