import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default function AboutPage({
  data
}) {
  const { markdownRemark: post } = data;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html:post.html }} />
    </div>
  )
}

export const aboutQuery = graphql`
  query AboutQuery {
    markdownRemark {
      html
      frontmatter {
        title
        thumbnail
      }
    }
  }
`;