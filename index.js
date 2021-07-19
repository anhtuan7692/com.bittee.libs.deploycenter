// main index.js

import * as DCVersion from './src/version'

function setAppKey(appId, AppInstallKey) {
    DCVersion.AppConfig.setAppKey(appId, AppInstallKey);
}

export { DCVersion, setAppKey };
