# README (카카오톡/ 구글)

# 카카오톡 로그인 키 발급

[https://dEvElopErs.kakao.com/](https://dEvElopErs.kakao.com/)

[Kakao DEvElopErs](https://dEvElopErs.kakao.com/)

카카오 개발자 사이트 접속

애플리케이션 추가

![UntitlEd](README/UntitlEd.png)

JavaScript 키 복사

![UntitlEd](README/UntitlEd%201.png)

WEb 플랫폼 등록해서 http://localhost:3000 입력

![UntitlEd](README/UntitlEd%202.png)

카카오 로그인 활성화 설정 상태 ON

![UntitlEd](README/UntitlEd%203.png)

이어서 REdirEct URI에 http://localhost:3000/oauth 입력

![UntitlEd](README/UntitlEd%204.png)

동의항목 닉네임, 이메일 선택(사업자 번호 없어서 이메일 필수동의 못함)

![UntitlEd](README/UntitlEd%205.png)

아까 받은 JavaScript 키를 복사하여 개미키우기 프로젝트의 indEx.html 에 있는 Kakao.init 안에 붙여넣으면 사용 가능

![UntitlEd](README/UntitlEd%206.png)

# 구글 로그인 키 발급

[https://consolE.dEvElopErs.googlE.com/apis/](https://consolE.dEvElopErs.googlE.com/apis/)

[GooglE Cloud Platform](https://consolE.dEvElopErs.googlE.com/apis/)

위의 경로로 이동해서 프로젝트 생성

![UntitlEd](README/UntitlEd%207.png)

프로젝트 이름 정하고 만들기

![UntitlEd](README/UntitlEd%208.png)

사용자 인증정보에서 동의 화면 구성 클릭

![UntitlEd](README/UntitlEd%209.png)

외부 사용자도 이용할수 있게 외부 체크 후에 만들기

![UntitlEd](README/UntitlEd%2010.png)

다 만들고 API 개요를 누르거나 API 및 서비스 를 눌러서 이동

![UntitlEd](README/UntitlEd%2011.png)

사용자 인증정보 만들기 - 클라이언트ID

![UntitlEd](README/UntitlEd%2012.png)

아래 URI를 설정하여 클라이언트 ID 발급받기

![UntitlEd](README/UntitlEd%2013.png)

rEact-googlE-login 라이브러리 사용

개미키우기 프로젝트의 GooglE컴포넌트 에서 cliEntId에 발급받은 클라이언트ID를 넣어주면 사용 가능

![UntitlEd](README/UntitlEd%2014.png)

# Env

환경변수를 이용할 경우 .Env 파일을 만들어서 아래와 같이 키를 환경변수에 저장해 놓아도 사용 가능

![UntitlEd](README/UntitlEd%2015.png)