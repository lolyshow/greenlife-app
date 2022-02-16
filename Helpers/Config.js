import { Platform } from "react-native";
import packageJson from "../package.json";
const APP_NAME = "Green-Life";
const IOS_VERSION = "1.9";
const ANDROID_VERSION = packageJson.version;
const IS_POS_APP = false;
const TOKEN_LENGTH = 4;
const DSTV_ADDON_URL = "";

const BASE_URL = "";
const APP_URL = "";

const Config = {
  base_url: BASE_URL,
  app_url: APP_URL,
  dstv_addon_url: DSTV_ADDON_URL,
  tokenLength: TOKEN_LENGTH,
  appName: APP_NAME,
  appVersion: Platform.select({
    android: ANDROID_VERSION,
    ios: IOS_VERSION,
  }),
  isPos: Platform.OS == "android" && IS_POS_APP,
};

export default Config;
