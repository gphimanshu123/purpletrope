import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanityClient";
	
const builder = imageUrlBuilder(sanityClient);

const hasAsset = (
  source: SanityImageSource | undefined | null
): source is SanityImageSource & { asset: { _ref?: string } } =>
  Boolean(
    source &&
      typeof source === "object" &&
      "asset" in source &&
      source.asset &&
      typeof (source as { asset: { _ref?: string } }).asset._ref === "string"
  );

export function urlFor(source: SanityImageSource | undefined | null) {
  if (!source || !hasAsset(source)) {
    return undefined;
  }

  try {
    return builder.image(source);
  } catch (error) {
    console.warn("Failed to build Sanity image URL", error);
    return undefined;
  }
}
