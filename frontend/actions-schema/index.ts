import * as z from "zod";

export const getChainInfoSchema = z.object({
    userQuery: z.string()
})