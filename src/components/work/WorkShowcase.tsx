import * as React from 'react';
import * as React from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import {
	Card,
	CardContent,
	CardDescription,
	CardEyebrow,
	CardHeader,
	CardMedia,
	CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { urlFor } from '../../lib/sanityImage';
import styles from './WorkShowcase.module.css';

export type WorkImage = (SanityImageSource & {
	_key?: string;
	alt?: string;
	url?: string;
}) | null;

export interface WorkProject {
	id: string;
	title: string;
	role?: string;
	description?: string;
	period?: string;
	cmsOptions?: string[];
	tags?: string[];
	images?: WorkImage[];
}

export interface WorkShowcaseProps {
	projects?: WorkProject[];
}

const defaultProjects: WorkProject[] = [
	{
		id: 'default-purple-trope-archive',
		title: 'Purple Trope Archive',
		role: 'Creative Director & Illustrator',
		description:
			'A series of limited-run journals, calendars, and eco-conscious gifts inspired by folk narratives and doodle art.',
		period: '2022 — Present',
		cmsOptions: ['Product Design', 'Illustration', 'Packaging', 'Shop Launch'],
		images: [],
	},
	{
		id: 'default-akorika-exhibition',
		title: 'Akorika Exhibition',
		role: 'Lead Artist & Experience Designer',
		description:
			'Immersive exhibition translating Northeast Indian folklore into motion graphics, large-scale murals, and tactile artifacts.',
		period: '2023',
		cmsOptions: ['Exhibition', 'Spatial Design', 'Motion', 'Storytelling'],
		images: [],
	},
	{
		id: 'default-sustainable-futures',
		title: 'Sustainable Futures Summit',
		role: 'Visual Identity & Campaign Lead',
		description:
			'Developed the visual language and campaign assets for an international summit on climate-positive craft practices.',
		period: '2024',
		cmsOptions: ['Branding', 'Campaign', 'Illustration', 'Strategy'],
		images: [],
	},
	{
		id: 'default-city-stories',
		title: 'City Stories',
		role: 'Art Director & Narrative Consultant',
		description:
			'Collaborated with urban researchers to co-create a publication that maps lived experiences through playful illustrated timelines.',
		period: '2021',
		cmsOptions: ['Editorial', 'Research', 'Illustration'],
		images: [],
	},
];

const getImageUrl = (image: WorkImage | undefined, width = 900) => {
	if (!image) {
		return undefined;
	}

	if (typeof image === 'string') {
		return image;
	}

	const builder = urlFor(image);

	if (builder) {
		return builder.width(width).quality(85).fit('max').url();
	}

	if (image && typeof (image as { url?: string }).url === 'string') {
		return (image as { url?: string }).url;
	}

	return undefined;
};

type LightboxState = {
	projectIndex: number;
	imageIndex: number;
} | null;

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ projects }) => {
	const resolvedProjects = React.useMemo(
		() => (projects && projects.length > 0 ? projects : defaultProjects),
		[projects],
	);

	const [lightboxState, setLightboxState] = React.useState<LightboxState>(null);

	const openLightbox = React.useCallback((projectIndex: number, imageIndex: number) => {
		setLightboxState({ projectIndex, imageIndex });
	}, []);

	const closeLightbox = React.useCallback(() => {
		setLightboxState(null);
	}, []);

	const goToNextImage = React.useCallback(() => {
		setLightboxState((previous) => {
			if (!previous) {
				return previous;
			}

			const images =
				resolvedProjects[previous.projectIndex]?.images?.filter(Boolean) ?? [];

			if (images.length === 0) {
				return null;
			}

			const nextIndex = (previous.imageIndex + 1) % images.length;

			return { ...previous, imageIndex: nextIndex };
		});
	}, [resolvedProjects]);

	const goToPreviousImage = React.useCallback(() => {
		setLightboxState((previous) => {
			if (!previous) {
				return previous;
			}

			const images =
				resolvedProjects[previous.projectIndex]?.images?.filter(Boolean) ?? [];

			if (images.length === 0) {
				return null;
			}

			const nextIndex = (previous.imageIndex - 1 + images.length) % images.length;

			return { ...previous, imageIndex: nextIndex };
		});
	}, [resolvedProjects]);

	React.useEffect(() => {
		if (!lightboxState) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setLightboxState(null);
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				goToNextImage();
			} else if (event.key === 'ArrowLeft') {
				event.preventDefault();
				goToPreviousImage();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [goToNextImage, goToPreviousImage, lightboxState]);

	const activeProject =
		lightboxState && resolvedProjects[lightboxState.projectIndex]
			? resolvedProjects[lightboxState.projectIndex]
			: null;
	const activeImages = activeProject?.images?.filter(Boolean) ?? [];
	const activeImage =
		lightboxState && activeImages.length > 0
			? activeImages[lightboxState.imageIndex % activeImages.length]
			: null;
	const activeImageUrl = React.useMemo(
		() => getImageUrl(activeImage ?? undefined, 1600),
		[activeImage],
	);

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<span className={styles.eyebrow}>Selected work</span>
				<h1 className={styles.title}>Creative collaborations & commissions</h1>
				<p className={styles.lede}>
					From bespoke brand stories to immersive installations, these partnerships highlight
					the range of multidisciplinary projects crafted with Purple Trope.
				</p>
			</div>

			<div className={styles.grid}>
				{resolvedProjects.map((project, projectIndex) => {
					const badges =
						project.cmsOptions?.filter((tag): tag is string => Boolean(tag && tag.trim())) ??
						project.tags?.filter((tag): tag is string => Boolean(tag && tag.trim())) ??
						[];
					const images = project.images?.filter(Boolean) ?? [];
					const primaryImageUrl = getImageUrl(images[0], 1200);
					const secondaryImages = images.slice(1);

					return (
						<article key={project.id ?? project.title} className={styles.item}>
							<Card className={styles.card}>
								{primaryImageUrl && (
									<CardMedia className={styles.media}>
										<button
											type="button"
											className={styles.mediaButton}
											onClick={() => openLightbox(projectIndex, 0)}
										>
											<img
												src={primaryImageUrl}
												alt={images[0]?.alt ?? project.title}
												className={styles.mediaImage}
												loading="lazy"
											/>
											{images.length > 1 && (
												<span className={styles.mediaCount}>
													{images.length} photos
												</span>
											)}
											<span className={styles.srOnly}>Open gallery</span>
										</button>
										{secondaryImages.length > 0 && (
											<div className={styles.thumbnailRail}>
												{secondaryImages.map((image, imageIndex) => {
													const url = getImageUrl(image, 320);

													if (!url) {
														return null;
													}

													return (
														<button
															type="button"
															className={styles.thumbnailButton}
															onClick={() =>
																openLightbox(projectIndex, imageIndex + 1)
															}
															key={image?._key ?? `${project.id}-thumb-${imageIndex}`}
														>
															<img
																src={url}
																alt={
																	image?.alt ??
																	`${project.title} alternate view ${imageIndex + 1}`
																}
																className={styles.thumbnailImage}
																loading="lazy"
															/>
															<span className={styles.srOnly}>
																View image {imageIndex + 2} in gallery
															</span>
														</button>
													);
												})}
											</div>
										)}
									</CardMedia>
								)}

								<CardHeader>
									{project.period && <CardEyebrow>{project.period}</CardEyebrow>}
									<CardTitle>{project.title}</CardTitle>
									{project.description && (
										<CardDescription>{project.description}</CardDescription>
									)}
								</CardHeader>

								<CardContent className={styles.cardContent}>
									{project.role && (
										<dl className={styles.meta}>
											<dt className={styles.metaLabel}>Role</dt>
											<dd className={styles.metaValue}>{project.role}</dd>
										</dl>
									)}

									{badges.length > 0 && (
										<div className={styles.badgeGroup}>
											{badges.map((tag) => (
												<Badge key={`${project.id}-tag-${tag}`}>{tag}</Badge>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						</article>
					);
				})}
			</div>

			{lightboxState && activeProject && activeImageUrl && (
				<div className={styles.lightboxOverlay} role="dialog" aria-modal="true">
					<button
						type="button"
						className={styles.lightboxClose}
						onClick={closeLightbox}
						aria-label="Close gallery"
					>
						<span aria-hidden="true">&times;</span>
					</button>

					<div className={styles.lightboxInner}>
						<button
							type="button"
							className={styles.lightboxNavButton}
							onClick={goToPreviousImage}
							aria-label="View previous image"
							disabled={activeImages.length <= 1}
						>
							<span aria-hidden="true">‹</span>
						</button>

						<figure className={styles.lightboxFigure}>
							<img
								src={activeImageUrl}
								alt={activeImage?.alt ?? activeProject.title}
								className={styles.lightboxImage}
							/>
							<figcaption className={styles.lightboxCaption}>
								{activeImage?.alt ?? activeProject.title}
							</figcaption>
						</figure>

						<button
							type="button"
							className={styles.lightboxNavButton}
							onClick={goToNextImage}
							aria-label="View next image"
							disabled={activeImages.length <= 1}
						>
							<span aria-hidden="true">›</span>
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default WorkShowcase;
export type { WorkProject as WorkShowcaseProject };


