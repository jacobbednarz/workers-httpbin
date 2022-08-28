import { Router } from "itty-router";
import { statusCodeToText } from "./http_status_code_to_text";

const router = Router();

router.get("/ping", () => new Response("PONG"));

router.get("/status/:status", async (r) => {
  let statusText: string = "OK";
  let statusCode = 200;

  if (typeof r?.params?.status !== "undefined" && r?.params?.status !== null) {
    statusCode = parseInt(r.params.status);
    statusText = statusCodeToText?.get(statusCode) || "OK";
  }

  return new Response(null, {
    status: statusCode,
    statusText: statusText,
    headers: { "content-type": "text/plain" },
  });
});

router.all("/delay/:timeout", async ({ params }) => {
  const timeout = parseInt(params.timeout) || 3;
  await new Promise((r) => setTimeout(r, 1000 * timeout, {}));
  return new Response(null);
});

router.get("/content-type/:content_type", (r: Request) => {
  switch (r?.headers.get("content_type")) {
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
    case "plain": {
      return new Response(`PONG`, {
        headers: { "content-type": "text/plain" },
      });
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

router.get("/request", async (r: Request) => {
  const data = {
    request: {
      event: r,
      cf: r.cf,
      headers: Object.fromEntries(r.headers),
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
});

router.get("/ip", async (r: Request) => {
  return new Response(r.headers.get("cf-connecting-ip"), {
    headers: { "content-type": "text/plain" },
  });
});

router.get("/headers", async (r: Request) => {
  return new Response(JSON.stringify(Object.fromEntries(r.headers)), {
    headers: { "content-type": "application/json" },
  });
});

router.get("/user-agent", async (r: Request) => {
  return new Response(r.headers.get("user-agent"), {
    headers: { "content-type": "text/plain" },
  });
});

router.get("/uuid", () => {
  return new Response(crypto.randomUUID(), {
    headers: { "content-type": "text/plain" },
  });
});

router.all(
  "*",
  () =>
    new Response(
      JSON.stringify({
        "/content-type/:content_type":
          "Returns a response with the designated content type and example content.",
        "/delay/:timeout": "Delays a response for the designated `timeout`.",
        "/headers": "Display all HTTP headers.",
        "/ip": "Get the callers IP.",
        "/ping": "Returns a PONG.",
        "/request": "Returns everything about the request and response.",
        "/status/:status":
          "Returns a response and status code matching the requested status code.",
        "/user-agent": "Return the user agent.",
        "/uuid": "Generates a v4 UUID.",
      }),
      { status: 404, headers: { "content-type": "application/json" } }
    )
);

addEventListener("fetch", (e) => e.respondWith(router.handle(e.request)));
