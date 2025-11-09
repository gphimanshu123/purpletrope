import * as React from 'react';
import { Progress } from '../ui/progress';
import styles from './ScrollProgressBar.module.css';

const ScrollProgressBar: React.FC = () => {
	const [progress, setProgress] = React.useState(0);
	const frameRef = React.useRef<number>();

	React.useEffect(() => {
		const calculateProgress = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			const totalScrollable = scrollHeight - clientHeight;

			if (totalScrollable <= 0) {
				setProgress(0);
				return;
			}

			const nextValue = (scrollTop / totalScrollable) * 100;
			setProgress(Math.min(Math.max(nextValue, 0), 100));
		};

		const handleScroll = () => {
			if (frameRef.current) {
				return;
			}

			frameRef.current = window.requestAnimationFrame(() => {
				frameRef.current = undefined;
				calculateProgress();
			});
		};

		const handleResize = () => {
			calculateProgress();
		};

		calculateProgress();

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			if (frameRef.current) {
				window.cancelAnimationFrame(frameRef.current);
			}

			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className={styles.container} aria-hidden="true">
			<Progress
				value={progress}
				className={styles.progress}
				indicatorClassName={styles.indicator}
			/>
		</div>
	);
};

export default ScrollProgressBar;


