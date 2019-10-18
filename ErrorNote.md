# 프로젝트 구성
Command `run-android` unrecognized. Make sure that you have run `npm install` and that you are inside a react-native project.

1. 프로젝트 생성, nom install 한 후 뭐 init이니 뭐니 해본 상태
2. 웹스톰 프로젝트 생성시에 react native를 local에 설치된 놈으로 하지말고 (/usr/local/lib/node_modules/react-native-cli)
3. 'Npx —package react-native-cli react-native' 로 프로젝트 생성 할것


# eslint 관련
npm install —save-dev eslint@5
yarn install


# IOS 빌드오류
'React/RCTBridgeDelegate.h' file not found
->cocoapods를 설치해줘야함

brew install cocoapods
cd iOS
pod install


# Android build error 


# 다중 포트 설정 방법(다중실행)
React-native start —port 8082
위처럼 특정포트 지정 후에
안드로이드는 에뮬or 단말에서 설정변경해줘야함

iOS는 따로 변경하지 않고 ,해당 링크 참조

https://medium.com/@hsuastegui/use-react-native-in-a-different-port-1109db5674d8


# expo 설치 관련 이슈들
 - expo location, permission 을 import 한 이후에 ios 에서 Native module cannot be null 에러 발생중..
   1. ios 에서는 expo unimodule 을 따로 설치해주었더니 pod install 시에 정상적으로 expo location,permission등을 설치하는듯 보임(하지만 그래도 실행은 안되는중)
   2. pod file에 다음 내용을 추가 -> require_relative '../node_modules/react-native-unimodules/cocoapods.rb' 요놈이랑 use_unimodules! 요놈
   3. https://gist.github.com/brentvatne/1ece8c32a3c5c9d0ac3a470460c65603 참고하여 AppDelegate.h 와 m 을 수정해주면 된다.

   
 - android는 expo location 정상 동작 안하고 있음

