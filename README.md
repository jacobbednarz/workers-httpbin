# workers-httpbin

Because everyone needs a good HTTP bin.

## Demo

https://httpbin.jb.workers.dev

## Routes

| Route                         | Example              | Use                                                                    |
| ----------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `/content-type/:content_type` | `/content-type/json` | Returns a response for the requested content type.                     |
| `/delay/:timeout`             | `/delay/3`           | Delays a response for the designated `timeout`.                        |
| `/headers`                    | `/headers`           | Returns the HTTP headers sent with the request.                        |
| `/ip`                         | `/ip`                | Returns the callers IP.                                                |
| `/ping`                       | `/ping`              | Returns a PONG.                                                        |
| `/request`                    | `/request`           | Get all the request parameters (including the `cf` object)             |
| `/status/:http_status_code`   | `/status/200`        | Returns a response and status code matching the requested status code. |
| `/user-agent`                 | `/user-agent`        | Returns the callers user agent.                                        |
| `/uuid`                       | `/uuid`              | Generates a v4 UUID.                                                   |
| `*`                           | `/foo`               | Catch all 404                                                          |
