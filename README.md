# Phone-Log
통화기록 조회 웹

![image](https://user-images.githubusercontent.com/64001275/207390714-5dc19914-68e0-4e22-b09c-254bfeefebd7.png)

## 컴포넌트 설명

> App.vue
>> LoginMain.vue : 로그인
>> 
>> UserInput.vue : 유저 추가
>> 
>> SearchMain.vue : 통화기록 조회
>>> SearchList.vue : 통화기록 조회 리스트

## 주요기능 디렉토리

1. 내부 토큰
- jwt 로그인 토큰 및 쿠키 생성, 토큰 갱신, 토큰 복호화
> https://github.com/95hanho/Phone-Log/blob/master/frontend/src/store/module/login.js
- 서버 요청 시 토큰 연장
> https://github.com/95hanho/Phone-Log/blob/master/frontend/src/axios/axios.js
- url이동, 새로고침에 따른 토큰 연장
> https://github.com/95hanho/Phone-Log/blob/master/frontend/src/router/index.js

2. XML결과 매핑
> https://github.com/95hanho/Phone-Log/blob/e971f6c15b6711ecd8ed146ac1434adb4005326d/frontend/src/components/SearchMain.vue#L266
