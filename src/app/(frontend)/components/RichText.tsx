import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  content: any
}

const RichText = ({ content }: Props) => {
  if (!content) {
    return null
  }

  return <PayloadRichText data={content} />
}

export default RichText

