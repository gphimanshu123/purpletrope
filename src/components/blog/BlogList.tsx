import * as React from 'react';
import BlogCard from './BlogCard';
import type { BlogPostSummary } from '../../types/blog';
import styles from './BlogList.module.css';

export interface BlogListProps {
	posts: BlogPostSummary[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => (
	<section className={styles.wrapper}>
		<header className={styles.header}>
			<h1 className={styles.title}>Stories from the studio</h1>
			<p className={styles.subtitle}>
				Inspiration, behind-the-scenes process, and the lessons we discover while
				building vibrant visual worlds.
			</p>
		</header>

		{posts.length ? (
			<div className={styles.grid}>
				{posts.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		) : (
			<div className={styles.emptyState}>Stay tuned — the first story arrives soon.</div>
		)}
	</section>
);

export default BlogList;

