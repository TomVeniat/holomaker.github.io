import { CSSObject } from '@emotion/react';
import { Link } from 'gatsby';
import './PostGridFlat.scss';
import { BgImage } from 'gbimage-bridge';
import { getImage } from 'gatsby-plugin-image';

const gridCSS: CSSObject = {
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  maxWidth: '90rem',
  // height: 30em;
  width: '100%',

  padding: 0,
};

interface OwnProps {
  posts: any;
}
export default function PostGridFlat({ posts }: OwnProps) {
  return (
    <div css={gridCSS}>
      {posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          const image = post.frontmatter.image.childImageSharp;
          const gatsbyImage = getImage(image);
          return (
            <Link
              className={'post'}
              to={`${post.frontmatter.path}#content`}
              key={post.id}
            >
              <div className={'postHead'}>
                <span className="postTitle">{post.frontmatter.title}</span>
                <span className="postSubtitle">
                  {post.frontmatter.subtitle}{' '}
                </span>
              </div>
              <BgImage image={gatsbyImage} className={'postPicture'} />
            </Link>
          );
        })}
    </div>
  );
}
