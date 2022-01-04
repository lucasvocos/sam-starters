import React, { useEffect } from "react"
import PropTypes from "prop-types"
import vhCheck from "vh-check"
import Header from "./Header"
import "../styles/main.scss"

const Layout = ({ children }) => {
  useEffect(() => {
    const test = vhCheck()
  }, [])
  return (
    <React.Fragment>
      <Header />
      <main className="grid-container">{children}</main>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
