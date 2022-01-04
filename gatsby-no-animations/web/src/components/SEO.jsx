import React from "react"
import Helmet from "react-helmet"

const SEO = ({
  metaTitle = "TITLE",
  metaDescription,
  metaKeywords,
  openGraphTitle = "TITLE",
  openGraphDescription,
  openGraphImage,
  twitterUser = "",
  twitterTitle = "TITLE",
  twitterDescription,
  twitterImage,
  pathname = "/",
  siteName = "TITLE",
  siteUrl = "https://www.example.com/",
  noIndexNoFollow,
}) => (
  <Helmet>
    {metaTitle && <title>{metaTitle}</title>}
    {metaDescription && <meta name="description" content={metaDescription} />}
    <meta name="keywords" content={metaKeywords} />

    <meta property="og:url" content={`${siteUrl}${pathname}`} />
    <meta property="og:title" content={openGraphTitle} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:description" content={openGraphDescription} />
    {openGraphImage && (
      <meta property="og:image" content={openGraphImage.url} />
    )}

    <meta name="twitter:site" content={twitterUser} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={twitterTitle} />
    <meta name="twitter:description" content={twitterDescription} />
    <meta name="twitter:url" content={`${siteUrl}${pathname}`} />
    {twitterImage && (
      <meta name="twitter:image:src" content={twitterImage.url} />
    )}
    {noIndexNoFollow && <meta name="robots" content="noindex, nofollow" />}
  </Helmet>
)

export default SEO
