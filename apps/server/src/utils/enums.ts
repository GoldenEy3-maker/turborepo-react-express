import { ValueOf } from "utils/types"

export const DirectoryPaths = {
  PublicClientImages: "/client/public/images/"
  // PublicClientImages: "/images/"
} as const

export type DirectoryPaths = ValueOf<typeof DirectoryPaths> 