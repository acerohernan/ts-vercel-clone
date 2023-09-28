export const CONTAINER_TYPES = {
  /* Controllers */
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),
  ProjectController: Symbol.for("ProjectController"),
  WebhooksController: Symbol.for("WebhooksController"),

  /* Services */
  JWTService: Symbol.for("JWTService"),
  GithubService: Symbol.for("GithubService"),
  RealtimeService: Symbol.for("RealtimeService"),
  AuthService: Symbol.for("AuthService"),
  UserService: Symbol.for("UserService"),
  ProjectService: Symbol.for("ProjectService"),
  DeploymentService: Symbol.for("DeploymentService"),
  GithubWebhookService: Symbol.for("GithubWebhookService"),

  /* Repositories */
  UserRepository: Symbol.for("UserRepository"),
  UserGhIntegrationRepository: Symbol.for("UserGhIntegrationRepository"),
  ProjectRepository: Symbol.for("ProjectRepository"),
  DeploymentRepository: Symbol.for("DeploymentRepository"),
};
