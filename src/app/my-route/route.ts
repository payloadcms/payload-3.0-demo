import config from '@payload-config'

export const GET = async () => {
  const { editor } = await config;
  console.log(editor)

  return Response.json({
    hello: 'elliot',
  })
}
