import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = () => (
  <header className="grid-container header df fdc fdr--lg jcb psy">
    <h1 className="header__title">
      <Link to="/">Dan McMahon</Link>
    </h1>

    <nav className="pt1 pt0--lg header__nav">
      <Link
        to="/"
        activeClassName="active"
        title="Home"
        className="header__nav-link mr2 mr5--lg"
      >
        Overview
      </Link>
      <Link
        to="/projects"
        activeClassName="active"
        title="Projects List"
        className="header__nav-link mr2 mr5--lg"
      >
        Projects
      </Link>
      <Link
        to="/information"
        title="About"
        activeClassName="active"
        className="header__nav-link "
      >
        Information
      </Link>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
