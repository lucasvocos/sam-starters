import React from "react"
import SEO from "../components/SEO"
import BlockContent from "@sanity/block-content-to-react"
import richText from "../serializer/richText"

const Information = ({ pageContext }) => {
  const { content, seo } = pageContext

  return (
    <React.Fragment>
      <SEO {...seo} />
      <section className="mt2 mt5--sm ">
        <div className="rich-text ">
          <BlockContent blocks={content} serializers={richText} />
        </div>
      </section>
    </React.Fragment>
  )
}
export default Information
