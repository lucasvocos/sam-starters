import React, { Component } from "react"
import sanity from "@sanity/client"
import * as queries from "../api/queries"
import queryString from "query-string"

// Routes
import Home from "./Home"
import Project from "./Project"

const client = sanity({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.GASTBY_SANITY_PREVIEW_API_TOKEN,
  useCdn: false,
  withCredentials: true,
})

const INITIAL_STATE = {
  draft: null,
  queryResult: null,
}

export default class Preview extends Component {
  constructor() {
    super()
    this.state = { ...INITIAL_STATE }
  }

  componentDidMount = () => {
    const params = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    })

    if (!params.documentId) return this.throwError()

    client
      .fetch(queries.draftDocument(params.documentId))
      .then(draft => {
        this.setState({ draft })

        switch (draft._type) {
          case "homepage":
            return client
              .fetch(queries.draftHomepage(draft._id))
              .then(homepage => {
                this.setState({
                  queryResult: homepage,
                })
              })
              .catch(error => {
                this.throwError()
              })
          case "project":
            return client
              .fetch(queries.draftProject(draft._id))
              .then(project => {
                this.setState({ queryResult: project })
              })
              .catch(error => {
                this.throwError()
              })
        }
      })
      .catch(error => {
        this.throwError()
      })
  }

  throwError = () => {
    alert("Uh oh. It looks like the Preview URL is broken.")
  }

  render() {
    const { queryResult, draft } = this.state
    const { pageContext, pathContext, ...props } = this.props

    if (!queryResult || !draft) {
      return <div className="pt10 pb10 tc">Loading Preview…</div>
    }

    switch (draft._type) {
      case "homepage":
        return (
          <Home
            {...props}
            pageContext={{
              ...pageContext,
              ...queryResult,
            }}
            pathContext={{
              ...pathContext,
              ...queryResult,
            }}
          />
        )
      case "project":
        return (
          <Project
            {...props}
            pageContext={{
              ...pageContext,
              ...queryResult,
            }}
            pathContext={{
              ...pathContext,
              ...queryResult,
            }}
          />
        )
    }
  }
}
