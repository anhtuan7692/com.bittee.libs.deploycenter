// main index.js
import { Alert, Linking, NativeModules, Platform } from 'react-native';
// import { requireNativeComponent } from 'react-native';
const { DcLibs } = NativeModules;

// const DeployCenter = requireNativeComponent('DeployCenter', null);
// import DialogAlert from "./src/DialogAlertAndroid";
// const VersionUpdate = NativeModules.VersionUpdate;
const baseUrl = "https://dcapi.247post.vn/api/v2/app/checkVersion/";

let isCheckVersion = false;

class ConfigApp {
    AppID = -1;
    AppInstallKey = "";

    setAppKey(appId, AppInstallKey) {
        this.AppID = appId;
        this.AppInstallKey = AppInstallKey;
    }
};

const AppConfig = new ConfigApp();

function alertInstall(NewVersion, IsAllow, Url, packageName) {
    let buttons = [{
        text: "Cập nhật", onPress: () => {
            // if (Url) {
            //     if (Platform.OS === "ios") {
            //         Linking.canOpenURL(Url).then((supported) => {
            //             if (supported) {
            //                 Linking.openURL(Url);
            //             } else {
            //                 consoleLog("Don't know how to open URI: " + Url);
            //             }
            //         });
            //     } else if (Platform.OS === "android") {
            //         VersionUpdate.toDownloadFileInstall({
            //             Url,
            //             progress: {
            //                 indeterminate: false,
            //                 style: "horizontal"
            //             },
            //             cancelable: false,
            //             dismissListener: false,
            //             content: "Đang tải...",
            //             packageName: packageName
            //         });
            //     }
            //     isCheckVersion = false;
            // } else {
            isCheckVersion = false;
            var urlOpen = "app-deploycenter://appid/" + AppConfig.AppInstallKey;
            Linking.canOpenURL(urlOpen).then((supported) => {
                if (supported) {
                    Linking.openURL(urlOpen);
                } else {
                    consoleLog("Don't know how to open URI: " + urlOpen);
                }
            });
            // }
        }
    }];
    if (IsAllow) {
        buttons = [{ text: "Bỏ qua", onPress: () => { isCheckVersion = false; } }, ...buttons];
    }

    Alert.alert("Cập nhật ứng dụng", "Phiên bản mới " + NewVersion + ". Vui lòng cập nhật để có trải nghiệm tốt hơn!", buttons);
}

async function checkVersion(isCheckLogin) {
    if (!isCheckLogin) {
        if (isCheckVersion) return;
        isCheckVersion = true;
    }
    let data = await DcLibs.getAppInfo();
    if (!data) {
        return true;
    }
    return new Promise((resolve, reject) => {
        try {
            console.log(data);
            const deviceInfo = data.split(":");
            // const packageName =deviceInfo[0];
            const packageName = "";
            let version = deviceInfo[1];
            const versionCode = deviceInfo[2];
            let url = baseUrl + AppConfig.AppID + "/" + version + "/" + versionCode;

            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Basic YXBwZGw6MjQ3ITIzM0AxMjM=",
                    "AppApiKet": "app_deploy",
                    "AppApiSecretKey": "app_deploy",
                    "os": Platform.OS,
                    "package": packageName
                }
            }).then(res => res.json()).then(res => {
                if (res && res.status !== -1) {
                    if (res.IsNew) {
                        if (!res.IsOldLive) {
                            if (isCheckLogin) {
                                if (res.IsAllow) {
                                    resolve(true);
                                    return;
                                }
                            }
                            alertInstall(res.NewVersion, res.IsAllow, res.Url, packageName);
                            resolve(false);
                            return;
                        }
                    }
                }
                if (!isCheckLogin) isCheckVersion = false;
                resolve(true);
            }).catch(ex => {
                if (!isCheckLogin) isCheckVersion = false;
                resolve(true);
            });
        } catch (e) {
            if (!isCheckLogin) isCheckVersion = false;
            resolve(true);
        }
    });
}

export { AppConfig, checkVersion };