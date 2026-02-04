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

    def test_claim_token_optional(self):
        """claimToken 없이도 생성 가능해야 함 (쿠키에서 읽음)"""
        schema = AIdolCreate()
        self.assertIsNone(schema.claim_token)

    def test_request_with_claim_token(self):
        """claimToken을 포함한 요청이 유효해야 함"""
        token = "550e8400-e29b-41d4-a716-446655440000"
        schema = AIdolCreate(claim_token=token)

        self.assertEqual(schema.claim_token, token)

    def test_camel_case_alias_support(self):
        """camelCase 필드명도 인식해야 함"""
        token = "550e8400-e29b-41d4-a716-446655440000"
        schema = AIdolCreate.model_validate({"claimToken": token})

        self.assertEqual(schema.claim_token, token)


class TestAIdolPublicSchema(unittest.TestCase):
    """AIdolPublic 스키마 유닛 테스트"""

    def test_claim_token_excluded(self):
        """AIdolPublic에는 claim_token 필드가 없어야 함"""
        # AIdolPublic 스키마의 필드 목록 확인
        fields = AIdolPublic.model_fields.keys()

        self.assertNotIn("claim_token", fields)
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
        self.assertNotIn("claimToken", data)
        self.assertNotIn("claim_token", data)


if __name__ == "__main__":
    unittest.main()
