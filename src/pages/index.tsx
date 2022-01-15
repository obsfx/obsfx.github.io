import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage = ({ data }) => {
  console.log(data.allMarkdownRemark)
  return (
    <Layout>
      <Seo title="Ömercan Balandı" />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.edges[0].node.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          html
        }
      }
    }
  }
`

export default IndexPage
