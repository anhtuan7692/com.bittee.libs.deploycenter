import { NativeModule } from "react-native";

const DeployCenter: Comment;
const DialogAlert: NativeModule;
const VersionUpdate: NativeModule;
let checkVersion: Function;

type ConfigApp = {
    AppID: string;
    AppInstallKey: string;
}

let AppConfig: ConfigApp;

export {
    DeployCenter,
    DialogAlert,
    VersionUpdate,
    checkVersion,
    AppConfig
};