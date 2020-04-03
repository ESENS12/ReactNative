# TENSORFLOW WITH REACT-NATIVE (tfjs Sample)
 - React Native 에서 Tensorflow 사용해보기 (사실은 Teachable Machine Model....)
 
## References
 - https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native
 - TFJS Sample For React-Native Using ImageNet (https://heartbeat.fritz.ai/image-classification-on-react-native-with-tensorflow-js-and-mobilenet-48a39185717c)
 - Teachable machine (https://teachablemachine.withgoogle.com/train/image)

## Components
 - react-native-canvas (https://www.npmjs.com/package/react-native-canvas)
 - teachablemachine/image (https://www.npmjs.com/package/@teachablemachine/image)
 - react-native-canvas (https://www.npmjs.com/package/react-native-canvas) 

## Problem..
 - TFJS -> 설치 완료, Google Mobile Net(ImageNet) 모델 사용 가능했음(re-training 까지도) 하지만 teachable machine 에서 손쉽게 생성한 모델을 사용해보고 싶으므로 패스
 - teachablemachine/image 를 활용해서 react-native 에서 Teachable machine 모델을 생성할 수 있었음. 하지만 어이없게도 document Not Found를 해결 못함
 - 1. teachablemachine/image는 input 타입이 (HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap) 임
 - 2. input이 image tensor가 아닌 image 타입의 element이기 떄문에 DOM에 붙여놓고 input하기로 결정
 - 3. react-native-canvas를 사용해서 이미지를 캔버스에 그려놓고 그놈을 input 해봤으나 어이없게도 document Not Found...
 - 4. 원인이 뭔고 하니 teachablemachine/image 에서도 input값을 처리할때, document에 canvas를 만들어놓고 잘라서 쓰는데
 - 5. React Native는 Document. ~~ 를 사용할 수 없음(DOM을 리액트 컴포넌트에 마운팅 후 브릿지 하기때문 [브릿지 의존적..])
 - 6. Teachable machine으로 생성한 모델을 tfjs에서 Custom Model type으로 강제로 전환해준다음 tfjs 스타일로 predict 해볼 예정
