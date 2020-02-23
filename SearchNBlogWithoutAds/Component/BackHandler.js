import React, { useState } from 'react'
import { useBackHandler } from 'react-native-hooks'

//Back handler for Android(Hardware Back event)

export function BackHandler(pressdTime) {
    let exitApp = false;
    let backPressed = 0;

    //todo 팝업 방식으로?
    //상위 APP한테 props로 전달받....아 function..
    let sec = new Date().getSeconds();

    useBackHandler(() => {
        console.log("backButton!" , pressdTime);

        setTimeout(
            mHandler => {
                backPressed = 0;
                console.log('backPressed is 0 now');
            },
            2000    // 2초
        );

        if (true) {
            // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
            if (backPressed>1) {
                console.log("!exitApp");
                // ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
                backPressed++;

                setTimeout(
                    () => {
                        backPressed = 0;
                        console.log('backPressed is 0 now');
                    },
                    2000    // 2초
                );
                return false
            } else {

                console.log('clearTimeout and exit App');
                // BackHandler.exitApp();  // 앱 종료
                return true;
            }
        }
    });

    return(
        <>
        </>
    )
}
