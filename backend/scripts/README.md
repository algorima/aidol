# Database Seeding Scripts

이 폴더(`backend/scripts`)는 로컬 개발 환경에서 데이터베이스에 초기 더미 데이터를 주입하기 위한 스크립트들을 포함하고 있습니다.

## 실행 방법

프로젝트 루트(`backend`)에서 실행하는 것이 아니라, **`backend` 디렉토리 내부**에서 아래 명령어를 실행해야 합니다.

가상환경 설치
```bash
# (backend 디렉토리에서)
poetry install
```
스크립트 실행
```bash
# (backend 디렉토리에서)
poetry run python scripts/seed_db.py
```
서버 실행
```bash
# (backend 디렉토리에서)
poetry run uvicorn main:app --reload
```
### DB 초기화
local_database.db 파일 삭제 후 서버 실행 시 자동 생성

### Swagger
http://localhost:8000/docs

---

## 시드 데이터 목록

### 1. 아이돌 그룹 (Aidols)

| 그룹명 | 컨셉 | 비고 |
| :--- | :--- | :--- |
| **NewJeans** | Y2K 레트로 감성과 자연스러운 매력을 지닌 그룹 | 5인조 |
| **AESPA** | 아바타와 현실을 넘나드는 메타버스 세계관 그룹 | 4인조 |
| **IVE** | 당당하고 자기애 넘치는 나르시시즘 컨셉 그룹 | 6인조 |

### 2. 멤버 (Companions)

**NewJeans**
| 이름 | 포지션 | 등급 | MBTI (E/P/J/L) |
| :--- | :--- | :--- | :--- |
| Minji | subVocal | A | 8/7/9/6 |
| Hanni | mainVocal | A | 9/8/7/5 |
| Danielle | subVocal | A | 9/9/6/7 |
| Haerin | subDancer | A | 4/8/8/9 |
| Hyein | subVocal | B | 6/7/6/5 |

**AESPA**
| 이름 | 포지션 | 등급 | MBTI (E/P/J/L) |
| :--- | :--- | :--- | :--- |
| Karina | mainDancer | A | 7/9/8/8 |
| Winter | subVocal | A | 5/8/7/7 |
| Giselle | mainRapper | B | 6/7/6/6 |
| Ningning | mainVocal | A | 8/8/5/6 |

**IVE**
| 이름 | 포지션 | 등급 | MBTI (E/P/J/L) |
| :--- | :--- | :--- | :--- |
| Wonyoung | subVocal | A | 9/9/8/8 |
| Liz | mainVocal | A | 4/8/7/6 |
| Leeseo | subVocal | B | 9/7/5/5 |

**Solo**
| 이름 | 포지션 | 등급 | MBTI (E/P/J/L) |
| :--- | :--- | :--- | :--- |
| IU | mainVocal | A | 5/9/8/9 |

### 3. 관계 (Relationships)

각 그룹 내 멤버들은 **순환(Circular) 관계**를 가집니다. (A -> B -> C -> A)

*   **NewJeans:** Minji -> Hanni -> Danielle -> Haerin -> Hyein -> Minji
*   **AESPA:** Karina -> Winter -> Giselle -> Ningning -> Karina
*   **IVE:** Wonyoung -> Liz -> Leeseo -> Wonyoung

### 4. 기타 데이터

*   **Chatrooms:** 각 그룹별 채팅방, 멤버별 1:1 채팅방, 다국어(영어/일본어) 채팅방 생성
*   **Highlights:** 각 그룹별 하이라이트 영상 및 댓글 생성
*   **Messages:** 각 채팅방에 더미 메시지 생성
