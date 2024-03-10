import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const Example: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const url = payload.config.serverURL
  return <div>The admin panel is running at: {url}</div>
}

export default Example
