import { defineCollection, reference, z } from "astro:content";

const localizedString = z.union([
  z.string(),
  z.object({
    en: z.string().optional(),
    pt: z.string().optional(),
  }),
]);

const image = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

// Rentable property
const roomCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: localizedString,
    description: localizedString,
    bannerImage: image,
    cardImage: image,
    images: z.array(image).nonempty(),

    zone: reference("zone"),
  }),
});

// Zone includes one or multiple rooms
const zoneCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: localizedString,
    description: localizedString,
    cardImage: image,
    images: z.array(image).nonempty(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
});

export const collections = {
  room: roomCollection,
  zone: zoneCollection,
};
