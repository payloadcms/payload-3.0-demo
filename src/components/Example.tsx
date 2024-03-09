import React from 'react'
import { getPayload } from 'payload'

const Example: React.FC = async () => {
  const payload = await getPayload()
  const url = payload.config.serverURL
  return <div>The admin panel is running at: {url}</div>
}

export default Example
