import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default function Template({
  data
}) {
  const { markdownRemark: post } = data;
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: post.html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: {
      path: { eq: $path }
    }) {
      html
      frontmatter {
        title
        date
        thumbnail
        path
      }
    }
  }
`;