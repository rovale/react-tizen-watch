[![Greenkeeper badge](https://badges.greenkeeper.io/rovale/react-tizen-watch.svg)](https://greenkeeper.io/)

Prerequisites
- Install [Tizen Studio](https://developer.tizen.org/)
  - From the Main SDK install 2.3.2 Wearable
  - From the Extension SDK install Samsung Certificate Extension
- Create a [Samsung Certificate](http://developer.samsung.com/z/develop/getting-certificates/create)
- Edit tizen-studio\tools\ide\conf\profiles.xml to point to the correct certificates
- Use the tizen cli to set the default profiles path, i.e. `tizen cli-config "default.profiles.path=C:\tizen-studio\tools\ide\conf\profiles.xml"`

Deploying on the watch
- Set the watch in debugging mode
- Connect the watch to the WiFi-network
- Connect to the watch using the connection manager or the sdb cli
- run npm install
- run deploy.ps1

TODO:
  - [ ] improve settings location
