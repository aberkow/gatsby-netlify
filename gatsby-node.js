const path = require('path');

process.on('unhandledRejection', (reason, promise) => { console.log(`Reason -> ${reason}`);});

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  // const blogTemplate = path.resolve(`src/templates/blog-post.js`);
  // const aboutTemplate = path.resolve('src/templates/about-page.js');

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
      // const template = `${node.frontmatter.layout}Template`
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/${String(node.frontmatter.layout)}.js`),
        context: {}
      });
    });
  })
}