import React from "react"
import { defaultSerializers } from "@sanity/block-content-to-react"

export default {
  types: {
    block: props => {
      const { style = "normal" } = props.node

      if (style === "h1") {
        return <h1>{props.children}</h1>
      } else if (style === "h2") {
        return <h2>{props.children}</h2>
      } else if (style === "h3") {
        return <h3>{props.children}</h3>
      }

      // Fall back to default handling
      return defaultSerializers.types.block(props)
    },
  },
  marks: {
    link: ({ mark, children }) => {
      const { href, openInNewWindow } = mark
      return (
        <a
          href={href}
          className="link--underline"
          target={openInNewWindow && "_blank"}
          rel={openInNewWindow && "noreferrer noopener"}
        >
          {children}
        </a>
      )
    },
  },
}
