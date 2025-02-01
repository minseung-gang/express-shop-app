# 📦 Node.js 프로젝트

<div align="center">
  
이 프로젝트는 **Node.js를 학습하기 위한 목적으로 개발**되었습니다.<br>

Express를 기반으로 한 RESTful 구조를 활용하여 **사용자 인증, 상품 관리, 카테고리 관리** 등의 기능을 구현하였습니다<br>

</div>

---
<br>

## 개발 스택

### Backend 
- Nodejs
- Express
- mongoDB
- mongoose
<br>

## 🚀 주요 기능

### 1️⃣ 사용자 인증 및 로그인
- **소셜 로그인 지원**
  - ✅ **카카오 로그인**
  - ✅ **구글 로그인** 
<br>

- **일반 로그인**
  - ✉️ **이메일과 비밀번호**를 통한 직접 로그인 지원
<br> 

- **인증 기능 구현**
  - 🔐 `passport` 라이브러리 사용 → 인증 로직 관리
  - 📦 `express-session` 라이브러리 사용 → 세션 관리
  - 🔑 `bcryptjs` 라이브러리 활용 → 비밀번호 **해싱 및 복호화** 처리로 보안 강화

---

### 2️⃣ 모든 사용자용 상품 페이지
- 🌍 **모든 사용자**가 접근 가능한 상품 페이지
- 📦 다양한 상품 리스트 조회 및 검색 기능 제공
- 🔍 **상품 상세 페이지**에서 제품 정보 확인 가능

---

### 3️⃣ 관리자 전용 상품 페이지
- 🔒 **관리자 권한**이 있는 사용자만 접근 가능
- 🗂️ 상품 목록 관리 및 편집 기능 제공
- 🚫 일반 유저는 접근 불가 (**관리자 권한 필수**)

---

### 4️⃣ 관리자 전용 카테고리 페이지
- 📂 카테고리 목록 관리
- ➕ 새로운 카테고리 등록 기능
- ✏️ 카테고리 이름 수정 및 삭제 기능
- 🚫 일반 유저는 접근 불가 (**관리자 권한 필수**)

---

### 5️⃣ 관리자 전용 상품 생성 페이지
- 📝 새로운 상품 등록 기능
- 📤 **이미지 업로드 기능** 지원
- ⚡ **이미지 최적화 처리**
  - 📦 `express-fileupload` 라이브러리 사용 → 이미지 업로드 처리
  - 📏 `resize-img` 라이브러리 활용 → **이미지 용량 최소화**
  - 🗂️ 최적화된 이미지는 **별도의 폴더**에 저장하여 효율적인 관리

---

### 6️⃣ 장바구니 페이지
- **상품 상세 페이지**에서 **"장바구니에 추가"** 버튼을 눌러 상품을 장바구니에 추가할 수 있음
- 담은 상품은 **수량 조절(➕/➖)**, **개별 삭제(🗑️ Clear 버튼)**, **전체 삭제(🚀 모두 비우기 버튼)**로 관리 가능
- 🔒 **관리자 권한**이 있어야만 접근 가능

---

<br>

## Testing

|홈|로그인|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/1723b8f0-3031-4ade-b58a-f5d7b4672f03" width="500px" height="340px"> https://youtu.be/TU8AC9ZA_Pg|<img src="https://github.com/user-attachments/assets/5a53a507-1646-4eac-a760-83a2eb385384" width="500px" height="340px">https://youtu.be/TGe3VFwa3kk|
|상품추가|카테고리추가|
|<img src="https://github.com/user-attachments/assets/fda35328-a522-4445-9a16-6dad7a541055" width="500px" height="340px">https://youtu.be/gTZt2k71S7o|<img src="https://github.com/user-attachments/assets/6f8fcefa-be93-4ca2-9b5d-7fce7a254bfb" width="500px" height="340px">https://youtu.be/NRs491XSzr4|
|장바구니|결제|
|<img src="https://github.com/user-attachments/assets/ab236e6d-6425-41c8-a292-521f1416232c" width="500px" height="340px">https://youtu.be/csSAcrBN0_o|<img src="https://github.com/user-attachments/assets/6b189384-4ef2-45c2-b06d-cee2d079a482" width="500px" height="340px">https://youtu.be/fOpZMZW-U4Q|



