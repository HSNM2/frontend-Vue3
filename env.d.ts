/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MerchantID: string
  readonly VITE_Version: string
  // 更多環境變數
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const VITE_APP_VERSION: string
