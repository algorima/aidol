"""
AIdol 스키마 유닛 테스트

스키마 검증 로직을 단위 테스트합니다:
- AIdolCreate: 생성 요청 스키마
- AIdolPublic: 응답 스키마 (민감 정보 제외)
"""

import unittest
from datetime import datetime

from aidol.schemas import AIdolCreate, AIdolPublic


class TestAIdolCreateSchema(unittest.TestCase):
    """AIdolCreate 스키마 유닛 테스트"""

    def test_anonymous_id_not_in_body(self):
        """anonymous_id은 body에서 받지 않음 (Cookie에서 읽음)"""
        fields = AIdolCreate.model_fields.keys()
        self.assertNotIn("anonymous_id", fields)

    def test_create_without_fields(self):
        """필드 없이 생성 가능해야 함"""
        schema = AIdolCreate()
        self.assertIsNone(schema.name)


class TestAIdolPublicSchema(unittest.TestCase):
    """AIdolPublic 스키마 유닛 테스트"""

    def test_anonymous_id_excluded(self):
        """AIdolPublic에는 anonymous_id 필드가 없어야 함"""
        # AIdolPublic 스키마의 필드 목록 확인
        fields = AIdolPublic.model_fields.keys()

        self.assertNotIn("anonymous_id", fields)
        self.assertIn("id", fields)
        self.assertIn("name", fields)

    def test_response_serialization_excludes_sensitive_info(self):
        """직렬화 시 민감 정보가 제외되어야 함"""
        now = datetime.now()
        public = AIdolPublic(
            id="test-id",
            name="테스트 그룹",
            created_at=now,
            updated_at=now,
        )
        data = public.model_dump(by_alias=True)

        self.assertIn("id", data)
        self.assertNotIn("anonymousId", data)
        self.assertNotIn("anonymous_id", data)


if __name__ == "__main__":
    unittest.main()
