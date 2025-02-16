import { defineCollection, reference, z } from "astro:content";
import { type ImageFunction } from "astro:content";

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
  type: "data",
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
  type: "data",
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
