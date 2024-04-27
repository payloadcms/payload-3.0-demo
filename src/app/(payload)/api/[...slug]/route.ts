/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
// export const OPTIONS = REST_OPTIONS(config)

export const OPTIONS = async (request: Request) => {
  try {
    const headers = new Headers()

    return Response.json(
      {},
      {
        headers,
        status: 200,
      },
    )
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      },
    )
  }
}
