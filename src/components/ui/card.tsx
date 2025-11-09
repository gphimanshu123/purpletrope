import * as React from 'react';
import { cn } from '../../lib/utils';
import styles from './card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn(styles.card, className)} {...props} />
	),
);
Card.displayName = 'Card';

export const CardMedia = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn(styles.media, className)} {...props} />
	),
);
CardMedia.displayName = 'CardMedia';

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn(styles.header, className)} {...props} />
	),
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn(styles.content, className)} {...props} />
	),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, ...props }, ref) => (
		<footer ref={ref} className={cn(styles.footer, className)} {...props} />
	),
);
CardFooter.displayName = 'CardFooter';

export interface CardTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ className, ...props }, ref) => (
		<h3 ref={ref} className={cn(styles.title, className)} {...props} />
	),
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	CardDescriptionProps
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn(styles.description, className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export interface CardEyebrowProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardEyebrow = React.forwardRef<
	HTMLParagraphElement,
	CardEyebrowProps
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn(styles.eyebrow, className)} {...props} />
));
CardEyebrow.displayName = 'CardEyebrow';

