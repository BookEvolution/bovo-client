ReadMe
# 프로젝트 명 'Bovo'

## 🚀 목차 {#top}

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 개발 인원 및 역할(FE)](#2-개발-인원-및-역할fe)
- [3. 프로젝트 일정](#3-프로젝트-일정)
- [4. 기술 스택](#4-기술-스택)
- [5. 시스템 아키텍쳐](#5-시스템-아키텍쳐)
- [6. 패키지 구조](#6-패키지-구조)
- [7. 서비스 기능](#7-서비스-기능)
- [8. 수정 사항](#8-수정-사항)

## 1. 프로젝트 소개

Bovo는 독서 기록 습관 형성을 위한 플랫폼입니다.<br>
독서에 재미를 느낄 수 있도록, 독서 기록 템플릿 제공, 퀘스트, 독서 토론을 통해 독서에 흥미를 느끼는 분 모두 사용해보세요~

Netlify : [클릭하여 페이지를 방문하세요](https://bovo.netlify.app/)<br>

AWS S3 : [클릭하여 페이지를 방문하세요](http://bovo-client.s3-website.ap-northeast-2.amazonaws.com)

## 2. 개발 인원 및 역할(FE)

| **이영섭** | **김시은** | **이자원** |
|:----------:|:----------:|:----------:|
| 팀장(FE) | 팀원(FE) | 팀원(FE) |
| 프로젝트 관리<br> 프로젝트 발표<br> boilerplate 작성<br> 마이페이지<br> 마이페이지 수정<br> 서비스 정보<br> 퀘스트<br> 독서토론방 리스트<br> 독서토론방 만들기<br> 독서토론방(채팅)<br> 화면 배포| 로그인<br> 도서 검색<br> 메인 페이지<br> 독서 캘린더 | 서재<br> 독서기록<br> MSW 사용 |

## 3. 프로젝트 일정

| **항목** | **기간** |
|:----------:|:----------:|
| 프로젝트 주제 선정 및 기획 | 2025.02.03 ~ 2025.02.12 |
| 요구사항 명세서 작성 및 디자인 | 2025.02.13 ~ 2025.02.16 |
| API 명세서 작성 | 2025.02.19 ~ 2025.02.20 |
| boilerplate 작성 | 2025.02.21 ~ 2025.02.24 |
| 개발 | 2025.02.25 ~ 2025.03.19 |
| refactoring | 2025.03.21 ~ 2025.05.12 |
| 화면단 배포 | 2025.05.12 ~ 2025.05.21 |
| 디버깅 및 refactoring | 2025.05.21 ~ 현재 |

<img src="./docResource/img/develop_plan.jpg" alt="프로젝트 일정">

[맨 위로](#top)

## 4. 기술 스택

우리 프로젝트는 다음과 같은 기술 스택으로 개발되었습니다.

### 💻 프론트엔드 (Frontend)
#### 언어 및 라이브러리
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![dnd kit](https://img.shields.io/badge/dnd_kit-6933F8?style=for-the-badge) 
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF4742?style=for-the-badge)
![STOMP](https://img.shields.io/badge/STOMP-4CAF50?style=for-the-badge) 

#### 디자인 시스템
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

### ⚙️ 백엔드 (Backend)
#### 언어 및 프레임워크
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

#### 데이터베이스
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### 🔗 API
![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge&logo=socket.io&logoColor=white)
![Kakao Login API](https://img.shields.io/badge/Kakao_Login_API-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=black)
![Kakao Book API](https://img.shields.io/badge/Kakao_Book_API-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=black)

### ☁️ 인프라 및 배포 (Infrastructure & Deployment)
#### 화면
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2671E5?style=for-the-badge&logo=githubactions&logoColor=white)

#### 서버
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)

### 🛠️ 개발 환경 및 협업 도구 (Dev Environment & Collaboration Tools)
![Rollup Bundle Analyzer](https://img.shields.io/badge/Rollup_Bundle_Analyzer-EC4A3F?style=for-the-badge&logo=rollup&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

[맨 위로](#top)

## 5. 시스템 아키텍쳐

![system_architecture](./docResource/img/system_architecture.png)

[맨 위로](#top)

## 6. 패키지 구조
```bash
.github               : Github action 관련 yml 파일
    └─ workflows
        └─ node.js.yml
bovo_client
    ├─ src
        ├─  api      : 데이터 통신 함수
        │    └─ ...
        ├─  assets      : 로고, 이미지 파일
        │    └─ ...
        ├─  components  : 컴포넌트
        │      └─ ...
        ├─  constant      : 각종 이미지 경로 및 버튼/menu list
        │      └─ ...
        ├─  hooks      : hook 함수
        │      └─ ...
        ├─  layout       : 레이아웃
        │      └─ ...
        ├─  pages : 각 페이지
        │      └─ ...
        ├─  store : Redux toolkit
        │      └─ ...
        └─  utils : util 함수
        │      └─ ...
        ├─  App.jsx : routing처리
        └─  main.jsx
    └─ netlify.toml : netlify 설정 관련 toml 파일일
docResource           : ReadMe 관련 사용할 이미지/영상
    └─ ...
README.md             : 프로젝트 Readme
```

[맨 위로](#top)

## 7. 서비스 기능
### (1) 로그인 페이지
<img src="./docResource/img/loginPage.png" alt="로그인" style="width: 40%;" />

### (2) 회원 가입 페이지
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/signup.png" alt="회원가입 페이지">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/profileImgChoice.png" alt="프로필 이미지 선택 페이지">
        </td>
    </tr>
    <tr>
        <td align="center">이메일 회원가입</td>
        <td align="center">프로필 이미지 선택</td>
    </tr>
</table>

### (3) 메인 페이지
<img src="./docResource/img/mainPage.png" alt="메인 페이지" style="width: 40%;" />

### (4) 도서 검색 페이지
#### [도서 검색]
<img src="./docResource/img/searchPage.png" alt="도서 검색 페이지" style="width: 40%;" />

#### [도서 상세 페이지]
<img src="./docResource/img/searchDetailPage.png" alt="도서 상세 페이지" style="width: 40%;" />

#### [토론방 및 내 서재 추가]
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/forumRegistration.png" alt="토론방 도서 등록">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/archiveRegistration.png" alt="내 서재 추가">
        </td>
    </tr>
    <tr>
        <td align="center">
            도서 검색 페이지에서 토론방 도서 등록
        </td>
        <td align="center">
            도서 검색 페이지에서 내 서재에 도서 추가
        </td>
    </tr>
</table>

### (5) 내 서재 페이지
<img src="./docResource/img/archive.png" alt="내 서재 페이지" style="width: 40%;"/>

### (6) 도서 기록 페이지
#### [도서 기록 리스트]
<img src="./docResource/img/note.png" alt="도서 기록 리스트" style="width: 40%;" />

#### [도서 기록 작성 및 템플릿 제공]
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/writingNote.png" alt="도서 기록 작성">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/noteTemplate.png" alt="템플릿 질문">
        </td>
    </tr>
    <tr>
        <td align="center">
            도서 기록 작성 화면
        </td>
        <td align="center">
            도서 기록 템플릿 선택 화면
        </td>
    </tr>
</table>

#### [모아 보기]
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/gatheringNote.png" alt="도서 기록 모아 보기">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/changingNoteOrder.png" alt="도서 기록 순서 변경">
        </td>
    </tr>
    <tr>
        <td align="center">
            도서 기록 리스트 모아보기(하나의 감상문)
        </td>
        <td align="center">
            도서 기록 리스트 순서 변경
        </td>
    </tr>
</table>

### (7) 마이페이지
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/myPage.png" alt="마이페이지">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/myProfilePage.png" alt="마이프로필 페이지">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/myProfileEdit.png" alt="마이프로필 수정 페이지">
        </td>
    </tr>
    <tr>
        <td align="center">
            마이페이지
        </td>
        <td align="center">
            마이프로필
        </td>
        <td align="center">
            마이프로필 수정
        </td>
    </tr>
</table>

### (8) 퀘스트 및 독서성과 페이지
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/expPage.png" alt="퀘스트 및 독서성과 페이지">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/questInfo.png" alt="퀘스트 정보">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/rewardInfo.png" alt="독서 성과 메달 정보">
        </td>
    </tr>
    <tr>
        <td align="center">
            퀘스트 및 독서성과 전체 페이지
        </td>
        <td align="center">
            퀘스트 정보 modal
        </td>
        <td align="center">
            독서 성과 메달 수여 정보 modal
        </td>
    </tr>
</table>

### (9) 독서 토론방 리스트 페이지
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/entireForumPage.png" alt="전체 토론방 리스트">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/myForumList.png" alt="내 토론방 리스트">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/makeForum.png" alt="독서 토론방 만들기">
        </td>
    </tr>
    <tr>
        <td align="center">
            전체 독서 토론방 리스트
        </td>
        <td align="center">
            내 독서 토론방 리스트
        </td>
        <td align="center">
            독서 토론방 만들기
        </td>
    </tr>
</table>

### (9) 독서 토론방(채팅)
<table style="width: 100%;">
    <tr>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/forumChat.png" alt="독서 토론방">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/readingShareModal.png" alt="독서 기록 공유 모달">
        </td>
        <td align="center" style="width: 25%;">
            <img src="./docResource/img/userList.png" alt="독서 토론방 내 유저 리스트">
        </td>
    </tr>
    <tr>
        <td align="center">
            독서 토론방 내 화면
        </td>
        <td align="center">
            독서 기록 공유 modal
        </td>
        <td align="center">
            독서 토론방 내 유저 리스트
        </td>
    </tr>
</table>

[맨 위로](#top)

## 8. 수정 사항

### 2025.05.29 메인페이지 SearchIcon 수정(by 이영섭)
배포 후 진입점 문제에 따라 메인페이지 경로를 /에서 /main 경로로 수정<br>
이에 따라 Layout내의 SearchIcon이 나타나는 조건문을
```
    const isMainPage = location.pathname === "/";

    return (
        ...
                    {isMainPage && ( // 메인 페이지일 때만 렌더링
                        <IconButton sx={{ padding: 0 }} className={styles.iconBtn}>
                            <Link to="/main/search">
                                <SearchIcon sx={{ fontSize: "3rem", color: "#739CD4" }} />;
                            </Link>
                        </IconButton>
                    )}
        ...
    )
```

에서

```
    const isMainPage = location.pathname === "/main";
```
로 수정

### 2025.05.29 Exp 페이지 수정(by 이영섭)
**(1) 퀘스트 진행률 value 수정**<br>
기존 진행률 조건은
```
    const progress = isCompleted ? 100 : (currentCount / 7) * 100; 
```
이었으나 횟수가 7회 이상일때는 progress 바가 초과되고,<br>
또한 isCompleted가 유저가 확인 버튼을 눌렀는지 여부를 묻는 조건으로 불필요한 조건이었음<br>
이에 따라
```
    const progress = currentCount >= 7 ? 100 : (currentCount / 7) * 100; 
```
로 수정

**(2) QuestButton 수정**
```
    if (isCompleted && currentCount === 7) return QuestButtonStyle.completeBtn;
    if (!isCompleted && currentCount === 7) return QuestButtonStyle.confirmBtn;
```
에서 currentCount가 7회 이상일 수 있기 때문에

```
    if (isCompleted && currentCount >= 7) return QuestButtonStyle.completeBtn;
    if (!isCompleted && currentCount >= 7) return QuestButtonStyle.confirmBtn;
```
로 조건 수정

**(3) 데이터 통신 수정**<br>
기존에 POST 요청으로 유저가 확인 버튼을 누르면 경험치 증가가 이루어진다 했으나<br>
실제 서버에서 PUT 요청으로 받아들여 Rest API 방식을 수정

### 2025.05.30 ForumMake 페이지(독서토론방 만들기) 수정(by 이영섭)
useForm과 Controller를 사용하여 TextField의 reRendering 최소화

### 2025.05.30 Toastify 도입(by 이영섭)
기존 독서 토론방 만들기, 토론방 참여, 프로필 수정시 발생했던 alert 알림을
toast 팝업으로 교체

### 2025.06.02 독서 토론방 페이지의 메시지 입력창 컴포넌트 분리(by 이영섭)
독서 토론방(채팅방)에서 메시지 보내기 버튼 클릭 후 버튼이 사라지는 현상이 발생됨에 따라<br>
메시지 입력의 TextField, button들을 각 컴포넌트로 분리 및 root element에 css style 적용으로
문제해결<br>
> 해당 문제 해결 관련 설명 글<br> 
https://velog.io/@herjun802/MUI-CSS-in-JS%EC%99%80-class%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-csswith-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95

### 2025.06.03 환경 변수 누락 관련 yml 파일 수정 및 aws 설정 변경(by 이영섭)
> 해당 문제 해결 관련 설명 글<br> 
https://velog.io/@herjun802/Github-Action-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0

### 2025.06.07 Netlify 관련 Mixed Content error 해결(by 이영섭)
netlify.toml 설정 파일을 통해 Mixed Content error 해결
> 해당 문제 해결 관련 설명 글<br>
https://velog.io/@herjun802/Mixed-Content-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0


### 2025.06.09 내 토론방 리스트에서 토론방 참여하기 디버깅 완료(by 이영섭)
FetchMyRoomData 함수(데이터 통신 함수)의 반환 데이터를 response.data에서 response로 변경하여 내 토론방 리스트에서 토론방 참여 기능 구현 완료<br>
> 해당 문제 해결 관련 설명 글<br>
https://velog.io/@herjun802/Axios-%EC%9D%91%EB%8B%B5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0

### 2025.06.09 Websocket connection 실패 문제 해결(by 이영섭)
채팅방 입장시 websocket connection하는 api 경로를 `wss`에서 `ws`로 수정
> 해당 문제 해결 관련 설명 글<br>
https://velog.io/@herjun802/Websocket-%EC%97%B0%EA%B2%B0-%EC%8B%A4%ED%8C%A8-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0

### 2025.06.10 독서 기록 공유 버튼 문제 해결 및 상태별 조건부 랜더링(by 이영섭)
독서 토론방(채팅방)에서 독서 기록 공유 버튼 클릭시 TypeError 발생<br>
이에 따라 refetch 함수에 await를 사용하여 해결<br>
또한, 상태별(isLoading, isError, data) 조건부 rendering을 통해 유저 경험 향상<br>
> 해당 문제 해결 관련 설명 글<br> 
https://velog.io/@herjun802/%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%A8%EC%88%98%EC%9D%98-awaitwith-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0

### 2025.06.11 ~ 06.12 독서 기록 공유 모달의 이벤트 버블링 현상 억제와 aria-hidden 해결(by 이영섭)
#### 1. 독서 기록 공유 모달의 이벤트 버블링 현상 억제

기존 독서 기록 공유 모달에서는 Checkbox 체크시 Accordion의 확장/축소 이벤트가 발생<br>
이에 따라 MemoCheckbox라는 별도의 컴포넌트로 분리를 통해 해결<br>
> 해당 문제 해결 관련 설명 글<br> 
https://velog.io/@herjun802/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81event-bubbling-%ED%98%84%EC%83%81%EA%B3%BC-%EC%96%B5%EC%A0%9C


#### 2. aria-hidden 경고 해결

자손 요소에 focus가 유지되는 상태에서 부모요소에 aria-hidden이 적용됨으로써 브라우저 콘솔에 접근성 문제에 대한 에러 발생<br>
이에 따라<br>
(1) 독서 기록 공유 모달의 dialog와 같은 경우 disableRestoreFocus prop 사용<br>
(2) 독서 토론방 만들기 페이지의 DatePicker의 경우 body태그로 focus가 이동하도록 만들어 자동적으로 DatePicker의 focus를 잃게 만드는 커스텀 함수를 적용<br>


[맨 위로](#top)
