module.exports = {
  name: "uber",
  slug: "uber",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "server",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://uber.dev/",
      },
    ],
    "expo-font",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        imageResizeMode: "contain",
        backgroundColor: "#2F80ED",
        image: "./assets/images/splash.png",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  newArchEnabled: false, // Set to true when ready to adopt the New Architecture
};
