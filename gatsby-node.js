const path = require('path');

process.on('unhandledRejection', (reason, promise) => { console.log(`Reason -> ${reason}`);});

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

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
      console.log(`result of error -> ${result}`);
      return Promise.reject(result.errors);
    }
    console.log(result, 'result');
    const posts = result.data.allMarkdownRemark.edges;
    console.log(posts, 'posts');
    posts
      .forEach(({ node }) => {
      console.log(node, 'node');
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}
      });
    });
  })
}