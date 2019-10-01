#프로젝트 구성
Command `run-android` unrecognized. Make sure that you have run `npm install` and that you are inside a react-native project.

1. 프로젝트 생성, nom install 한 후 뭐 init이니 뭐니 해본 상태
2. 웹스톰 프로젝트 생성시에 react native를 local에 설치된 놈으로 하지말고 (/usr/local/lib/node_modules/react-native-cli)
3. 'Npx —package react-native-cli react-native' 로 프로젝트 생성 할것


#eslint 관련
npm install —save-dev eslint@5
yarn install


#IOS 빌드오류
'React/RCTBridgeDelegate.h' file not found
->cocoapods를 설치해줘야함

Brew install cocoapods
Cd iOS
Pod install


Android build error 

## org.webkit:android-jsc.
