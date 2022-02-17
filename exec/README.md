# 포팅 매뉴얼

## 준비

MySQL 8

vscode

sts(Spring Tool Suite 3) Version: 3.9.14.RELEASE

jdk: 13.0.1

lombok



## 빌드

### 로컬

#### 프론트엔드

##### .env

- 카카오 로그인을 위한 KEY 환경변수를 담음

  [소셜 로그인 키 받기](소셜 로그인)

- frontend-react 폴더 안에 넣기

```bash
npm install
npm run build
```



#### 백엔드

```bash
./mvnw package
```

backend-java/target 에 jar 파일 생김



### 



## 배포

### EC2 서버

EC2 접속

nginx 설치

mysql 설치

workbench 연결



### 수동

```bash

```

git clone

빌드



### 젠킨스

