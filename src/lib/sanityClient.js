import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  token: import.meta.env.VITE_SANITY_API_TOKEN,
});

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generates a URL for the given Sanity image source with optimizations.
 *
 * @param {Object} source - The Sanity image source object.
 * @returns {string} - The optimized image URL.
 */
export const urlFor = (source) =>
  builder
    .image(source)
    .width(1300) // Set a fixed width for consistency
    .height(1200) // Set a fixed height for consistency
    .quality(95) // High-quality images
    .auto("format"); // Automatically choose the best format for performance
