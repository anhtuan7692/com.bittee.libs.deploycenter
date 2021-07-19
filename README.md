# com.bittee.libs.deploycenter

## Getting started

`$ npm install com.bittee.libs.deploycenter --save`

### Mostly automatic installation

`$ react-native link com.bittee.libs.deploycenter`

## Usage
```javascript
import { DCVersion, setAppKey } from 'com.bittee.libs.deploycenter';
setAppKey(AppID, AppInstallKey);

//check for login
var isAllow = await DCVersion.checkVersion(IsCheckForLogin);
