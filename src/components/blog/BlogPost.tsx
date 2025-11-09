import * as React from "react";
import { Badge } from "../ui/badge";
import styles from "./BlogPost.module.css";
import type { BlogPost } from "../../types/blog";
import PortableTextRenderer from "./PortableTextRenderer";
import { urlFor } from "../../lib/sanityImage";

export interface BlogPostProps {
  post: BlogPost;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));

const getReadingTime = (blocks: BlogPost["body"]) => {
  const words = blocks.reduce((count, block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) {
      return count;
    }

    const blockWords = block.children.reduce((childCount, child) => {
      if (typeof child.text !== "string") {
        return childCount;
      }

      return childCount + child.text.trim().split(/\s+/).filter(Boolean).length;
    }, 0);

    return count + blockWords;
  }, 0);

  return Math.max(1, Math.round(words / 200));
};

const getInitials = (value: string) =>
  value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const BlogPostView: React.FC<BlogPostProps> = ({ post }) => {
  const heroImage = urlFor(post.heroImage)
    ?.width(1600)
    .height(900)
    .quality(85)
    .url();
  const authorAvatar = urlFor(post.author.avatar)
    ?.width(160)
    .height(160)
    .quality(80)
    .url();
  const readingTime = getReadingTime(post.body);

  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <a href="/blog" className={styles.backLink}>
          ← Back to all posts
        </a>
        {heroImage ? (
          <div className={styles.hero}>
            <img src={heroImage} alt={post.title} loading="eager" />
          </div>
        ) : null}
        <header className={styles.heading}>
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt ? (
            <p className={styles.description}>{post.excerpt}</p>
          ) : null}
          <div className={styles.metaGroup}>
            <div className={styles.meta}>
              <span>{formatDate(post.publishedAt)}</span>
              <span className={styles.divider} />
              <span>{readingTime} min read</span>
            </div>
            <div className={styles.author}>
              <span className={styles.authorAvatar}>
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={post.author.name}
                    loading="lazy"
                  />
                ) : (
                  getInitials(post.author.name)
                )}
              </span>
              <span>{post.author.name}</span>
            </div>
          </div>
          {post.tags?.length ? (
            <div className={styles.tagGroup}>
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </header>

        <section className={styles.body}>
          <PortableTextRenderer value={post.body} />
        </section>
      </div>
    </article>
  );
};

export default BlogPostView;
