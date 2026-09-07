import {
  promptModeSchema,
  reasoningLevelSchema,
  runtimePermissionPolicySchema,
  serviceTierSchema,
} from "@bb/domain";
import { z } from "zod";

export const bridgeExecutionOptionsSchema = z
  .object({
    model: z.string().min(1).optional(),
    /**
     * Whether `model` is a deliberate user choice (see
     * `resolvedThreadExecutionOptionsSchema`). Providers whose agents carry
     * their own configured model may honor that config when this is false.
     */
    modelIsExplicit: z.boolean().optional(),
    serviceTier: serviceTierSchema.optional(),
    reasoningLevel: reasoningLevelSchema.optional(),
    promptMode: promptModeSchema.optional(),
    instructions: z.string().optional(),
    envVars: z.record(z.string(), z.string()).optional(),
    providerOptions: z.record(z.string(), z.unknown()).optional(),
  })
  .and(runtimePermissionPolicySchema);

export type BridgeExecutionOptions = z.infer<
  typeof bridgeExecutionOptionsSchema
>;
