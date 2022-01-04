import React from "react"
import SEO from "../components/SEO"

const NotFound = ({ pageContext }) => {
  const { seo } = pageContext
  return (
    <React.Fragment>
      <SEO {...seo} />
      <section className="overview">
        <p>404</p>
      </section>
    </React.Fragment>
  )
}
export default NotFound
