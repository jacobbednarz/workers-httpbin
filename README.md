# workers-httpbin

Because everyone needs a good HTTP bin.

## Demo

https://httpbin.jb.workers.dev

## Routes

| Route                         | Example              | Use                                                                    |
| ----------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `/status/:http_status_code`   | `/status/200`        | Returns a response and status code matching the requested status code. |
| `/delay/:timeout`             | `/delay/3`           | Delays a response for the designated `timeout`.                        |
| `/content-type/:content_type` | `/content-type/json` | Returns a response for the requested content type.                     |
| `/ping`                       | `/ping`              | Returns a PONG.                                                        |
| `/ip`                         | `/ip`                | Returns the callers IP.                                                |
| `/headers`                    | `/headers`           | Returns the HTTP headers sent with the request.                        |
| `/user-agent`                 | `/user-agent`        | Returns the callers user agent.                                        |
| `/uuid`                       | `/uuid`              | Generates a v4 UUID.                                                   |
| `*`                           | `/foo`               | Catch all 404                                                          |
