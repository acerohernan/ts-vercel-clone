import { eq } from "drizzle-orm";
import { injectable } from "inversify";

import { db } from "@/db";
import {
  NewUserGhIntegration,
  UserGhIntegration,
  userGhIntegrations,
} from "@vercelclone/core/src/db";

export interface IUserGhIntegrationRepository {
  getByGhId: (ghId: number) => Promise<UserGhIntegration | undefined>;
  getByUserId: (userId: string) => Promise<UserGhIntegration | undefined>;
  update: (
    id: string,
    integrationToUpdate: NewUserGhIntegration
  ) => Promise<void>;
}

@injectable()
export class UserGhIntegrationRepository
  implements IUserGhIntegrationRepository
{
  constructor() {}

  async getByGhId(ghId: number) {
    return db.query.userGhIntegrations.findFirst({
      where: eq(userGhIntegrations.ghUserId, ghId),
    });
  }

  async getByUserId(userId: string) {
    return db.query.userGhIntegrations.findFirst({
      where: eq(userGhIntegrations.userId, userId),
    });
  }

  async update(id: string, integrationToUpdate: Partial<UserGhIntegration>) {
    await db
      .update(userGhIntegrations)
      .set(integrationToUpdate)
      .where(eq(userGhIntegrations.id, id));
  }
}
