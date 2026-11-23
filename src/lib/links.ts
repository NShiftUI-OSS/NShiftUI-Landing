export const repos = {
  rust: "https://github.com/NShiftUI-OSS/RainbowParser-Rust",
  rustRelease:
    "https://github.com/NShiftUI-OSS/RainbowParser-Rust/releases/tag/v1.0.0",
  rustSource:
    "https://github.com/NShiftUI-OSS/RainbowParser-Rust/archive/refs/tags/v1.0.0.tar.gz",
  wasmNode:
    "https://github.com/NShiftUI-OSS/RainbowParser-Rust/releases/download/v1.0.0/rainbow-parser-wasm-node.tgz",
  wasmWeb:
    "https://github.com/NShiftUI-OSS/RainbowParser-Rust/releases/download/v1.0.0/rainbow-parser-wasm-web.tgz",
  android: "https://github.com/NShiftUI-OSS/NShiftUI-Android",
  androidRelease:
    "https://github.com/NShiftUI-OSS/NShiftUI-Android/releases/tag/v1.0.0",
  androidAar:
    "https://github.com/NShiftUI-OSS/NShiftUI-Android/releases/download/v1.0.0/NShiftUI-Android-release.aar",
  androidKsp:
    "https://github.com/NShiftUI-OSS/NShiftUI-Android/releases/download/v1.0.0/nshiftui-ksp.jar",
  parserAndroid: "https://github.com/NShiftUI-OSS/RainbowParser-Android",
  parserAndroidAar:
    "https://github.com/NShiftUI-OSS/RainbowParser-Android/releases/download/v1.0.0/RainbowParser-Android-release.aar",
  ios: "https://github.com/NShiftUI-OSS/NShiftUI-iOS",
  iosRelease: "https://github.com/NShiftUI-OSS/NShiftUI-iOS/releases/tag/v1.0.0",
  parserIos: "https://github.com/NShiftUI-OSS/RainbowParser-iOS",
  parserIosRelease:
    "https://github.com/NShiftUI-OSS/RainbowParser-iOS/releases/tag/v1.0.0",
  demo: "https://github.com/NShiftUI-OSS/NShiftUI-Demo",
  demoArchive:
    "https://github.com/NShiftUI-OSS/NShiftUI-Demo/archive/refs/tags/v1.0.0.tar.gz",
  homebrew: "https://github.com/NShiftUI-OSS/homebrew-rainbowparser",
  org: "https://github.com/NShiftUI-OSS",
} as const

export const sections = [
  { id: "rainbow", label: "Rainbow" },
  { id: "android", label: "Android" },
  { id: "ios", label: "iOS" },
  { id: "poc", label: "POC" },
  { id: "cli", label: "CLI" },
] as const
