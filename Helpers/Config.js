import { Platform } from "react-native";
import packageJson from "../package.json";
const APP_NAME = "Green-Life";
const IOS_VERSION = "1.0";
const ANDROID_VERSION = packageJson.version;
const TOKEN_LENGTH = 4;
const IS_POS_APP = false;
const BASE_URL = "https://greenlifeapi.herokuapp.com/";
const BASE_URL_LIVE = "https://greenlifetreasurepurse.com/";
const APP_URL = "https://greenlifeapi.herokuapp.com/";

const Config = {
  base_url: BASE_URL,
  base_url_live: BASE_URL_LIVE,
  app_url: APP_URL,
  tokenLength: TOKEN_LENGTH,
  appName: APP_NAME,
  appVersion: Platform.select({
    android: ANDROID_VERSION,
    ios: IOS_VERSION,
  }),
  isPos: Platform.OS == "android" && IS_POS_APP,
};

export default Config;
