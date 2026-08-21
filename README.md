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

`Never Under Dressed`는 OpenWeather 실시간 날씨와 면접 복장 추천 기능을 중심으로, Vue 실습 기록과 이전 날씨 과제를 한 사이트에서 확인할 수 있도록 구성한 최종 제출용 웹사이트입니다.

무채색 기반의 미니멀한 UI에 SK Red와 SK Orange를 제한적인 포인트 컬러로 사용했습니다. 기존 실습 및 이전 과제 컴포넌트는 DOM과 레이아웃을 유지한 채 공통 Documentation Layout 안에 삽입했습니다.

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

식별자가 없는 `/practice`, `/assignments`, `/troubleshooting` 경로는 각 첫 번째 항목으로 이동합니다. 선택 정보를 URL에 저장하므로 직접 링크 접근과 새로고침이 가능합니다.

### 공통 Layout

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

Navbar는 왼쪽 사이트명, 화면 중앙 메뉴, 오른쪽 끝 테마 버튼으로 구성됩니다. `DocumentationLayout`은 최대 1180px 너비로 화면 중앙에 배치되며, PC에서 220px sticky Sidebar와 Content의 2열 구조로 표시됩니다. 모바일에서는 Sidebar가 가로 스크롤 탭으로 전환됩니다.

### PrimeVue 적용

제출 화면에 라이선스 알림이 표시되지 않는 마지막 MIT 공개 버전인 `primevue@4.5.5`와 `@primeuix/themes@1.2.5`를 사용합니다.

> - `Button`: 검색, 상세보기, 단위 및 테마 전환
> - `InputText`: 대한민국 도시 검색
> - `Card`: 날씨, 현재 날씨, 면접 복장 영역
> - `Tag`: 기온 상태와 화면 정보 표시
> - `Message`: API 및 검색 오류 안내
> - `ProgressSpinner`: 기본 도시 로딩 상태
> - Aura Theme과 기존 `.dark` 상태 연결

성별 선택은 선택 배경이 좌우로 이동해야 하므로 native button과 CSS transform으로 구성한 segmented control을 사용합니다. 페이지의 검색, 카드, 버튼, 상태 안내와 로딩 UI에는 PrimeVue를 계속 사용합니다.

### Tailwind CSS 적용

Tailwind CSS는 Navbar, 메인 2열 화면, Documentation Layout, 간격 및 모바일 반응형 배치에 사용했습니다. 기존 실습 CSS를 보호하기 위해 Tailwind Preflight는 불러오지 않고 theme과 utilities만 사용했습니다.

```css
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
```

### 기존 실습 및 과제 보존

> - `App_1st.vue`, `App_2nd.vue`, `App_3rd.vue`를 수정하지 않고 동적 컴포넌트로 렌더링
> - 과제 1~5의 기존 DOM, 레이아웃, 간격과 기능 유지
> - 기존 실습·과제의 고정 중립색만 공통 Theme Token으로 교체해 Light/Dark 대비 개선
> - `practice.css`, `exercise.css`의 구조와 크기는 유지하고 색상 변수 연결과 테마 transition만 추가
> - 과제 5의 `WeatherCardStore.vue`는 기능을 유지하고 background, text, border 색상만 테마에 맞게 변경
> - 최종 화면 전용 `FinalWeatherCard.vue`로 기존 과제 카드와 메인 디자인 분리
> - `App_final.vue`는 이전 최종 누적 앱의 백업본으로 보존

### 개인 커스터마이징

> - 실습, 이전 과제, Troubleshooting을 하나의 Router 기반 포트폴리오 사이트로 통합
> - URL을 이용한 Day, 과제, Troubleshooting 선택 상태 유지
> - 무채색 중심에 SK Red와 SK Orange를 제한적으로 사용하는 디자인 토큰 구성
> - 선택한 날씨 카드는 옅은 tint와 작은 SK Red indicator로 표시
> - 현재 날씨를 오른쪽 상단, 면접 복장 추천을 오른쪽 하단에 배치
> - 기존 Store와 추천 계산 로직을 유지하면서 PrimeVue UI로 교체
> - `NEVER UNDER DRESSED` Hero와 `Dress the Part. Own the Room.` 슬로건 적용
> - Navbar의 사이트명은 왼쪽, 메뉴는 중앙, 테마 버튼은 오른쪽 끝에 배치
> - 실습·과제·Troubleshooting 전체 wrapper를 중앙 정렬
> - Hero entrance, section reveal, 카드 hover, 도시 선택과 테마 전환에 절제된 motion 적용
> - 성별 선택을 sliding segmented control로 구성하고 Light/Dark 선택 상태 대비 확보
> - 기존 `--color-*`를 최종 `--site-*` 토큰에 연결해 모든 아카이브 화면에 Light/Dark 적용
> - 검색어 수정 시 기존 검색 오류만 즉시 제거하고 도시 목록은 보존
> - 실제 프로젝트 문제 일곱 가지를 Problem, Error, Cause, Solution, Result, Learned 구조로 문서화

### 최종 UI 문제 및 해결

| 문제                                                                  | 해결                                                                              |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 존재하지 않는 도시 검색 후 input을 지워도 오류가 남음                 | `weatherStore.clearError()`를 input 이벤트에 연결해 API 재요청 없이 오류만 초기화 |
| 기존 실습과 과제의 고정된 흰색·검은색이 Dark Mode와 충돌              | 기존 `--color-*`를 `--site-*` Theme Token에 연결하고 중립색을 CSS 변수로 교체     |
| Element Plus 실습이 Dark Mode에 맞게 변경되지 않음                    | Element Plus의 공식 dark CSS variable을 전역으로 추가                             |
| Troubleshooting code block이 Light Mode에서도 고정된 어두운 배경 사용 | code block의 background, text, border를 사이트 Theme Token으로 변경               |
| Navbar 메뉴와 문서형 페이지가 넓은 화면에서 치우쳐 보임               | Navbar를 3열로 구성하고 Documentation Layout을 최대 1180px로 중앙 정렬            |

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

#### 문제 및 해결

| 문제                                             | 해결                                      |
| ------------------------------------------------ | ----------------------------------------- |
| 한글 입력값이 예상대로 반영되지 않음             | `v-model` 대신 `:value`와 `@input`을 사용 |
| 상세보기 버튼 클릭이 카드 클릭 이벤트까지 전달됨 | `@click.stop`으로 이벤트 전파 방지        |
| 중간 온도 상태가 `cool` 스타일과 겹침            | `warm` 클래스로 분리                      |
| 같은 색상 코드가 여러 곳에서 반복됨              | CSS 변수로 관리해 전체 스타일 통일        |

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

#### 문제 및 해결

| 문제                                                     | 해결                                                      |
| -------------------------------------------------------- | --------------------------------------------------------- |
| 문자열의 `\n`이 상태 영역에서 줄바꿈되지 않음            | `.status-bar`에 `white-space: pre-line` 적용              |
| 상세보기 버튼 클릭 시 카드 클릭 이벤트도 실행됨          | `@click.stop`으로 이벤트 전파 방지                        |
| 같은 옷차림 추천 로직이 여러 곳에서 반복될 가능성이 있음 | `clothingRecommendation` computed에서 한 번 계산해 재사용 |

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

#### 문제 및 해결

| 문제                                                                         | 해결                                                      |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| computed인 `selectedCityInfo`에 이벤트 결과를 직접 대입해 값이 변경되지 않음 | 전달받은 도시 객체를 부모의 `selectedCity`에 저장         |
| 자식에서 문자열을 전달해 도시 정보가 `undefined`로 표시됨                    | `emit('select-card', city)`로 도시 객체 전체를 전달       |
| 상세보기 버튼 클릭 시 카드 선택 이벤트도 실행됨                              | `@click.stop`으로 이벤트 전파 방지                        |
| 자식 컴포넌트에서 부모의 검색어를 직접 수정할 수 없음                        | 검색어는 props로 받고 `update-query` 이벤트로 변경값 전달 |
| 공통 레이아웃 코드가 반복됨                                                  | `BaseDashboardCard`와 기본 슬롯으로 공통화                |
| 부모 컴포넌트에 상태바 마크업과 디자인이 남아 있음                           | `WeatherStatusBar`로 분리하고 계산된 문구만 props로 전달  |

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
> - 검색어를 URL query string에 반영하고 최초 진입 시 검색 상태 복원
> - 상세보기 버튼 클릭 시 alert 대신 도시 상세 페이지로 이동
> - Route Parameter의 `cityId`를 이용해 Mock Data에서 도시 정보 조회
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
> - 체감온도를 기준으로 상태바 디자인을 세 단계로 변경
> - 추가 View인 `WeatherGuideView`에서 hot, warm, cool별 옷차림 안내 제공
> - 옷차림 가이드 하단에 메인 대시보드 이동 링크 추가

#### 문제 및 해결

| 문제                                                  | 해결                                               |
| ----------------------------------------------------- | -------------------------------------------------- |
| 상세보기 클릭 시 alert만 표시되고 URL이 변경되지 않음 | `router.push()`를 사용해 상세 페이지로 이동        |
| 상세 페이지에서 어떤 도시를 표시할지 알 수 없음       | `route.params.cityId`로 Mock Data 조회             |
| 새로고침하면 검색어가 초기화됨                        | query string에서 검색어를 읽어 초기 상태에 반영    |
| 정의되지 않은 주소에서 빈 화면이 출력됨               | Catch-all Route와 `NotFoundView` 추가              |
| 상태바와 옷차림 가이드의 글자 가시성이 떨어짐         | 각 배경에 맞는 무채색 글자와 동일 계열 테두리 적용 |
| 추가 View에서 메인 화면으로 돌아가기 불편함           | `RouterLink`를 이용한 대시보드 홈 링크 추가        |

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

#### 문제 및 해결

| 문제                                            | 해결                                         |
| ----------------------------------------------- | -------------------------------------------- |
| Store의 단위 기호가 표시되지 않음               | `unitSymbol`과 `celsius` 오타 수정           |
| 계산된 온도 대신 원본 섭씨 온도가 출력됨        | `displayTemps` computed 결과를 템플릿에 연결 |
| 과제 4와 5의 `RouterView`가 같은 화면을 출력함  | 과제 5를 독립 대시보드와 로컬 탭으로 구성    |
| 즐겨찾기 버튼 클릭 시 카드 선택 이벤트도 실행됨 | `@click.stop`으로 이벤트 전파 방지           |

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

#### 문제 및 해결

| 문제                                                      | 해결                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| API 키가 클라이언트 번들에서 노출될 수 있음                | 서버 전용 환경변수와 `/api/weather` 함수로 OpenWeather 요청을 중계 |
| 도시 이름만으로는 같은 이름의 해외 도시가 검색될 수 있음  | Geocoding 검색어에 `KR`을 추가하고 국가 코드도 다시 확인            |
| 상세 페이지를 새로고침하면 Store 데이터가 사라짐          | URL query의 위도·경도로 해당 도시 날씨를 다시 요청                  |
| 여러 기본 도시 중 하나가 실패하면 전체 목록이 사라짐      | `Promise.allSettled`로 성공한 요청 결과를 각각 반영                 |
| 검색 실패 안내만으로 어떤 검색어가 실패했는지 알기 어려움 | Geocoding 결과가 없으면 `‘검색어’ 도시를 찾을 수 없습니다.`로 표시  |
| 검색 실패 후 input을 수정해도 이전 오류가 계속 표시됨     | `clearError` action을 input 이벤트에 연결해 오류 상태만 즉시 초기화 |
| 기타 외부 API를 추가하면서 키 관리가 더 복잡해질 수 있음  | 키가 필요 없는 Open-Meteo를 사용하고 기존 도시 좌표를 재사용        |

대기질 데이터 출처: [Open-Meteo](https://open-meteo.com/) · CAMS

## 최종 과제: 날씨 기반 면접 복장 추천

### 구현 목표

실제 OpenWeather 날씨를 분석해 선택 도시와 성별에 맞는 면접 복장을 추천한다. 기존 도시 검색, 날씨 카드, 즐겨찾기, 섭씨·화씨 변환, Router 상세 화면과 Open-Meteo 대기질 기능은 그대로 유지한다.

### 화면 구성

```text
[ 남성 | 여성 ]                                  [ ☀️ / 🌙 ]

┌────────────── 날씨 목록 파트 ──────────────┐  ┌────── 현재 날씨 ─────────┐
│ 대한민국 도시 검색                        │  │ 체감온도·습도·날씨 상태 │
│ 날씨 카드 목록                             │  │ 강수·풍속                │
└────────────────────────────────────────────┘  ├── 오늘의 면접 복장 추천 ─┤
                                                │ 상의·하의·아우터·신발    │
                                                │ 준비물·Tip               │
                                                └──────────────────────────┘
```

> - 기본 도시 로딩 후 서울을 자동 선택
> - 카드 선택 또는 도시 검색 성공 시 추천 대상 도시 변경
> - 데스크톱에서는 검색·카드 목록을 왼쪽에, 현재 날씨와 복장 추천을 오른쪽 위아래로 배치
> - 모바일에서는 검색·카드 목록, 현재 날씨, 복장 추천 순서로 세로 배치
> - 성별 변경 시 날씨 API를 다시 호출하지 않고 추천 결과만 즉시 계산

### 데이터 흐름

```text
OpenWeather API
        ↓
날씨 데이터 정규화
        ↓
체감온도·습도·강수·날씨 상태·바람 분석
        ↓
기본 면접 복장 수준 결정
        ↓
성별별 상의·하의·아우터·신발 매핑
        ↓
습도·비·눈·강풍 준비물과 Tip 조합
        ↓
최종 면접 복장 추천 출력
```

### 날씨 분석 기준

| 분석 항목 | 구분                                                                   |
| --------- | ---------------------------------------------------------------------- |
| 체감온도  | 30℃ 이상, 25~29℃, 20~24℃, 15~19℃, 10~14℃, 5~9℃, 5℃ 미만                |
| 습도      | DRY 0~39%, NORMAL 40~69%, HIGH 70~84%, VERY_HIGH 85~100%               |
| 비        | 없음, 1mm/h 미만, 1~5mm/h 미만, 5~10mm/h 미만, 10mm/h 이상             |
| 날씨 상태 | Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow, Mist, Fog            |
| 바람      | NORMAL 5m/s 미만, WINDY 5~8m/s, STRONG 8~12m/s, VERY_STRONG 12m/s 이상 |

추천의 기본 온도는 실제 기온보다 체감온도를 우선한다. `rain['1h']`, `snow['1h']`, `weather[0]`, `wind`가 누락돼도 기본값을 사용해 화면이 중단되지 않도록 처리했다.

### 추천 데이터 구조

```js
{
  top: '얇은 긴팔 셔츠',
  bottom: '여름용 슬랙스',
  outer: '여름용 정장 재킷',
  shoes: '단정한 구두',
  accessories: ['접이식 우산'],
  tips: ['이동 중에는 재킷을 벗고 면접 장소에서 착용하세요.']
}
```

준비물과 Tip을 배열로 관리해 더위, 높은 습도, 비와 강풍처럼 여러 조건이 동시에 발생해도 안내를 누적할 수 있다.

### 상태 및 컴포넌트 구성

| 파일                       | 역할                                                                         |
| -------------------------- | ---------------------------------------------------------------------------- |
| `configStore.js`           | 섭씨·화씨, 남성·여성, 라이트·다크 상태와 action 관리                         |
| `weatherStore.js`          | OpenWeather 요청, 날씨 데이터 정규화와 검색 오류 초기화                      |
| `outfitRecommendation.js`  | 날씨 분석, 성별 의류 매핑과 최종 추천 생성                                   |
| `WeatherApiHomeView.vue`   | 서울 자동 선택, 날씨 목록과 현재 날씨·추천 영역, 성별 segmented control 연결 |
| `InterviewOutfitPanel.vue` | 구조화된 면접 복장 결과 출력                                                 |
| `App.vue`                  | 테마 class 연결과 Router shell                                               |

### 개인 커스터마이징

> - 일반 외출복 추천을 면접 상황에 맞는 단정한 복장 추천으로 확장
> - 남성·여성 segmented button으로 같은 날씨에서 복장 결과만 즉시 전환
> - 라이트·다크 모드를 추가하고 기존 CSS 변수를 활용해 스타일 변경 범위 최소화
> - 기본 도시 서울 자동 선택으로 최초 화면부터 추천 결과 제공
> - 비·눈이 API 응답에 없어도 optional chaining과 기본값으로 안전하게 처리
> - 강수량과 `weather.main`을 함께 분석해 강수량이 누락된 Rain 상태도 반영
> - 고습도, 폭우, 눈, 안개, 뇌우와 강풍 Tip을 배열로 조합하고 중복 제거
> - 데스크톱에서는 현재 날씨를 오른쪽 상단에 두고 복장 추천을 그 아래에 배치
> - 모바일에서는 날씨 목록, 현재 날씨, 복장 추천 순서의 1열 반응형 구조 적용
> - 기존 과제용 카드·상태바·`App_exercise.vue`의 DOM과 기능은 유지하고 테마 중립색만 통일

### 문제 및 해결

| 문제                                                                | 해결                                                                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 성별과 날씨 조건을 한 if문에 작성하면 수정하기 어려움               | 날씨 분석, 성별 의류 데이터와 보정 로직을 분리                              |
| 성별 변경 때마다 API를 호출할 가능성이 있음                         | Pinia 성별 상태와 기존 날씨 객체를 이용한 computed 추천 적용                |
| 강수량 필드가 없는 응답에서 오류가 발생할 수 있음                   | `rain?.['1h'] ?? 0`, `snow?.['1h'] ?? 0`으로 정규화                         |
| 강수량이 없지만 `weather.main`이 Rain인 경우를 놓칠 수 있음         | 날씨 main과 강수량을 함께 분석해 최소 약한 비로 판정                        |
| 여러 날씨 보정에서 준비물과 Tip이 중복될 수 있음                    | `Set`을 이용해 중복 제거 후 배열로 반환                                     |
| 다크 모드를 위해 기존 CSS 전체를 다시 작성할 수 있음                | 최상위 `dark` class와 기존 CSS 변수 재정의만 적용                           |
| 기존 실습·과제의 background와 text가 서로 다른 테마 기준을 사용함   | legacy `--color-*`를 사이트 `--site-*` 토큰에 연결하고 고정 중립색만 변수화 |
| 기존 상태바를 구조화된 추천에 맞게 변경하면 이전 과제에 영향이 생김 | 최종 앱 전용 `InterviewOutfitPanel`을 추가하고 공용 상태바 보존             |

## 배포

- 서비스 주소:
- GitHub 저장소: https://github.com/shsgrnd/skala-vue
