import { Elysia } from "elysia";
import { env } from "./config";

const app = new Elysia({
  prefix: "/api",
});

app.get("/", () => ({ hello: "world", env: env.NODE_ENV }));

app.listen({
  port: env.PORT,
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} (env=${env.NODE_ENV})`
);
