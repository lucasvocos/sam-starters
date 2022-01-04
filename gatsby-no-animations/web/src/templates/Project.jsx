import React, { Fragment, useState, useEffect } from "react"
import SEO from "../components/SEO"
import BlockContent from "@sanity/block-content-to-react"
import cx from "classnames"
import isEmpty from "lodash/isEmpty"
import { useSwipeable } from "react-swipeable"

const Project = ({ pageContext }) => {
  const { content = [], seo } = pageContext

  const [currentSlide, setCurrentSlide] = useState(0)

  const slideBack = () => {
    const nextIndex = currentSlide - 1

    if (nextIndex < 0) {
      setCurrentSlide(content.length - 1)
    } else {
      setCurrentSlide(nextIndex)
    }
  }

  const slideNext = () => {
    const nextIndex = currentSlide + 1

    if (nextIndex > content.length - 1) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(nextIndex)
    }
  }

  const keyboardEvent = e => {
    const { key } = e

    if (key === "ArrowRight") {
      slideNext()
    } else if (key === "ArrowLeft") {
      slideBack()
    } else {
      return
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      slideNext()
    },
    onSwipedLeft: () => {
      slideBack()
    },
  })

  useEffect(() => {
    window.addEventListener("keydown", keyboardEvent)
    return () => {
      window.removeEventListener("keydown", keyboardEvent)
    }
  }, [currentSlide])

  return (
    <Fragment>
      <SEO {...seo} />
      <section {...swipeHandlers} className="carousel pr">
        <button
          title="Go Back"
          onClick={slideBack}
          className="carousel__button carousel__button--left pa"
        />
        {content.map((slide, index) => (
          <div
            className={cx("slide", {
              active: index === currentSlide,
            })}
            key={slide._key}
          >
            <picture>
              <source
                srcSet={`${slide.image.url}?w=2000&auto=format`}
                media="(min-width: 1600px)"
              />
              <source
                srcSet={`${slide.image.url}?w=1800&auto=format`}
                media="(min-width: 1400px)"
              />
              <source
                srcSet={`${slide.image.url}?w=1400&auto=format`}
                media="(min-width: 1000px)"
              />
              <source
                srcSet={`${slide.image.url}?w=1000&auto=format`}
                media="(min-width: 600px)"
              />
              <img
                className="carousel__image mxa x pa"
                src={`${slide.image.url}?w=600&auto=format`}
                alt={
                  slide?.title[0]?.children[0]?.text ||
                  "Dan McMahon Photography"
                }
              />
            </picture>
            {!isEmpty(slide.title) && (
              <div
                className={cx("carousel__caption pf", {
                  active: index === currentSlide,
                })}
              >
                <BlockContent blocks={slide.title} />
              </div>
            )}
          </div>
        ))}
        <button
          title="Go Back"
          onClick={slideNext}
          className="carousel__button carousel__button--right pa"
        />
      </section>
    </Fragment>
  )
}
export default Project
