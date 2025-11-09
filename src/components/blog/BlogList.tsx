import * as React from "react";
import BlogCard from "./BlogCard";
import type { BlogPostSummary } from "../../types/blog";
import styles from "./BlogList.module.css";
import type { PageHeaderContent } from "../../types/pageHeader";

export interface BlogListProps {
  posts: BlogPostSummary[];
  header?: Pick<PageHeaderContent, "label" | "title" | "description"> | null;
}

const defaultHeader = {
  label: undefined,
  title: "Stories from the studio",
  description:
    "Inspiration, behind-the-scenes process, and the lessons we discover while building vibrant visual worlds.",
};

const BlogList: React.FC<BlogListProps> = ({ posts, header }) => {
  const resolvedHeader = React.useMemo(() => {
    if (!header) {
      return defaultHeader;
    }

    const { label, title, description } = header;

    return {
      label: label ?? undefined,
      title: title ?? defaultHeader.title,
      description: description ?? defaultHeader.description,
    };
  }, [header]);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        {resolvedHeader.label && (
          <span className={styles.eyebrow}>{resolvedHeader.label}</span>
        )}
        <h1 className={styles.title}>{resolvedHeader.title}</h1>
        <p className={styles.subtitle}>{resolvedHeader.description}</p>
      </header>

      {posts.length ? (
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          Stay tuned — the first story arrives soon.
        </div>
      )}
    </section>
  );
};

export default BlogList;
