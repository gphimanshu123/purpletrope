import * as React from 'react';
import {
	Card,
	CardContent,
	CardEyebrow,
	CardHeader,
	CardTitle,
	CardDescription,
} from '../ui/card';
import { Badge } from '../ui/badge';
import styles from './WorkShowcase.module.css';

export interface WorkProject {
	title: string;
	role: string;
	description: string;
	period: string;
	tags: string[];
	link?: string;
}

export interface WorkShowcaseProps {
	projects?: WorkProject[];
}

const defaultProjects: WorkProject[] = [
	{
		title: 'Purple Trope Archive',
		role: 'Creative Director & Illustrator',
		description:
			'A series of limited-run journals, calendars, and eco-conscious gifts inspired by folk narratives and doodle art.',
		period: '2022 — Present',
		tags: ['Product Design', 'Illustration', 'Packaging', 'Shop Launch'],
		link: 'https://purpletrope.com',
	},
	{
		title: 'Akorika Exhibition',
		role: 'Lead Artist & Experience Designer',
		description:
			'Immersive exhibition translating Northeast Indian folklore into motion graphics, large-scale murals, and tactile artifacts.',
		period: '2023',
		tags: ['Exhibition', 'Spatial Design', 'Motion', 'Storytelling'],
	},
	{
		title: 'Sustainable Futures Summit',
		role: 'Visual Identity & Campaign Lead',
		description:
			'Developed the visual language and campaign assets for an international summit on climate-positive craft practices.',
		period: '2024',
		tags: ['Branding', 'Campaign', 'Illustration', 'Strategy'],
		link: 'https://sustainablefuturessummit.com',
	},
	{
		title: 'City Stories',
		role: 'Art Director & Narrative Consultant',
		description:
			'Collaborated with urban researchers to co-create a publication that maps lived experiences through playful illustrated timelines.',
		period: '2021',
		tags: ['Editorial', 'Research', 'Illustration'],
	},
];

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ projects = defaultProjects }) => (
	<section className={styles.section}>
		<div className={styles.header}>
			<span className={styles.eyebrow}>Selected work</span>
			<h1 className={styles.title}>Creative collaborations & commissions</h1>
			<p className={styles.lede}>
				From bespoke brand stories to immersive installations, these partnerships highlight the
				range of multidisciplinary projects crafted with Purple Trope.
			</p>
		</div>

		<div className={styles.grid}>
			{projects.map((project) => (
				<article key={project.title} className={styles.item}>
					<Card className={styles.card}>
						<CardHeader>
							<CardEyebrow>{project.period}</CardEyebrow>
							<CardTitle>{project.title}</CardTitle>
							<CardDescription>{project.description}</CardDescription>
						</CardHeader>

						<CardContent className={styles.cardContent}>
							<dl className={styles.meta}>
								<dt className={styles.metaLabel}>Role</dt>
								<dd className={styles.metaValue}>{project.role}</dd>
							</dl>

							{project.tags.length > 0 && (
								<div className={styles.badgeGroup}>
									{project.tags.map((tag) => (
										<Badge key={tag}>{tag}</Badge>
									))}
								</div>
							)}

							{project.link && (
								<a
									className={styles.link}
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									View project
								</a>
							)}
						</CardContent>
					</Card>
				</article>
			))}
		</div>
	</section>
);

export default WorkShowcase;


