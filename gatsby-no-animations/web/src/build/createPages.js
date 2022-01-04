const queries = require("../api/queries")
const sanity = require("../api/sanity")

//
// === Get Data ===
//

module.exports.getAllPageData = () => {
  // Fetch all data needs
  const homeQuery = sanity.fetch(queries.homepage)
  const infoQuery = sanity.fetch(queries.informationpage)
  const projectsQuery = sanity.fetch(queries.projects)

  // Wait for all data needs
  return Promise.all([homeQuery, infoQuery, projectsQuery])
}

//
// === Create All Pages ===
//

module.exports.createAllPages = (promiseResults, actions, resolve, reject) => {
  const [homepage, informationpage, projects = []] = promiseResults

  //
  // === Create pages ===
  //

  try {
    actions.createPage({
      path: "/",
      component: require.resolve("../templates/Home.jsx"),
      context: {
        ...homepage,
      },
    })

    actions.createPage({
      path: "/information",
      component: require.resolve("../templates/Information.jsx"),
      context: {
        ...informationpage,
      },
    })

    actions.createPage({
      path: "/projects",
      component: require.resolve("../templates/ProjectsList.jsx"),
      context: {
        projects,
      },
    })

    // 404
    actions.createPage({
      path: "/404",
      component: require.resolve("../templates/404.jsx"),
    })

    // Preview
    actions.createPage({
      path: "/preview",
      component: require.resolve("../templates/Preview.jsx"),
      context: {},
    })

    //
    // === Projects ===
    //

    projects.forEach(project => {
      if (!project.draft) {
        actions.createPage({
          path: `/projects/${project.url}`,
          component: require.resolve("../templates/Project.jsx"),
          context: {
            ...project,
          },
        })
      }
    })
  } catch (error) {
    reject(error)
    return
  }

  resolve()
}
