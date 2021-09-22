import { graphql } from 'gatsby';

export const gatImage = graphql`
  fragment gatImage on File {
    childImageSharp {
      fluid(maxHeight: 1400) {
        ...GatsbyImageSharpFluid
        src
      }
    }
  }
`;

export const modernGatImage = graphql`
  fragment modernGatImage on File {
    childImageSharp {
      thumb: gatsbyImageData(
        width: 270
        height: 270
        placeholder: BLURRED
        transformOptions: { cropFocus: CENTER }
      )
      full: gatsbyImageData(layout: FULL_WIDTH)
    }
  }
`;
