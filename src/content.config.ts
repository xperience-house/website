import { defineCollection, reference } from "astro:content";
import { type ImageFunction } from "astro:content";
import { z } from "astro/zod";
import { glob } from 'astro/loaders';

const localizedString = z.union([
  z.string(),
  z.object({
    en: z.string().optional(),
    pt: z.string().optional(),
  }),
]);

const img = (image: ImageFunction) =>
  z.object({
    src: z.union([image(), z.string()]),
    alt: z.string().optional(),
  });

const bookingInfo = z.object({
  avaibookId: z.string(),
});

// Rentable property
const roomCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./src/content/room" }),
  schema: ({ image }) =>
    z.object({
      name: localizedString,
      description: localizedString,
      bannerImage: img(image),
      cardImage: img(image),
      images: z.array(img(image)).nonempty(),

      zone: reference("zone"),
    }),
});

// Zone includes one or multiple rooms
const zoneCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./src/content/zone" }),
  schema: ({ image }) =>
    z.object({
      name: localizedString,
      description: localizedString,
      bannerImage: img(image),
      cardImage: img(image),
      images: z.array(img(image)).nonempty(),
      bookingInfo: bookingInfo.optional(),
      location: z.object({
        name: localizedString,
        latitude: z.number(),
        longitude: z.number(),
      }),
    }),
});

export const collections = {
  room: roomCollection,
  zone: zoneCollection,
};
