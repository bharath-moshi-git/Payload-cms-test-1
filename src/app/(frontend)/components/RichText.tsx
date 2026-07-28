import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

const RichText = ({ content }) => {
  if (!content) {
    return null
  }

  return <PayloadRichText data={content} />
}

export default RichText

