import { Router } from "itty-router";
import { statusCodeToText } from "./http_status_code_to_text";

const router = Router();

router.get("/ping", () => new Response("PONG"));
router.get("/status/:status", async (request) => {
  let statusText: string = "OK";
  let statusCode = 200;

  console.log(request?.params?.status);
  if (
    typeof request?.params?.status !== "undefined" &&
    request?.params?.status !== null
  ) {
    statusCode = parseInt(request.params.status);
    statusText = statusCodeToText?.get(statusCode) || "OK";
  }

  return new Response(null, {
    status: statusCode,
    statusText: statusText,
  });
});

router.all("/delay/:timeout", async (request: Request) => {
  let timeout = parseInt(request?.params?.timeout) || 3;
  await new Promise((r) => setTimeout(r, 1000 * timeout));
  return new Response(null);
});
router.all("*", () => new Response("Not found", { status: 404 }));

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
