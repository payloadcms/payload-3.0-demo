import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Payload } from 'payload'

let payloadInstance: Payload

export const getPayloadInstance = async () => {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}
