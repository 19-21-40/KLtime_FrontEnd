# 광운대학교 학생 맞춤형 강의 및 시간표 추천 웹 서비스 Front-end
<img width="209" alt="스크린샷 2023-01-10 오후 6 29 38" src="https://user-images.githubusercontent.com/99861250/211513787-c848504d-e681-4f8c-b207-65ffd8b2d0d1.png">
<img src="https://img.shields.io/badge/version-v1.0.0-red"/>

## 관련 링크

* Front-end Github
  * [Front-end 링크](https://github.com/19-21-40/front-prototype/blob/master/README.md "광운대학교 학생 맞춤형 강의 및 시간표 추천 웹 서비스 Front-end")
* Back-end Github
  * [Back-end 링크](https://github.com/19-21-40/back_prototype/blob/master/README.md "광운대학교 학생 맞춤형 강의 및 시간표 추천 웹 서비스 Back-end")
* Design
  * [Figma 링크](https://www.figma.com/proto/HPynkaqC25nf0ASySwoQ9W/%EC%B0%B8%EB%B9%9B%EB%B3%B4%EC%A1%B0-UI%2FUX?node-id=127%3A645&starting-point-node-id=12%3A1510)

## 👥 팀 소개

**Front-End**

* 신재민
* 이성훈

**Back-End**

* 나부겸
* 이성훈
* 김수연


## 📖 프로젝트 소개

**구현 계기**

* 시간표 작성시 학생의 졸업요건 및 선후수체계 등 여러 조건들을 검사하고 작성해야 하는 번거로움이 있습니다.
* 여러 조건들을 검사하고 시간표를 작성했지만 학생의 실수로 수강신청을 진행하지 못 할 경우 학생에게 불이익이 발생할 수 있습니다.
* 위와 같은 여러 문제들을 해결하고 학생들에게 여러 편의 기능들을 제공하기 위하여 위 프로젝트를 시작했습니다.
 
**구현 목표**

* 사용자에 따른 졸업에 필요한 이수 학점을 계산하고, 사용자가 놓칠 수 있는 요소들(타학과 과목, 선/후수 과목, 외국인 전용 과목)에 대한 정보와 유저들의 정보를 기반으로 강의를 추천하며 시간표 작성에 관한 여러가지 편의기능을 제공

**기대 효과**

* 광운대학교 학생들을 위한 최적의 시간표 계획 도우미
* 추천 강의/시간표를 통해 빠르고 편리한 시간표 작성
* Klas 연동을 통한 이전 시간표 불러오기의 편의성 재공
* 수강신청에서 일어날 수 있는 여러 문제들의 사전 방지
* 간편한 졸업요건 확인

<img width="918" alt="스크린샷 2023-01-10 오후 5 39 55" src="https://user-images.githubusercontent.com/99861250/211503027-10e32001-7040-4cf9-afd9-528a61aea5d4.png">

## 💻 기능 소개

<details>
<summary>회원가입 및 Klas 연동하기</summary>
<div markdown="1">       
 
![test-min](https://user-images.githubusercontent.com/83166141/212456924-869de349-82d3-430f-b595-19d3d6b6dcc8.gif)

* Klas Time은 회원가입 페이지에서 회원가입이 가능합니다.
* 회원가입 정보를 바탕으로 로그인 진행 가능합니다.
* 로그인 후 광운대학교 정보 사이트인 Klas의 아이디와 비밀번호를 입력하면 Klas와 연동이 가능합니다.
  * Klas 연동하기 기능은 사용자가 이전에 수강한 시간표 정보와 수강한 과목들의 정보 등 여러 정보를 HTTP Request를 통해 수집하여 사용자에게 양질의 정보를 제공합니다.
  * Klas란 광운대학교의 모든 학생들이 가입하여 학교 생활과 관련된 모든 것을 처리하는 사이트입니다.


</div>
</details>

<details>
<summary>마이페이지</summary>
<div markdown="1">       

![mypage-min](https://user-images.githubusercontent.com/83166141/213522619-bc07e114-f182-4005-b37b-593d56d15a91.gif)


* 마이페이지에서는 비밀번호와 전공, 부전공 등을 변경할 수 있습니다.
* 단 기본 사용자 정보(이름,학번)는 변경할 수 없습니다.

</div>
</details>

<details>
<summary>현 이수학점 및 졸업요건 검사</summary>
<div markdown="1">       

![graph-min](https://user-images.githubusercontent.com/83166141/213522479-4009989e-1762-4f57-9249-62922caf62f7.gif)


* 각 과목의 Section에 졸업요건과 현재 이수한 학점을 그래프화 시켜 사용자가 빠르고 편리하게 확인할 수 있습니다.
* 각 Section의 그래프 클릭 시 사용자의 정보를 기반으로 이수해야 할 과목들을 리스트화 시켜 시각적으로 확인할 수 있습니다.

</div>
</details>

<details>
<summary>시간표 관리 및 추천 시간표 추가</summary>
<div markdown="1">       

![recommend-min](https://user-images.githubusercontent.com/83166141/213521698-4dcf40cf-3871-416b-8fd8-dee659109c22.gif)

* Klas에 지정되어 있는 시간표가 메인 시간표로 설정되어 있습니다(메인페이지에 표시되는 시간표).
* 책갈피 버튼을 이용하여 메인 시간표를 지정할 수 있습니다.
* 시간표 선택 부분에서 추천 시간표 버튼 클릭시 유저들의 데이터를 기반으로 작성된 추천 시간표가 추가됩니다.

</div>
</details>

<details>
<summary>강의 추가 및 상세정보, 강의 추천</summary>
<div markdown="1">       

![lecture-min](https://user-images.githubusercontent.com/83166141/213522587-4a944752-8b64-4272-9709-f50acd1847b5.gif)


* 시간표를 자유롭게 수정이 가능합니다.
* 시간표 수정 부분애서 강의 선택시 유의할 점이 있다면 경고창을 띄워 사용자에게 주의를 줍니다.
* 시간표 수정 부분에서 시간표의 강의를 클릭할 시 강의의 상세정보를 띄워줍니다.
* 강의 상세정보의 아래 부분에서 선택한 해당 강의를 듣는 유저들의 데이터를 기반으로 추천 강의를 띄워줍니다.
  * 해당 과목을 들은 학생들이 가장 많이 담은 과목 3가지
  * 해당 과목을 들은 같은 학과, 같은 학년이 가장 많이 담은 과목 3가지

</div>
</details>

## 📝 기술 스택

**Front**

* HTML
* CSS
* JavaScript

**Library**

* React
* React Routor
* Styled Component
* Axios

**Design**

* Figma

## 🗣️ 커뮤니케이션

* GitHub
* Notion
* Zoom, Google Meet
