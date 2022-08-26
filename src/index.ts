import { Router } from "itty-router";
import { statusCodeToText } from "./http_status_code_to_text";

const router = Router();

router.get("/ping", () => new Response("PONG"));

router.get("/status/:status", async (request) => {
  let statusText: string = "OK";
  let statusCode = 200;

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

router.get("/content-type/:content_type", (request: Request) => {
  switch (request?.params?.content_type) {
    case "json": {
      return new Response(JSON.stringify({ foo: "bar", baz: "qux" }), {
        headers: { "content-type": "application/json" },
      });
    }
    case "xml": {
      return new Response(
        `<note><to>Quisque</to><from>Vivamus</from><heading>Phasellus aliquet</heading><body>Suspendisse sit amet aliquam arcu</body></note>`,
        {
          headers: { "content-type": "application/xml" },
        }
      );
    }
    default: {
      return new Response(
        `<html><head><title>foo</title></head><body>bar</body></html>`,
        {
          headers: { "content-type": "application/html" },
        }
      );
    }
  }
});

router.get("/ip", async (request: Request) => {
  return new Response(request.headers.get("cf-connecting-ip"));
});

router.get("/headers", async (request: Request) => {
  return new Response(JSON.stringify(Object.fromEntries(request.headers)), {
    headers: { "content-type": "application/json" },
  });
});

router.get("/user-agent", async (request: Request) => {
  return new Response(request.headers.get("user-agent"));
});

router.get("/uuid", () => {
  return new Response(crypto.randomUUID());
});

router.all("*", () => new Response("Not found", { status: 404 }));

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
