# ReactNative
For Study ReactNative (with Android / iOS / React.js )

# 프로젝트 구성
Command `run-android` unrecognized. Make sure that you have run `npm install` and that you are inside a react-native project.

1. 프로젝트 생성, nom install 한 후 뭐 init이니 뭐니 해본 상태
2. 웹스톰 프로젝트 생성시에 react native를 local에 설치된 놈으로 하지말고 (/usr/local/lib/node_modules/react-native-cli)
3. 'npx --package react-native-cli react-native' 로 프로젝트 생성 할것


# eslint 관련
npm install —save-dev eslint@5
yarn install


# iOS 빌드오류
'React/RCTBridgeDelegate.h' file not found
->cocoapods를 설치해줘야함

brew install cocoapods
cd iOS
pod install


# Android build error 
React-native unimodules 관련 빌드 오류 발생
안드로이드에서 해당 모듈 import못하는 현상에서, instruction 제대로 안읽고 떄려박아서 발생한 문제가 있었음.
https://github.com/unimodules/react-native-unimodules 참고해서 제대로 설정..

 1.build.gradle(project) 에 apply from: '../../node_modules/react-native-unimodules/gradle.groovy' 추가할때 이놈이 addUnimodulesDependencies() 보다 선행되어야함

-> Unimodules 관련 이슈 발생..

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.core:core:{strictly 1.0.0}.
Show Details
Affected Modules: unimodules-react-native-adapter

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.vectordrawable:vectordrawable:{strictly 1.0.0}.
Show Details
Affected Modules: unimodules-react-native-adapter

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.core:core:1.0.0.
Show Details
Affected Modules: unimodules-react-native-adapter

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.vectordrawable:vectordrawable:1.0.0.
Show Details
Affected Modules: unimodules-react-native-adapter

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.core:core:1.0.1.
Show Details
Affected Modules: unimodules-react-native-adapter

ERROR: Unable to resolve dependency for ':unimodules-react-native-adapter@debug/compileClasspath': Could not resolve androidx.vectordrawable:vectordrawable:1.0.1.
Show Details
Affected Modules: unimodules-react-native-adapter


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

   

