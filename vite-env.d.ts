// Manually define ImportMeta to avoid "Cannot find type definition file for vite/client" error
interface ImportMetaEnv {
  readonly [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
