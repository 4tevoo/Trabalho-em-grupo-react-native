export default {
  expo: {
    name: "ViaLivre",
    slug: "ViaLivre",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    ios: { supportsTablet: true },
    android: {
      package: "com.projnative.vialivre",
      versionCode: 1,
      predictiveBackGestureEnabled: false
    },
    plugins: [
      [
        "react-native-maps",
        {
          androidGoogleMapsApiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY_ANDROID,
          iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY_IOS
        }
      ],
      "expo-font"
    ]
  }
};