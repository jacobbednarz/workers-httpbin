# workers-httpbin

Because everyone needs a good HTTP bin.

## Demo

https://httpbin.jb.workers.dev

## Routes

| Route                       | Example       | Use                                                                    |
| --------------------------- | ------------- | ---------------------------------------------------------------------- |
| `/status/:http_status_code` | `/status/200` | Returns a response and status code matching the requested status code. |
| `*`                         | `/foo`        | Catch all 404                                                          |
