import axios from "axios";
import qs  from 'qs';
import { Platform, NativeModules } from "react-native";
import Config from "./Config";
import Storage from "./Storage";

const Helper = {
  propertiesAllSet: (a) => {
    return Object.keys(a).reduce(
      (res, k) => res && (!!a[k] || a[k] === false || !isNaN(parseInt(a[k]))),
      Object.keys(a).length > 0
    );
  },

  getPropValue: (object, path = "") =>
    path.split(".").reduce((o, x) => (o == undefined ? o : o[x]), object),

  formattedAmount: (amount, dp = 2) => {
    return amount
      ? new Intl.NumberFormat("en-NG", {
          minimumFractionDigits: dp,
          maximumFractionDigits: dp,
        }).format(amount)
      : "";
  },

  formattedAmountWithNaira: (amount, dp = 2) => {
    return amount
      ? "\u20A6" +
          new Intl.NumberFormat("en-NG", {
            minimumFractionDigits: dp,
            maximumFractionDigits: dp,
            // style: "currency",
            // currency: "NGN",
          }).format(amount)
      : "";
  },

  getStates: async () => {
    let url = Config.base_url + "/get-states";

    let data;

    await axios
      .get(url)
      .then((response) => {
        let responseData = response.data;

        if (Array.isArray([responseData])) {
          data = { states: responseData, error: false, message: "OK" };
        } else {
          data = {
            states: [],
            error: true,
            message: "Something went wrong, could not fetch states",
          };
        }
      })
      .catch((error) => {
        data = { states: [], error: true, message: error.toString() };
      });

    return data;
  },

  getLga: async (state) => {
    let url = Config.base_url + "/get-lga";
    let data;
    let body = { state: state };

    await axios
      .post(url, body)
      .then((response) => {
        let responseData = response.data;

        if (Array.isArray([responseData])) {
          data = { lga: responseData, error: false, message: "OK" };
        } else {
          data = {
            lga: [],
            error: true,
            message: "Something went wrong, could not fetch LGA",
          };
        }
      })
      .catch((error) => {
        data = { lga: [], error: true, message: error.toString() };
      });
    return data;
  },

  getBalance: async () => {
    let data;

    let body = {
      serviceCode: "VWV",
      email: global.username,
      password: global.password,
    };

    let url = Config.base_url + "/test/start";

    await axios
      .post(url, body)
      .then(function(response) {
        let responseData = response.data;
        let status = responseData.status;
        let message = responseData.message;

        if (status != "200") {
          data = {
            wallet: [],
            error: true,
            message: message.toString(),
          };
        } else {
          global.wallet = responseData.wallet;
          data = { wallet: responseData.wallet, error: false, message: "OK" };
        }
      })

      .catch(function(error) {
        data = { wallet: [], error: true, message: error.toString() };
      });

    return data;
  },

  getNotifications: async () => {
    let data;

    let body = {
      serviceCode: "APP_NOTIFICATION",
    };

    // let headers = {
    //   username: global.username,
    //   password: global.password,
    // };

    let headers = {
      token: Helper.getPropValue(global, "authToken"),
    };
    let url = Config.app_url;

    await axios
      .post(url, body, { headers })
      .then(function(response) {
        let responseData = response.data;
        let status = responseData.status;
        let message = responseData.message;

        if (status != "200") {
          data = {
            notification: [],
            error: true,
            message: message.toString(),
          };
        } else {
          global.notification = response;
          data = { notification: responseData, error: false, message: "OK" };
        }
      })
      .catch(function(error) {
        data = {
          notification: [],
          error: true,
          message: error.toString(),
        };
      });

    return data;
  },

  getAppVersion: async () => {
    let data;

    let body = {
      serviceCode: "VERSION",
      platform: Config.isPos ? "pos" : Platform.OS,
    };

    // let headers = {
    //   username: global.username,
    //   password: global.password,
    // };

    let headers = {
      token: Helper.getPropValue(global, "authToken"),
    };

    let url = Config.app_url;

    await axios
      .post(url, body, { headers })
      .then(function(response) {
        let responseData = response.data;
        let statusCode = responseData.statusCode;

        if (statusCode != "200") {
          data = {
            version: null,
            error: true,
            message: "Could not retrieve version",
          };
        } else {
          data = { version: responseData.version, error: false, message: "OK" };
        }
      })

      .catch(function(error) {
        data = { version: null, error: true, message: error.toString() };
      });

    return data;
  },


  userLogInApi: async (payloads) => {
    let LoginData = {
      email: "username",
      password: "password",
    };
    let email = "username";
    let password = "password";
    // const { uniqueId, brand, model } = NativeModules.RNDeviceInfo;

    const headerPayload = {
      username: "username",
      password: "password",
      token: "token",
      
    };


    let url = Config.base_url+"MemberControllerServlet?"+payloads;

    
    let result = {};
    
    await axios
      .post(url, LoginData, { headers: headerPayload })
      .then(function(response) {
        let { loginStatus } = response.data;

        if (loginStatus != true) {
          result = {
            message: "error",
            error: true,
            user: null,
            response: null,
          };
        } else {
          Helper.saveLoginDetails(email, password);
          global.username = email;
          global.password = password;
          global.user = response.data;
          global.header = response.headers;
          // global.authToken = Helper.getPropValue(
          //   response.data,
          //   "auth.access_token"
          // );
          

          result = {
            message: "message",
            error: false,
            user: response.data.user,
            response: response.data,
          };
        }
      })
      .catch(function(error) {
        result = {
          message: error.toString(),
          error: true,
          user: null,
          response: null,
        };
      });

    return result;
  },

  logInApi: async (payloads) => {
    let LoginData = {
      email: "username",
      password: "password",
    };
    let email = "username";
    let password = "password";
    // const { uniqueId, brand, model } = NativeModules.RNDeviceInfo;

    const headerPayload = {
      username: "username",
      password: "password",
      token: "token",
      
    };


    let url = Config.base_url+"MemberControllerServlet?"+payloads;

    let result = {};
    
    await axios
      .post(url, LoginData, { headers: headerPayload })
      .then(function(response) {
        let { loginStatus } = response.data;
        
        if (loginStatus != true) {
          result = {
            message: "error",
            error: true,
            user: null,
            response: null,
          };
        } else {
          Helper.saveLoginDetails(email, password);
          global.username = email;
          global.password = password;
          global.user = response.data;
          global.header = response.headers;
          
          

          result = {
            message: "message",
            error: false,
            user: response.data.user,
            response: response.data,
          };
        }
      })
      .catch(function(error) {
        result = {
          message: error.toString(),
          error: true,
          user: null,
          response: null,
        };
      });

    return result;
  },

  Request: async(linkUrl,method = "get",dataPayload={})=>{
    
    
    var data = qs.stringify(dataPayload);
    let urls = Config.base_url_live+linkUrl;

    let result = {};
    var config = {
      method: method,
      url: urls,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Cookie': 'JSESSIONID=539E0A68F2BC33FC52FF1A9A3DA11657'
      },
      data : data
    };

    await axios(config)
    .then(function (response) {
      let data = response.data;
        if (!data) {
          result = {
            message: "There seems to be an Error",
            error: true,
            response: null,
          };
        } else {
          
          result = {
            message: "Success",
            error: false,
            response: response.data,
          };
        }

        
    })
    .catch(function (error) {
      result = {
        message: error.toString(),
        error: true,
        response: null,
      };
    });
    return result;
  },


  getRequest: async(linkUrl,method = "get",dataPayload={})=>{
    
    
    var data = qs.stringify(dataPayload);
    let urls = Config.base_url+linkUrl;
    let result = {};
    var config = {
      method: method,
      url: urls,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Cookie': 'JSESSIONID=539E0A68F2BC33FC52FF1A9A3DA11657'
      },
      data : data
    };

    await axios(config)
    .then(function (response) {
      let data = response.data;
        if (!data) {
          result = {
            message: "There seems to be an Error",
            error: true,
            response: null,
          };
        } else {
          
          result = {
            message: "Success",
            error: false,
            response: response.data,
          };
        }

        
    })
    .catch(function (error) {
      result = {
        message: error.toString(),
        error: true,
        response: null,
      };
    });
    return result;
  },



  saveLoginDetails: async (username, password) => {
    try {
      Promise.all([
        Storage.storeStringData("username", username),
        Storage.storeStringData("password", password),
      ]);
    } catch (error) {}
  },

  maskCreditCard: (creditCard) => {
    let cc = creditCard.toString();
    let firstTwo = cc.substr(0, 2);
    let lastFour = cc.substr(-4);
    let m = cc.substr(2);
    let toMask = m.substr(0, m.length - 4);
    let masked = firstTwo + Array(toMask.length).join("*") + lastFour;
    return masked;
  },

  textRefine: (text) => {
    return text
      .replace(/_/g, " ")
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  },

  checkPinActive: () => {
    let { transaction_pin_status } = global.user;

    return (pinStatus = transaction_pin_status == "1" ? true : false);
  },

  isAppVersionBehindLatest: (currentVersion) => {
    let appVersion = Config.appVersion;
    let appVersionSplit = appVersion.split(".");
    let currentVersionSplit = currentVersion.split(".");

    return parseFloat(currentVersion) > parseFloat(appVersion);

    if (appVersionSplit.length < 2 || currentVersionSplit < 2) {
      return false;
    }

    if (parseFloat(currentVersionSplit[0]) > parseFloat(appVersionSplit[0])) {
      return true;
    } else if (
      parseFloat(currentVersionSplit[0]) == parseFloat(appVersionSplit[0])
    ) {
      if (parseFloat(currentVersionSplit[1]) > parseFloat(appVersionSplit[1])) {
        return true;
      } else if (
        parseFloat(currentVersionSplit[1]) == parseFloat(appVersionSplit[1])
      ) {
        if (currentVersionSplit[2]) {
          if (!appVersionSplit[2]) {
            return true;
          }
          if (
            parseFloat(currentVersionSplit[2]) > parseFloat(appVersionSplit[2])
          ) {
            return true;
          }
        }
      }
    }

    return false;
  },
};

export default Helper;
