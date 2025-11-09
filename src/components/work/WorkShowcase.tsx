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
import type { PageHeaderContent } from '../../types/pageHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';

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
	header?: Pick<PageHeaderContent, 'label' | 'title' | 'description'> | null;
}

const defaultHeader: Required<Pick<PageHeaderContent, 'title' | 'description'>> &
	Pick<PageHeaderContent, 'label'> = {
	label: 'Selected work',
	title: 'Creative collaborations & commissions',
	description:
		'From bespoke brand stories to immersive installations, these partnerships highlight the range of multidisciplinary projects crafted with Purple Trope.',
};

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

type GallerySlide = {
	key: string;
	url: string;
	alt: string;
};

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ projects, header }) => {
	const resolvedProjects = React.useMemo(
		() => (projects && projects.length > 0 ? projects : defaultProjects),
		[projects],
	);
	const resolvedHeader = React.useMemo(() => {
		if (!header) {
			return defaultHeader;
		}

		return {
			label: header.label ?? defaultHeader.label,
			title: header.title ?? defaultHeader.title,
			description: header.description ?? defaultHeader.description,
		};
	}, [header]);

	const [lightboxState, setLightboxState] = React.useState<LightboxState>(null);
	const swiperRef = React.useRef<SwiperInstance | null>(null);

	const openLightbox = React.useCallback((projectIndex: number, imageIndex: number) => {
		setLightboxState({ projectIndex, imageIndex });
	}, []);

	const closeLightbox = React.useCallback(() => {
		setLightboxState(null);
	}, []);

	const goToNextImage = React.useCallback(() => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();

			return;
		}

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
		if (swiperRef.current) {
			swiperRef.current.slidePrev();

			return;
		}

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

	React.useEffect(() => {
		if (!lightboxState) {
			return;
		}

		const images =
			resolvedProjects[lightboxState.projectIndex]?.images?.filter(Boolean) ?? [];

		if (images.length === 0) {
			setLightboxState(null);
			return;
		}

		if (lightboxState.imageIndex >= images.length) {
			setLightboxState({
				projectIndex: lightboxState.projectIndex,
				imageIndex: 0,
			});
		}
	}, [lightboxState, resolvedProjects]);

	const activeProject =
		lightboxState && resolvedProjects[lightboxState.projectIndex]
			? resolvedProjects[lightboxState.projectIndex]
			: null;
	const activeImages = activeProject?.images?.filter(Boolean) ?? [];
	const gallerySlides = React.useMemo<GallerySlide[]>(() => {
		if (activeImages.length === 0) {
			return [];
		}

		return activeImages
			.map((image, index) => {
				const url = getImageUrl(image ?? undefined, 1600);

				if (!url) {
					return null;
				}

				const isObjectImage = typeof image === 'object' && image !== null;
				const alt =
					isObjectImage && 'alt' in image && typeof image.alt === 'string' && image.alt.trim()
						? image.alt
						: activeProject?.title ?? 'Project image';
				const key =
					isObjectImage && '_key' in image && typeof image._key === 'string' && image._key.trim()
						? image._key
						: `${activeProject?.id ?? 'project'}-${index}-${url}`;

				return {
					key,
					url,
					alt,
				};
			})
			.filter((slide): slide is GallerySlide => Boolean(slide));
	}, [activeImages, activeProject?.id, activeProject?.title]);
	const currentSlideIndex =
		lightboxState && gallerySlides.length > 0
			? Math.min(lightboxState.imageIndex, gallerySlides.length - 1)
			: 0;
	const currentSlide = gallerySlides[currentSlideIndex];

	return (
		<section className={styles.section}>
			<div className={styles.header}>
				{resolvedHeader.label && <span className={styles.eyebrow}>{resolvedHeader.label}</span>}
				<h1 className={styles.title}>{resolvedHeader.title}</h1>
				<p className={styles.lede}>{resolvedHeader.description}</p>
			</div>

			<div className={styles.grid}>
				{resolvedProjects.map((project, projectIndex) => {
					const badges =
						project.cmsOptions?.filter((tag): tag is string => Boolean(tag && tag.trim())) ??
						project.tags?.filter((tag): tag is string => Boolean(tag && tag.trim())) ??
						[];
					const images = project.images?.filter(Boolean) ?? [];
					const primaryImageUrl = getImageUrl(images[0], 1200);
					const hasGallery = images.length > 1;

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
											{hasGallery && (
												<span className={styles.mediaCount}>
													{images.length} photos
												</span>
											)}
											<span className={styles.srOnly}>Open gallery</span>
										</button>
										{hasGallery && (
											<div className={styles.mediaControls}>
												<button
													type="button"
													className={styles.mediaNavButton}
													onClick={(event) => {
														event.stopPropagation();
														event.preventDefault();
														openLightbox(projectIndex, images.length - 1);
													}}
													aria-label="View previous image"
												>
													<span aria-hidden="true">‹</span>
												</button>
												<button
													type="button"
													className={styles.mediaNavButton}
													onClick={(event) => {
														event.stopPropagation();
														event.preventDefault();
														openLightbox(projectIndex, 1);
													}}
													aria-label="View next image"
												>
													<span aria-hidden="true">›</span>
												</button>
											</div>
										)}
									</CardMedia>
								)}

								<CardHeader className={styles.cardHeader}>
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
												<Badge
													key={`${project.id}-tag-${tag}`}
													className={styles.badge}
												>
													{tag}
												</Badge>
											))}
										</div>
									)}
								</CardContent>
							</Card>
						</article>
					);
				})}
			</div>

			{lightboxState && activeProject && gallerySlides.length > 0 && (
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
							disabled={gallerySlides.length <= 1}
						>
							<span aria-hidden="true">‹</span>
						</button>

						<figure className={styles.lightboxFigure}>
							<Swiper
								modules={[Keyboard, Pagination]}
								initialSlide={currentSlideIndex}
								onSwiper={(instance) => {
									swiperRef.current = instance;
								}}
								onSlideChange={(instance) => {
									setLightboxState((previous) => {
										const nextIndex = instance.realIndex ?? instance.activeIndex;

										if (!previous || previous.imageIndex === nextIndex) {
											return previous;
										}

										return {
											...previous,
											imageIndex: nextIndex,
										};
									});
								}}
								onDestroy={() => {
									swiperRef.current = null;
								}}
								keyboard={{ enabled: true }}
								pagination={{ clickable: true }}
								loop={gallerySlides.length > 1}
								className={styles.lightboxSwiper}
							>
								{gallerySlides.map((slide) => (
									<SwiperSlide key={slide.key} className={styles.lightboxSlide}>
										<img src={slide.url} alt={slide.alt} className={styles.lightboxImage} />
									</SwiperSlide>
								))}
							</Swiper>
							<figcaption className={styles.lightboxCaption}>
								{currentSlide?.alt ?? activeProject.title}
							</figcaption>
						</figure>

						<button
							type="button"
							className={styles.lightboxNavButton}
							onClick={goToNextImage}
							aria-label="View next image"
							disabled={gallerySlides.length <= 1}
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


