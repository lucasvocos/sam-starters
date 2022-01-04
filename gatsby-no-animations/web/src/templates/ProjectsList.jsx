import React, { Fragment, useState } from "react"
import classNames from "classnames"
import SEO from "../components/SEO"

const ProjectList = ({ pageContext }) => {
  const { projects = [] } = pageContext
  const [currentThumbnail, setCurrentThumbnail] = useState(null)

  return (
    <Fragment>
      <SEO metaTitle="Projects — Dan McMahon" />
      <section className="projects df mt2 mb5 mt5--sm jcb">
        <ul className="projects__list df fdc col c5--lg">
          {projects.map((proj, index) => {
            if (proj.draft) {
              return
            } else
              return (
                <li
                  key={proj._id || proj._key}
                  className={classNames("fit", {
                    "mt2 mt0--lg": index > 0,
                  })}
                >
                  <a
                    href={`/projects/${proj.url}`}
                    className="x header__nav-link"
                  >
                    <img
                      className="projects__thumbnail hide--lg x"
                      src={`${proj.thumbnail}?w=800&auto=format`}
                      alt={proj.title}
                    />

                    <p
                      onMouseEnter={() => setCurrentThumbnail(index)}
                      onMouseLeave={() => setCurrentThumbnail(null)}
                      className="mt1"
                    >
                      {index + 1} {proj.title}
                    </p>
                  </a>
                </li>
              )
          })}
        </ul>
        <aside className="projects__thumbnail show--lg col c5">
          {projects.map((proj, index) => (
            <img
              key={proj._id || proj._key}
              className={classNames("projects__list-thumbnail x", {
                active: index === currentThumbnail,
              })}
              src={`${proj.thumbnail}?w=800&auto=format`}
              alt={proj.title}
            />
          ))}
        </aside>
      </section>
    </Fragment>
  )
}
export default ProjectList
