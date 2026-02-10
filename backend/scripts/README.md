# Database Seeding Scripts

이 폴더(`backend/scripts`)는 로컬 개발 환경에서 데이터베이스에 초기 더미 데이터를 주입하기 위한 스크립트들을 포함하고 있습니다.

## 실행 방법

**`backend` 디렉토리 내부**에서 아래 명령어를 실행해야 합니다.

가상환경 설치
```bash
# (backend 디렉토리에서)
poetry install
```
스크립트 실행
```bash
# (backend 디렉토리에서)
poetry run python scripts/import_data.py
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
