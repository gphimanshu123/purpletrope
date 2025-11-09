import * as React from 'react';
import { cn } from '../../lib/utils';
import styles from './badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, ...props }, ref) => (
		<span ref={ref} className={cn(styles.badge, className)} {...props} />
	),
);
Badge.displayName = 'Badge';

