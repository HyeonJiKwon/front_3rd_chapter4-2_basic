🔴 노션 내에 더 상세하게 작성되어있습니다.(아래 제목 클릭) 🔴

# [웹 성능 최적화 보고서]( https://excessive-feta-37a.notion.site/14a172880c3a801c9bfdeb6e5a05396e)


본 보고서는 Vercel에 배포된 바닐라 JavaScript(Vanilla JS) 프로젝트의 웹 성능 최적화 과정을 상세히 기술합니다. PageSpeed Insights를 활용하여 측정된 주요 성능 지표(FCP, TBT, LCP, CLS)를 분석하고, 이를 개선하기 위한 구체적인 조치와 그 결과를 제시합니다.

- github Repo: https://github.com/HyeonJiKwon/front_3rd_chapter4-2_basic
- 배포 url : https://front-3rd-chapter4-2-basic-puzlupo1t-hyeonjikwons-projects.vercel.app/

# **1. 성능 지표 개요**

웹 성능 최적화는 사용자 경험을 향상시키기 위해 필수적인 과정입니다. 본 프로젝트에서는 다음과 같은 핵심 성능 지표를 중심으로 최적화를 진행하였습니다.

## **1.1 FCP (First Contentful Paint)**

- **정의**: 사용자가 페이지를 요청한 후 브라우저가 첫 번째 텍스트나 이미지와 같은 실제 콘텐츠를 렌더링하는 데 걸리는 시간.
- **의미**: 빠른 FCP는 사용자가 페이지가 로드되고 있음을 즉각적으로 인지할 수 있게 하여 긍정적인 첫인상을 제공합니다.

## **1.2 LCP (Largest Contentful Paint)**

- **정의**: 페이지 로드 중 가장 큰 콘텐츠 요소(예: 이미지, 비디오, 텍스트 블록)가 렌더링되는 데 걸리는 시간.
- **의미**: 빠른 LCP는 사용자가 페이지의 주요 콘텐츠를 신속하게 인지할 수 있도록 합니다.

## **1.3 CLS (Cumulative Layout Shift)**

- **정의**: 페이지 로드 중 예기치 않게 발생하는 레이아웃 변화의 누적 점수.
- **의미**: 낮은 CLS는 레이아웃이 안정적임을 나타내어 사용자 경험을 향상시킵니다.

# **2. 초기 분석**

초기 github action을 통한 lighthouse 이슈 보고서를 통해 다음과 같은 성능 지표가 도출되었습니다:

### 🎯 Lighthouse 점수

| 카테고리 | 점수 | 상태 |
| --- | --- | --- |
| Performance | 72% | 🟠 |
| Accessibility | 82% | 🟠 |
| Best Practices | 75% | 🟠 |
| SEO | 82% | 🟠 |
| PWA | 0% | 🔴 |

### 📊 Core Web Vitals (2024)

| 메트릭 | 설명 | 측정값 | 상태 |
| --- | --- | --- | --- |
| LCP | Largest Contentful Paint | 14.63s | 🔴 |
| INP | Interaction to Next Paint | N/A | 🟢 |
| CLS | Cumulative Layout Shift | 0.011 | 🟢 |

초기 PageSpeed Insights 보고서를 통한 배포된 페이지의 성능 지표는 다음과 같습니다. 

![스크린샷 2024-11-26 오후 8.52.49.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/465661a3-8141-49e1-91fc-0187413be620/939af79a-0120-4dda-af9a-6b00d52c7242/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-11-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.52.49.png)

# **3. 최적화 조치**

## **3.1 FCP (First Contentful Paint) 최적화**

### **3.1.1 이미지 최적화**

- 조치: [Squoosh](https://squoosh.app/)를 활용하여 JPG 파일을 WebP 형식으로 변환하여 이미지 크기를 줄였습니다.
https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/c4f36504872b9cd068f4d57d048e200156955563
<img width="1197" alt="스크린샷 2024-11-26 오후 11 12 39" src="https://github.com/user-attachments/assets/b511b17a-1c43-4f98-b357-baef0be3af6f">

- **주요 분석**
    - **효율적인 파일 크기 감소**:
        - Hero_Desktop.jpg 파일은 약 91.7% 크기 감소를 보여 가장 큰 최적화를 기록했습니다.
        - vr 시리즈 이미지(vr1, vr2, vr3) 또한 평균 86~92%의 감소율을 보여 최적화 효과가 매우 우수했습니다.
    - **WebP 변환의 성능 차이**:
        - PNG 이미지를 WebP로 변환한 경우(menu_icon.png) 오히려 파일 크기가 증가한 것을 확인했습니다(-4.9% 증가). PNG는 파일 특성에 따라 WebP 변환이 효과적이지 않을 수 있습니다.
    - **로딩 시간 단축**:
        - 대부분의 이미지에서 로딩 시간이 최적화 후 크게 단축되었습니다. 예를 들어, Hero_Desktop.jpg의 로딩 시간이 621ms에서 76ms로 약 87.8% 줄었습니다.
        - vr 시리즈 이미지 또한 평균적으로 로딩 시간이 80~85% 단축되었습니다.

### **3.1.2 반응형 이미지 적용**

- 조치: `<img>` 태그를 `<picture>` 태그로 변경하여 뷰포트에 맞는 적절한 이미지가 로드되도록 설정하였습니다.
https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/05ac838858b4e464d5b2b089a2dd1cb063c323fc
    
    ```jsx
    // as-is
    <img class="desktop" src="images/Hero_Desktop.webp" />
    <img class="mobile" src="images/Hero_Mobile.webp" />
    <img class="tablet" src="images/Hero_Tablet.webp" />
    
    // to-be
    <picture>
        <source width="576" height="576" media="(max-width: 575px)" srcset="images/Hero_Mobile.webp">
        <source width="960" height="770" media="(min-width: 576px) and (max-width: 960px)" srcset="images/Hero_Tablet.webp">
        <img width="1920" height="893" src="images/Hero_Desktop.webp">
    </picture>
    ```
    
- 분석: 뷰포트 크기에 따라 적절한 이미지가 로드되어 불필요한 이미지 로딩을 감소시켰습니다.
<img width="1194" alt="스크린샷 2024-11-26 오후 11 13 09" src="https://github.com/user-attachments/assets/9f8c18c6-3489-487c-98f4-ebf4fb2b7126">


### **3.1.3 자바스크립트 최적화**

- **조치**: 초기 로딩에 꼭 필요한 자바스크립트만 먼저 로드하고, 나머지는 비동기적으로 로드하도록 설정하였습니다.
https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/74302364321307aaf0c0ed81dbb2c60bfad55a5d
    
    ```jsx
    <script defer type="text/javascript" charset="UTF-8">
        document.addEventListener('DOMContentLoaded', function () {
            cookieconsent.run({"notice_banner_type":"simple","consent_type":"express","palette":"light","language":"en","page_load_consent_levels":["strictly-necessary"],"notice_banner_reject_button_hide":false,"preferences_center_close_button_hide":false,"page_refresh_confirmation_buttons":false,"website_name":"Performance Course"});
        });
    </script>
    ```
    
- 랜더링 이후 실행되어야 하는 스크립트의 경우 DOMContentLoaded 이벤트를 활용하여 에러 방지 및 지연 로딩을 처리하였습니다.

### FCP 최적화 후 성능 분석

**🎯 Lighthouse 점수**

| 카테고리 | 점수 | 상태 |
| --- | --- | --- |
| Performance | 95% | 🟢 |
| Accessibility | 89% | 🟠 |

## **3.2 LCP (Largest Contentful Paint) 최적화**

### **3.2.1 CSS 및 JS 최적화**

- **조치**: 초기 렌더링에 필요한 최소한의 CSS와 JS만 먼저 로드하고, 나머지는 비동기적으로 로드하였습니다.
    - 외부 font.css 파일에 정의된 폰트 관련 CSS를 인라인으로 포함시킵니다.
    https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/177845d7b3a24c4c40d05673dca63f6351699ef8
    - 외부 스크립트를 참조하는 경우 defer 옵션을 사용하여 페이지가 모두 로드된 이후에 실행되도록 하였습니다.
- **효과**: 렌더링 차단 리소스를 줄여 LCP를 단축시키고, 페이지의 주요 콘텐츠가 더 빨리 로드되도록 하였습니다.

### 3.2.2 **Intersection Observer를 활용하여 효율적인 Lazy Loading 구현**

- 조치 : 상품 이미지에 대해서 lazy-load를 적용하였습니다.
    - 스크립트 내에 `img.loading="lazy"` 를 추가하였는데 오히려 성능이 저하되는 이슈가 있었습니다.(성능 점수 97→92)
        
        https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/6f6f1c7b3a2a66c842b1a3e65e8f3a02ac85c92a
        
    - 모든 상품이미지에 lazy-load가 동적으로 적용되어 나타날 수 있는 이슈로 파악하고 **Intersection Observer**를 도입하였습니다.
    https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/475630599ac6c10c87ab20926e53132ae8a7516c

### **LCP** 최적화 후 성능 분석

**📊 Core Web Vitals (2024)**

| 메트릭 | 설명 | 측정값 | 상태 |
| --- | --- | --- | --- |
| LCP | Largest Contentful Paint | 2.25s | 🟢 |

## **3.3 CLS (Cumulative Layout Shift) 최적화**

### **3.3.1 이미지에 크기 속성 지정**

- **조치**: 이미지 요소에 가로 및 세로 크기를 명시하여 로딩 시 레이아웃 변경을 방지하였습니다.
    
    ```jsx
    <img width="1920" height="893" src="images/Hero_Desktop.webp" alt="Hero_Desktop_Img">
    
    ```
    

### **3.3.2 동적 콘텐츠 공간 확보**

- **조치**: 광고, 동영상, 이미지 등 동적으로 로드되는 콘텐츠에 미리 공간을 할당하여 로딩 시 레이아웃 변경을 방지하였습니다.
https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/db913969a8864fda4635acfd44c954e1a4474874
    
    ```css
    section.best-sellers .product-slider .product .product-picture {
        aspect-ratio: 1.5 / 1;
    }
    ```
    

### **CLS** 최적화 후 성능 분석

**📊 Core Web Vitals (2024)**

| 메트릭 | 설명 | 측정값 | 상태 |
| --- | --- | --- | --- |
| CLS | Cumulative Layout Shift | 0.011 | 🟢 |


## **3.4 접근성 최적화**

### 3.4.1 웹 접근성 지침 준수
<img width="1171" alt="스크린샷 2024-11-26 오후 11 14 27" src="https://github.com/user-attachments/assets/f9212038-4b47-434b-a927-32b80da5f49f">


- **조치**: 웹 접근성 지침을 준수하여 모든 사용자에게 일관된 사용자 경험을 제공하도록 개선하였습니다.
    - img alt 속성 명시
    https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/13ae4cb38cc24a87d8d7fd2b9ef5243f4bbed18b

## 3.5 검색엔진 최적화

### 3.5.1 `meta` 태그 내 설명 추가
<img width="1182" alt="스크린샷 2024-11-26 오후 11 14 13" src="https://github.com/user-attachments/assets/aa9ed22f-9202-4ac2-a6c0-0e9b769f3615">


- 조치: `<meta name="description">` 요소는 페이지 콘텐츠의 요약을 제공합니다. 검색 엔진의 검색 결과에 포함시키는 고품질의 고유한 메타 설명을 추가하면 페이지의 관련성을 높이고 검색 가능성을 높일 수 있습니다. 
https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/7ecfd7a42b21602dd595ffef5ba604ac59208a0b
    
    ```jsx
    <meta name="description" content="front-3rd-chapter4-2-basic-khj.vercel.app">
    ```
    

### 검색엔진 최적화 후 성능 분석

**🎯 Lighthouse 점수**

| 카테고리 | 점수 | 상태 |
| --- | --- | --- |
| SEO | 100% | 🟢 |

## 3.6 Best Practices 개선

### 3.6.1 https:// **프로토콜 명시적 추가**

- 예상 문제점
    - 외부 스크립트를 http:// 프로토콜을 통해 로드할 경우, 보안상의 취약점이 발생할 수 있으며, 브라우저에서 **혼합 콘텐츠(mixed content)** 경고를 유발할 수 있습니다. 이는 사용자 신뢰도 저하와 함께 일부 리소스 로딩 실패로 이어질 수 있습니다.
- **조치**
    - 모든 외부 스크립트의 src 속성에 https://를 명시적으로 추가하여 **보안 연결**을 보장하고, 최신 웹 표준을 준수하도록 설정하였습니다.
    - 속성을 추가하여 스크립트가 HTML 파싱을 차단하지 않고, 문서가 완전히 파싱된 후 비동기적으로 실행되도록 `defer` 속성을 추가하였습니다. 이를 통해 렌더링 차단을 최소화하여 **페이지 로딩 속도**를 개선하였습니다.
    https://github.com/hanghae-plus/front_3rd_chapter4-2_basic/commit/a2575fb5fc0816002aa189c57637d56fc4c0548b

### Best Practices 개선 후 성능 분석

**🎯 Lighthouse 점수**

| 카테고리 | 점수 | 상태 |
| --- | --- | --- |
| Best Practices | 93% | 🟢 |

# **4. 성능 최적화 최종 결과**

### 🎯 Lighthouse 점수

| 카테고리 | 최적화 이전 점수 | 최적화 이후 점수 | 상태 변화 |
| --- | --- | --- | --- |
| Performance | 72% | 100% | 🟠 → 🟢 |
| Accessibility | 82% | 95% | 🟠 → 🟢 |
| Best Practices | 75% | 93% | 🟠 → 🟢 |
| SEO | 82% | 100% | 🟠 → 🟢 |
| PWA | 0% | 0% | 🔴 |

### 📊 Core Web Vitals (2024)

| 메트릭 | 최적화 이전 측정값 | 최적화 이후 측정값 | 상태 |
| --- | --- | --- | --- |
| LCP | 14.63s | 1.81s | 🔴 → 🟢 |
| INP | N/A | N/A | 🟢 |
| CLS | 0.011 | 0.011 | 🟢 |

# **5. 결론**

본 프로젝트는 PageSpeed Insights를 활용한 초기 성능 분석을 바탕으로 FCP, TBT, LCP, CLS 등 주요 성능 지표를 개선하기 위한 다양한 최적화 조치를 시행하였습니다. 이미지 최적화, 반응형 이미지 적용, CSS 및 자바스크립트 최적화, 레이아웃 안정화 등을 통해 웹 페이지의 로딩 속도와 사용자 경험을 크게 향상시킬 수 있었습니다.

# **6. 향후 계획**

- **추가 최적화**: Web Workers 도입, 코드 스플리팅 및 트리 쉐이킹을 통한 자바스크립트 최적화 등 추가적인 성능 개선을 모색합니다.
- **실제 사용자의 경험 확인하기**: PWA의 지표가 없으므로, 추후 실서비스에서의 사용자들의 피드백을 수집하여 실질적인 사용자 경험을 향상시킬 수 있는 방안을 마련합니다.
