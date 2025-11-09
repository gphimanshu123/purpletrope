import * as React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import styles from './PortableTextRenderer.module.css';
import { urlFor } from '../../lib/sanityImage';

export interface PortableTextRendererProps {
	value: PortableTextBlock[];
}

const components: PortableTextComponents = {
	block: {
		h2: ({ children }) => (
			<h2 className={styles.heading2}>{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className={styles.heading3}>{children}</h3>
		),
		normal: ({ children }) => (
			<p className={styles.paragraph}>{children}</p>
		),
		blockquote: ({ children }) => (
			<blockquote className={styles.blockquote}>{children}</blockquote>
		),
	},
	marks: {
		strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
		link: ({ value, children }) => {
			const href = (value as { href?: string }).href ?? '#';
			const isExternal = href.startsWith('http');
			return (
				<a
					href={href}
					className={styles.link}
					target={isExternal ? '_blank' : undefined}
					rel={isExternal ? 'noopener noreferrer' : undefined}
				>
					{children}
				</a>
			);
		},
	},
	list: {
		bullet: ({ children }) => (
			<ul className={styles.unorderedList}>{children}</ul>
		),
		number: ({ children }) => (
			<ol className={styles.orderedList}>{children}</ol>
		),
	},
	listItem: {
		checkmarks: ({ children }) => <li>✅ {children}</li>,
		bullet: ({ children }) => <li>{children}</li>,
		number: ({ children }) => <li>{children}</li>,
	},
	types: {
		image: ({ value }) => {
			const imageUrl = urlFor(value)?.width(1280).quality(85).url();
			if (!imageUrl) {
				return null;
			}

			const altText =
				(value as { alt?: string }).alt ??
				(value as { caption?: string }).caption ??
				'';

			return (
				<figure className={styles.figure}>
					<img src={imageUrl} alt={altText} loading="lazy" />
					{(value as { caption?: string }).caption ? (
						<figcaption className={styles.caption}>
							{(value as { caption?: string }).caption}
						</figcaption>
					) : null}
				</figure>
			);
		},
	},
};

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ value }) => (
	<div className={styles.body}>
		<PortableText value={value} components={components} />
	</div>
);

export default PortableTextRenderer;

