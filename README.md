# com.bittee.libs.deploycenter

## Getting started

`$ npm install com.bittee.libs.deploycenter --save`

### Mostly automatic installation

`$ react-native link com.bittee.libs.deploycenter`

### iOS add to file Info.plist

<key>LSApplicationQueriesSchemes</key>
<array>
    <string>app-deploycenter</string>
</array>

## Usage
```javascript
import { DCVersion, setAppKey } from 'com.bittee.libs.deploycenter';
setAppKey(AppID, AppInstallKey);

//check for login
var isAllow = await DCVersion.checkVersion(IsCheckForLogin);
