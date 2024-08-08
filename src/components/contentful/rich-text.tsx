import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const RichText = ({ content }: { content: { json: any } }) => {
  if (!content) return null
  return documentToReactComponents(content.json)
}
