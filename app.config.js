import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  "expo": {
    "name": "ignite-fleet",
    "slug": "ignite-fleet",
    "scheme": "ignite-fleet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#202024"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gbdsantos.ignitefleet",
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#202024"
      },
      "package": "com.gbdsantos.ignitefleet",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      "@react-native-google-signin/google-signin"
    ],
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
