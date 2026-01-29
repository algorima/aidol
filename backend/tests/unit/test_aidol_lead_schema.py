"""
AIdolLead 스키마 유닛 테스트

스키마 검증:
- AIdolLeadCreate: 필수 필드 검증
- AIdolLead: 응답 스키마
"""

import unittest

from pydantic import ValidationError

from aidol.schemas import AIdolLead, AIdolLeadCreate


class TestAIdolLeadCreateSchema(unittest.TestCase):
    """AIdolLeadCreate 스키마 유닛 테스트"""

    def test_error_on_missing_required_fields(self):
        """aidol_id, email 없이 생성하면 ValidationError 발생"""
        with self.assertRaises(ValidationError):
            AIdolLeadCreate()

    def test_error_on_missing_email(self):
        """email 없이 생성하면 ValidationError 발생"""
        with self.assertRaises(ValidationError):
            AIdolLeadCreate(aidol_id="test-aidol-id")

    def test_valid_request(self):
        """필수 필드가 모두 있으면 유효"""
        lead = AIdolLeadCreate(aidol_id="test-aidol-id", email="test@example.com")

        self.assertEqual(lead.aidol_id, "test-aidol-id")
        self.assertEqual(lead.email, "test@example.com")

    def test_camel_case_alias_support(self):
        """camelCase 필드명도 인식해야 함"""
        lead = AIdolLeadCreate.model_validate({
            "aidolId": "test-aidol-id",
            "email": "test@example.com",
        })

        self.assertEqual(lead.aidol_id, "test-aidol-id")


class TestAIdolLeadSchema(unittest.TestCase):
    """AIdolLead 응답 스키마 유닛 테스트"""

    def test_response_schema_fields(self):
        """응답 스키마에 id, timestamps 필드가 있어야 함"""
        fields = AIdolLead.model_fields.keys()

        self.assertIn("id", fields)
        self.assertIn("aidol_id", fields)
        self.assertIn("email", fields)
        self.assertIn("created_at", fields)
        self.assertIn("updated_at", fields)


if __name__ == "__main__":
    unittest.main()
