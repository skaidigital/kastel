import { z } from 'zod';

export const customerActivateValidator = z.object({
  customerId: z.string(),
  activationToken: z.string(),
  password: z.string()
});

export const customerAccessTokenCreateValidator = z.object({
  email: z.string().email(),
  password: z.string()
});

export const customerCreateValidator = z.object({
  acceptsMarketing: z.boolean(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  phone: z.string()
});

const ThrottleStatusValidator = z.object({
  currentlyAvailable: z.number(),
  maximumAvailable: z.number(),
  restoreRate: z.number()
});
export type ThrottleStatusSchema = z.infer<typeof ThrottleStatusValidator>;
