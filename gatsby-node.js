const path = require('path');

process.on('unhandledRejection', (reason, promise) => { console.log(`Reason -> ${reason}`);});

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const aboutPageTemplate = path.resolve('src/templates/about-page.js');

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            layout
            date
            title
            thumbnail
            path
          }
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    posts
      .forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}
      });
      createPage({
        path: '/about',
        component: aboutPageTemplate,
        context: {}
      })
    });
  })
}