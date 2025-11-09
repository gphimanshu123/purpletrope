import * as React from 'react';
import { cn } from '../../lib/utils';
import styles from './progress.module.css';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: number;
	max?: number;
	indicatorClassName?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	({ className, indicatorClassName, value = 0, max = 100, ...props }, ref) => {
		const clampedMax = Number.isFinite(max) && max && max > 0 ? max : 100;
		const safeValue = Number.isFinite(value) ? value ?? 0 : 0;
		const clampedValue = Math.min(Math.max(safeValue, 0), clampedMax);
		const percentage = (clampedValue / clampedMax) * 100;

		return (
			<div
				ref={ref}
				role="progressbar"
				className={cn(styles.progressRoot, className)}
				aria-valuemin={0}
				aria-valuemax={clampedMax}
				aria-valuenow={Number.isNaN(clampedValue) ? undefined : clampedValue}
				{...props}
			>
				<div
					className={cn(styles.progressIndicator, indicatorClassName)}
					style={{ width: `${percentage}%` }}
					aria-hidden="true"
				/>
			</div>
		);
	},
);
Progress.displayName = 'Progress';


