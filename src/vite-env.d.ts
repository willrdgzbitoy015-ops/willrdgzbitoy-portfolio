/// <reference types="vite/client" />

/** Build time as an ISO string. Set in vite.config.ts with `define`. */
declare const __LAST_UPDATED__: string

interface ImportMetaEnv {
  /** Web3Forms access key. Lives in .env.local (and in Vercel's settings), never in the code. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
