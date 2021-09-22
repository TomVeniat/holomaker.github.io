import React from 'react';
import { Link } from 'gatsby';
import './PostGrid.scss';

export default class PostGrid extends React.Component {
  render() {
    const posts = this.props.posts;

    return (
      <div className="postGrid">
        {posts
          .filter((post) => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <Link
                className="post"
                to={`${post.frontmatter.path}#content`}
                key={post.id}
              >
                <div
                  className="header"
                  style={{
                    backgroundImage:
                      'url(' +
                      post.frontmatter.image.childImageSharp.fixed.src +
                      ')',
                  }}
                >
                  <div className="inside">
                    <span className="title">{post.frontmatter.title}</span>
                    <span className="tag">{post.frontmatter.subtitle}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    );
  }
}
