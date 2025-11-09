import * as React from 'react';
import { Badge } from '../ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardEyebrow,
	CardFooter,
	CardHeader,
	CardMedia,
	CardTitle,
} from '../ui/card';
import styles from './BlogCard.module.css';
import type { BlogPostSummary } from '../../types/blog';
import { urlFor } from '../../lib/sanityImage';
import { cn } from '../../lib/utils';

export interface BlogCardProps {
	post: BlogPostSummary;
}

const formatDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(new Date(value));

const getInitials = (value: string) =>
	value
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const heroImage = urlFor(post.heroImage)?.width(960).height(640).quality(80).url();
	const authorAvatar = urlFor(post.author.avatar)?.width(120).height(120).quality(80).url();

	return (
		<a href={`/blog/${post.slug}`} className={styles.cardLink}>
			<Card>
				<CardMedia>
					{heroImage ? (
						<img
							src={heroImage}
							alt={post.title}
							className={styles.mediaImage}
							loading="lazy"
						/>
					) : (
						<div className={styles.mediaFallback}>{post.title}</div>
					)}
				</CardMedia>
				<CardHeader>
					<CardEyebrow>{formatDate(post.publishedAt)}</CardEyebrow>
					<CardTitle>{post.title}</CardTitle>
					{post.excerpt ? (
						<CardDescription>{post.excerpt}</CardDescription>
					) : null}
				</CardHeader>
				<CardContent>
					{post.tags?.length ? (
						<div className={styles.tagGroup}>
							{post.tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
					) : null}
				</CardContent>
				<CardFooter>
					<div className={styles.author}>
						<div className={styles.avatar}>
							{authorAvatar ? (
								<img
									src={authorAvatar}
									alt={post.author.name}
									className={styles.avatarImage}
									loading="lazy"
								/>
							) : (
								getInitials(post.author.name)
							)}
						</div>
						<span>{post.author.name}</span>
					</div>
					<span className={cn(styles.readMore)}>Read more →</span>
				</CardFooter>
			</Card>
		</a>
	);
};

export default BlogCard;

