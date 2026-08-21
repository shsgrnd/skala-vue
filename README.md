# SKALA Vue Frontend

## 실행 방법

```sh
npm install
npm run dev
```

### 프로덕션 빌드

```sh
npm run build
```

### 코드 검사

```sh
npm run lint
```

## 최종 과제: Never Under Dressed

### 프로젝트 소개

수업에서 만든 날씨 과제를 바탕으로 실시간 날씨와 면접 복장 추천 기능을 추가한 프로젝트입니다. Day 1부터 진행한 Vue 실습과 이전 과제도 한 사이트에서 확인할 수 있도록 정리했습니다.

최종 화면은 무채색을 기본으로 하고 SK Red와 SK Orange를 포인트 색상으로 사용했습니다. 이전 실습 화면은 가능한 한 원래 모습과 기능을 유지했습니다.

### 주요 기능

> - 대한민국 기본 도시 6곳의 실시간 날씨 조회
> - 대한민국 도시 검색 및 `‘검색어’ 도시를 찾을 수 없습니다.` 형식의 실패 문구 표시
> - 검색 오류가 표시된 상태에서 input을 수정하면 API 재요청 없이 오류 상태 즉시 초기화
> - 현재 기온, 체감온도, 습도, 강수량, 풍속 표시
> - 날씨 상세 정보와 Open-Meteo 대기질 정보 제공
> - 즐겨찾기 도시를 검색 중에도 목록에 유지
> - 섭씨·화씨 단위 전환
> - 남성·여성 선택에 따른 면접 복장 추천
> - 성별 변경 시 API 재요청 없이 추천 결과만 계산
> - 메인, 실습, 이전 과제, Troubleshooting을 포함한 Light / Dark Mode
> - Day 1~3 실습 기록과 과제 1~5 아카이브
> - 실제 구현 경험을 정리한 Troubleshooting 문서

### 페이지 및 Router 구성

| 경로                                      | 페이지          | 설명                                |
| ----------------------------------------- | --------------- | ----------------------------------- |
| `/`                                       | 면접 복장 추천  | 실시간 날씨와 오늘의 면접 복장 추천 |
| `/practice/day1`                          | 실습 기록       | Day 1 기본 문법 실습                |
| `/practice/day2`                          | 실습 기록       | Day 2 Composition 및 Component 실습 |
| `/practice/day3`                          | 실습 기록       | Day 3 Store, Axios, UI Library 실습 |
| `/assignments/1`~`/assignments/5`         | 이전 과제       | 날씨 과제 1~5                       |
| `/troubleshooting/1`~`/troubleshooting/7` | Troubleshooting | 문제 해결 기록                      |
| `/weather/:cityId`                        | 날씨 상세       | 실시간 상세 날씨 및 대기질          |
| `/about`                                  | 서비스 소개     | 기존 서비스 소개 View               |
| `/guide`                                  | 옷차림 가이드   | 기존 기온별 옷차림 View             |

식별자가 없는 `/practice`, `/assignments`, `/troubleshooting` 경로는 각 첫 번째 항목으로 이동합니다.

### 화면 구성

```text
App.vue
├── AppNavbar
└── RouterView
    ├── WeatherApiHomeView
    ├── DocumentationLayout
    │   ├── PracticeArchiveView
    │   ├── AssignmentArchiveView
    │   └── TroubleshootingView
    └── WeatherApiDetailView
```

Navbar에는 사이트명, 메뉴, 섭씨·화씨 전환과 테마 버튼을 배치했습니다. 실습과 과제 기록은 `DocumentationLayout`을 함께 사용하고, 모바일에서는 메뉴를 가로로 넘겨 볼 수 있습니다.

### PrimeVue 적용

UI 확장을 위해 PrimeVue를 적용했습니다.

> - `Button`: 검색, 상세보기, 단위 및 테마 전환
> - `InputText`: 대한민국 도시 검색
> - `Card`: 날씨, 현재 날씨, 면접 복장 영역
> - `Tag`: 기온 상태와 화면 정보 표시
> - `Message`: API 및 검색 오류 안내
> - `ProgressSpinner`: 기본 도시 로딩 상태
> - Aura Theme과 기존 `.dark` 상태 연결

성별 선택은 기본 button으로 만들었고, 검색·카드·상태 안내와 로딩 화면에는 PrimeVue 컴포넌트를 사용했습니다.

### Tailwind CSS 적용

Tailwind CSS는 Navbar, 메인 화면, 문서 화면의 간격과 반응형 배치에 사용했습니다. 기존 실습 CSS에 영향을 주지 않도록 theme과 utilities만 불러왔습니다.

```css
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
```

### 기존 실습 및 과제 보존

> - `App_1st.vue`, `App_2nd.vue`, `App_3rd.vue`를 실습 기록으로 유지
> - 과제 1~5의 기존 레이아웃과 기능 유지
> - 실습 화면에서도 Light/Dark Mode가 보이도록 공통 색상 변수 연결
> - 최종 화면은 `FinalWeatherCard.vue`를 사용해 이전 과제 카드와 구분
> - `App_final.vue`는 이전 누적 앱의 백업본으로 보존

### 개인 커스터마이징

> - 실습, 이전 과제, Troubleshooting을 하나의 Router 화면으로 정리
> - URL로 Day, 과제, Troubleshooting 선택 상태 유지
> - 무채색 화면에 SK Red와 SK Orange를 포인트로 사용
> - 선택한 날씨 카드와 현재 날씨, 면접 복장 추천 영역을 구분해 배치
> - `NEVER UNDER DRESSED` Hero와 `Dress the Part. Own the Room.` 문구 추가
> - 성별 선택, 카드 hover와 화면 전환에 간단한 motion 적용
> - 전체 실습 화면에 Light/Dark Mode 적용
> - 검색어를 수정하면 이전 오류만 지우고 도시 목록은 유지

### 최종 화면을 정리하며 수정한 부분

도시 검색 실패 문구가 입력을 바꾼 뒤에도 남아 있어 `clearError()`를 연결했습니다. 이전 실습 화면의 고정 색상은 공통 색상 변수로 바꿔 Dark Mode에서도 읽기 편하게 했고, Navbar와 문서 화면의 정렬도 함께 맞췄습니다.

## Day 1

### 과제 1: Weather Mockup

#### 학습 내용

> - ref를 이용한 반응형 데이터 관리
> - v-for와 :key를 이용한 날씨 카드 반복 출력
> - v-if, v-else-if, v-else 조건부 렌더링
> - :value와 @input을 이용한 한글 입력 처리
> - @click과 .stop 이벤트 수식어 활용
> - CSS 변수와 공통 클래스를 활용한 화면 스타일링

#### 구현 내용

> - 서울, 수원, 부산의 날씨 정보를 카드 형태로 출력
> - 검색창에 입력한 도시명을 실시간으로 표시
> - 날씨 카드를 클릭하면 선택한 도시 정보를 상태 영역에 표시
> - 상세보기 버튼을 클릭하면 날씨 정보를 알림창으로 출력

#### 개인 커스터마이징

> - 체감온도에 따라 주의 상태를 세 단계로 구분
> - 단일 temp 대신 max_temp, min_temp, feel_temp 데이터 추가
> - 기온 기준을 25도 이상/미만의 2단계에서 체감온도 기준 3단계로 확장
> - 카드 선택 시 도시명뿐 아니라 체감온도도 함께 표시
> - 상세보기 알림에 최고·최저 기온과 °C 단위 추가
> - 30도 이상: 빨간색 찜질방 주의
> - 23도 이상 30도 미만: 주황색 더위 조심
> - 23도 미만: 초록색 선선함

#### 실습하면서 수정한 부분

한글 입력 반영을 위해 `:value`와 `@input`을 사용했습니다. 상세보기 버튼에는 `.stop`을 붙여 카드 클릭과 겹치지 않게 했고, 온도 상태와 반복되는 색상은 class와 CSS 변수로 정리했습니다.

## Day 2

### 과제 2: Weather Composition

#### 학습 내용

> - `computed`를 이용한 파생 데이터 생성
> - `watch`를 이용한 특정 상태 변경 감지
> - `watchEffect`를 이용한 반응형 데이터 자동 추적
> - 하나의 계산 결과를 여러 화면에서 재사용하는 방법

#### 구현 내용

> - 반응형 상태 관리
> - 검색어에 따라 도시 목록을 필터링
> - 선택한 도시 정보를 상태 영역에 표시
> - 검색 결과 표시

#### 개인 커스터마이징

> - 최고·최저 기온을 기준으로 옷차림 추천
> - 옷차림 추천을 상태 영역과 상세보기 알림에서 함께 사용
> - 최고 기온 30°C 이상: 반팔/나시 + 손선풍기
> - 최고 기온 23°C 이상 30°C 미만: 반팔/나시
> - 최저 기온 20°C 미만: 얇은 겉옷 추가
> - 최고 기온도 23°C 미만: 얇은 겉옷 추천

#### 실습하면서 수정한 부분

상태 문구의 줄바꿈이 보이도록 `white-space: pre-line`을 적용했습니다. 옷차림 추천은 computed에서 한 번 계산해 상태 영역과 상세보기에서 같이 사용했습니다.

### 과제 3: Weather Component

#### 학습 내용

> - Vue 컴포넌트의 역할과 분리 기준
> - `props`를 이용한 부모에서 자식으로의 데이터 전달
> - `emits`를 이용한 자식에서 부모로의 이벤트 전달
> - `<slot>`을 이용한 공통 레이아웃 재사용
> - `<style scoped>`를 이용한 컴포넌트별 스타일 관리
> - 부모의 반응형 상태가 자식 컴포넌트에 전달되는 과정

#### 구현 내용

> - 기존 Weather Composition 기능을 유지하면서 컴포넌트 분리
> - 부모 컴포넌트에서 날씨 데이터와 반응형 상태 관리
> - 검색창과 날씨 카드를 각각 독립된 컴포넌트로 구성
> - 공통 카드 레이아웃을 슬롯 컴포넌트로 재사용
> - 선택된 도시 정보를 표시하는 상태바를 추가 컴포넌트로 분리

#### 컴포넌트 구성

```text
WeatherParent.vue
├── BaseDashboardCard.vue
│   ├── SearchBar.vue
│   └── WeatherCard.vue
└── WeatherStatusBar.vue
```

#### 컴포넌트 데이터 흐름

- `WeatherParent.vue`
  - 전체 날씨 데이터와 선택 상태 관리
  - 검색 결과와 옷차림 추천을 computed로 계산
  - 자식 컴포넌트의 이벤트 처리

- `BaseDashboardCard.vue`
  - 검색 영역과 날씨 목록의 공통 레이아웃 제공
  - 기본 슬롯을 이용해 부모가 전달한 화면 출력

- `SearchBar.vue`
  - `currentQuery`를 props로 전달받아 검색어 표시
  - 입력값 변경 시 `update-query` 이벤트 발생

- `WeatherCard.vue`
  - `city` 객체를 props로 전달받아 도시 정보 표시
  - 카드 클릭 시 `select-card` 이벤트 발생
  - 상세보기 클릭 시 `click-detail` 이벤트 발생

- `WeatherStatusBar.vue`
  - `selectedCityInfo`를 props로 전달받아 선택 도시 정보 표시
  - 상태바 전용 디자인을 scoped style로 관리
  - 별도의 상태 변경 없이 화면 출력만 담당

#### 개인 커스터마이징

> - 검색 결과가 없을 때 검색어가 포함된 안내 문구 출력
> - 상태 표시 영역을 `WeatherStatusBar` 컴포넌트로 추가 분리

#### 실습하면서 수정한 부분

자식에서 선택한 도시 객체를 emit하고 부모의 `selectedCity`에 저장하도록 바꿨습니다. 검색어는 props와 `update-query` 이벤트로 주고받았고, 반복되는 카드 틀은 `BaseDashboardCard`의 slot으로 묶었습니다.

## Day 3

### 과제 4: Weather Router

#### 학습 내용

> - `createRouter`와 `createWebHistory`를 이용한 Vue Router 설정
> - `RouterLink`와 `RouterView`를 이용한 화면 전환
> - 동적 경로 파라미터를 활용한 상세 페이지 구성
> - `useRoute`를 이용한 params 및 query 접근
> - `useRouter`와 `router.push()`를 이용한 Programmatic Navigation
> - 동적 import를 이용한 Route Lazy Loading
> - Catch-all Route를 이용한 404 페이지 처리

#### 구현 내용

> - `/`: 지역별 날씨 대시보드
> - `/about`: 날씨 서비스 소개 페이지
> - `/weather/:cityId`: 도시별 상세 기상 정보 페이지
> - `/guide`: 체감온도별 옷차림 가이드 페이지
> - 기존 `WeatherParent` 기능을 `WeatherHomeView`로 이전
> - 상세보기의 `window.alert()`를 Programmatic Navigation으로 변경
> - 검색어를 `?search=` query string에 반영
> - 존재하지 않는 경로 접근 시 NotFound 페이지 출력
> - 최초 진입 시 URL에 있는 검색어 복원
> - Route Parameter의 `cityId`로 Mock Data에서 도시 정보 조회
> - 잘못된 도시 ID 접근 시 데이터가 없다는 안내 문구 출력

#### 라우트 구성

| 경로               | View                | 설명                    |
| ------------------ | ------------------- | ----------------------- |
| `/`                | `WeatherHomeView`   | 날씨 검색 및 도시 목록  |
| `/about`           | `WeatherAboutView`  | 서비스 소개             |
| `/weather/:cityId` | `WeatherDetailView` | 도시별 상세 날씨        |
| `/guide`           | `WeatherGuideView`  | 기온별 옷차림 가이드    |
| `/:pathMatch(.*)*` | `NotFoundView`      | 정의되지 않은 경로 처리 |

#### 개인 커스터마이징

> - 체감온도에 따라 상태바를 hot, warm, cool 색상으로 변경
> - 상태바와 옷차림 가이드의 글자를 배경별로 가시성이 좋은 무채색으로 적용
> - 최고·최저 기온을 이용한 옷차림 추천 기능 유지
> - 검색 URL을 공유하거나 새로고침해도 최초 검색어가 복원되도록 구현
> - 추가 View인 `WeatherGuideView`에서 hot, warm, cool별 옷차림 안내 제공
> - 옷차림 가이드 하단에 메인 대시보드 이동 링크 추가

#### 실습하면서 수정한 부분

상세보기는 alert 대신 `router.push()`로 이동하게 했습니다. 새로고침해도 검색어가 남도록 query string을 사용했고, 없는 주소에는 NotFound 화면이 표시되도록 catch-all route를 추가했습니다.

### 과제 5: Weather Store

#### 학습 내용

> - Pinia의 state, getter, action을 이용한 전역 상태 관리
> - 여러 컴포넌트에서 동일한 Store 상태를 공유하는 방법
> - `computed`를 이용한 섭씨·화씨 표시값 계산
> - Store 상태 변경에 따라 화면이 자동으로 갱신되는 반응형 흐름

#### 구현 내용

> - `configStore`에서 날씨 단위를 섭씨와 화씨로 전환
> - Navigation Bar 옆에 `UnitToggler` 배치
> - 메인 날씨 카드와 상세 날씨의 체감·최고·최저 기온 변환

#### Store 구성

| Store            | 구분   | 속성              | 역할                  |
| ---------------- | ------ | ----------------- | --------------------- |
| `configStore`    | state  | `unit`            | 현재 날씨 단위 저장   |
| `configStore`    | getter | `unitSymbol`      | 현재 단위 기호 계산   |
| `configStore`    | action | `toggleUnit`      | 섭씨와 화씨 전환      |
| `favoritesStore` | state  | `favoriteCityIds` | 즐겨찾기 도시 ID 저장 |
| `favoritesStore` | getter | `favoriteCount`   | 즐겨찾기 개수 계산    |
| `favoritesStore` | action | `toggleFavorite`  | 즐겨찾기 추가 및 제거 |

#### 개인 커스터마이징

> - 과제 4의 Router 화면을 유지하면서 과제 5를 독립 대시보드로 구성
> - 과제 5의 대시보드·서비스 소개·옷차림 가이드를 로컬 탭으로 전환
> - 날씨 카드에 접근 가능한 `☆/★` 즐겨찾기 버튼 추가
> - 즐겨찾기 버튼 클릭 시 카드 선택 이벤트가 발생하지 않도록 `.stop` 적용
> - 대시보드에 getter로 계산한 즐겨찾기 개수 표시
> - 검색어와 일치하지 않아도 즐겨찾기한 도시는 목록에 유지
> - 검색 결과가 없으면 안내 문구와 함께 즐겨찾기 도시만 표시
> - 화씨 전환 시 배지에 표시되는 기준 온도도 함께 변환

#### 실습하면서 수정한 부분

단위 기호 오타를 수정하고 카드와 상세 화면이 `displayTemps`를 사용하도록 연결했습니다. 과제 5는 독립된 대시보드로 남겼고, 즐겨찾기 버튼에는 `.stop`을 적용했습니다.

### 과제 6: Weather Axios

#### 환경 변수 설정

로컬 Vercel 실행 또는 Vercel 프로젝트 환경변수에 OpenWeather API 키를 설정한다.

```dotenv
OPENWEATHER_API_KEY=your_openweather_api_key
VITE_OPEN_METEO_AIR_QUALITY_URL=https://air-quality-api.open-meteo.com/v1/air-quality
VITE_JSONPLACEHOLDER_API_URL=https://jsonplaceholder.typicode.com/posts
```

`.env.local`은 `*.local` ignore 규칙으로 버전 관리에서 제외한다. 저장소에는 실제 키 대신 예시 키를 담은 `.env.example`을 포함한다. 브라우저는 `/api/weather`만 호출하며 Vercel Serverless Function이 OpenWeather 요청을 중계한다.

#### 학습 내용

> - Axios를 이용한 `/api/weather` Serverless Function 요청
> - 서버에서 Geocoding API로 도시명을 위도·경도로 변환하는 방법
> - Pinia action에서 비동기 데이터와 로딩·오류 상태를 관리하는 방법
> - Router, Store, Axios를 하나의 누적 애플리케이션에서 연동하는 방법

#### 구현 내용

> - 앱 최초 진입 시 서울, 부산, 수원, 광주, 대전, 대구의 실시간 날씨를 병렬 조회
> - 대한민국 도시명을 검색하면 좌표를 조회한 뒤 해당 도시의 현재 날씨를 목록에 추가
> - 실제 API 응답을 기존 날씨 카드 형식으로 변환해 UI 컴포넌트 재사용
> - 상세 페이지 URL에 도시 ID와 좌표를 전달해 새로고침 후에도 날씨를 다시 조회
> - API 키 누락, 도시 검색 실패, 일부 기본 도시 조회 실패를 화면 메시지로 안내
> - OpenWeather API 키는 서버 환경변수로, 공개 Open-Meteo와 JSONPlaceholder endpoint는 Vite 환경변수로 관리
> - Open-Meteo Air Quality API로 상세 화면에 PM10, PM2.5, 자외선 및 대기질 지수 표시

#### 개인 커스터마이징

> - 과제 5의 단위 변환과 즐겨찾기를 실제 날씨 데이터에도 그대로 적용
> - 검색 중에도 즐겨찾기한 도시는 결과 목록에 유지
> - 이미 조회한 도시를 다시 검색하면 중복 카드 대신 기존 데이터를 갱신
> - 기본 도시 중 일부 요청이 실패해도 성공한 도시의 카드는 유지
> - 검색 결과가 없으면 `‘검색어’ 도시를 찾을 수 없습니다.` 형식으로 입력값을 포함한 안내 표시
> - 검색어를 수정하거나 삭제하면 API를 다시 호출하지 않고 이전 검색 오류만 즉시 제거
> - 별도 키가 필요 없는 외부 API를 연동하고 대기질 데이터 출처를 화면에 표시
> - `App_exercise.vue`에 과제 1~5를 보존하고 `App.vue`는 최종 누적 Router 앱으로 구성

#### 실습하면서 수정한 부분

브라우저 번들에 API 키가 들어가지 않도록 `/api/weather`에서 OpenWeather 요청을 대신 처리했습니다. 도시 검색은 한국 결과를 다시 확인하고, 기본 도시 요청은 `Promise.allSettled`로 일부 성공도 화면에 남겼습니다. 상세 화면은 URL의 좌표로 새로고침 후 데이터를 복원합니다.

대기질 데이터 출처: [Open-Meteo](https://open-meteo.com/) · CAMS

## 최종 과제: 날씨 기반 면접 복장 추천

### 구현 목표

실제 OpenWeather 날씨를 분석해 선택 도시와 성별에 맞는 면접 복장을 추천한다. 기존 도시 검색, 날씨 카드, 즐겨찾기, 섭씨·화씨 변환, Router 상세 화면과 Open-Meteo 대기질 기능은 그대로 유지한다.

### 화면 구성

기본 도시를 불러온 뒤 서울을 먼저 선택하고, 다른 카드를 누르거나 도시를 검색하면 추천 대상이 바뀝니다. 데스크톱에서는 날씨 목록과 현재 날씨·추천 결과를 나란히 보여주고, 모바일에서는 한 줄씩 세로로 배치했습니다.

추천에는 실제 기온보다 체감온도를 우선 사용합니다. 습도, 비·눈, 날씨 상태와 바람도 함께 확인해 상의, 하의, 아우터, 신발, 준비물과 Tip을 표시합니다. 성별을 바꿀 때는 API를 다시 호출하지 않고 기존 날씨 데이터로 추천만 다시 계산합니다.

OpenWeather 응답에 `rain`, `snow` 같은 값이 없을 때도 화면이 멈추지 않도록 기본값을 사용했습니다. 여러 날씨 조건에서 같은 준비물이나 Tip이 겹치면 한 번만 보이도록 처리했습니다.

### 개인 커스터마이징

> - 일반 외출복 추천을 면접 상황에 맞는 단정한 복장 추천으로 확장
> - 남성·여성 선택으로 같은 날씨에서 복장 결과만 즉시 전환
> - 라이트·다크 모드를 추가하고 기존 CSS 변수를 활용해 스타일 변경 범위 최소화
> - 기본 도시 서울 자동 선택으로 최초 화면부터 추천 결과 제공
> - 비·눈이 API 응답에 없어도 optional chaining과 기본값으로 처리
> - 강수량과 `weather.main`을 함께 분석해 강수량이 누락된 Rain 상태도 반영
> - 고습도, 폭우, 눈, 안개, 뇌우와 강풍에 맞는 준비물과 Tip 추가
> - 데스크톱에서는 현재 날씨를 오른쪽 상단에 두고 복장 추천을 그 아래에 배치
> - 모바일에서는 날씨 목록, 현재 날씨, 복장 추천 순서의 1열 반응형 구조 적용
> - 기존 과제용 카드·상태바와 `App_exercise.vue` 기능 유지

### 만들면서 수정한 부분

처음에는 성별과 모든 날씨 조건을 한곳에서 처리하려 했지만 읽기 어려워져 날씨 분석과 의류 데이터를 나눴습니다. 강수 필드가 없는 응답에는 기본값을 사용했고, 준비물과 Tip은 중복을 제거했습니다. Dark Mode는 기존 색상 변수를 이용해 적용하고 이전 과제의 상태바와 카드는 그대로 남겼습니다.

## 배포

- 서비스 주소: https://skala-vue-chi-puce.vercel.app/
- GitHub 저장소: https://github.com/shsgrnd/skala-vue
