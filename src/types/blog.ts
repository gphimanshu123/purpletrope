import type { PortableTextBlock } from '@portabletext/types';

export interface SanityReference {
	_type: 'reference';
	_ref: string;
}

export interface SanityImage {
	_type: 'image';
	asset: SanityReference;
	alt?: string;
	caption?: string;
}

export interface BlogAuthor {
	id: string;
	name: string;
	slug?: string;
	bio?: PortableTextBlock[];
	avatar?: SanityImage;
}

export interface BlogPostBase {
	id: string;
	title: string;
	slug: string;
	excerpt?: string;
	publishedAt: string;
	tags?: string[];
	heroImage?: SanityImage;
	mainImage?: SanityImage;
	coverImage?: SanityImage;
	author: BlogAuthor;
}

export interface BlogPost extends BlogPostBase {
	body: PortableTextBlock[];
}

export type BlogPostSummary = BlogPostBase;

