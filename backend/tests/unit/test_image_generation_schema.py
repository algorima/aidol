"""
ImageGeneration 스키마 유닛 테스트

스키마 검증:
- ImageGenerationRequest: prompt 길이 제한 (max 200)
- ImageGenerationData: 이미지 응답 데이터
- ImageGenerationResponse: 응답 wrapper
"""

import unittest

from pydantic import ValidationError

from aidol.schemas import (
    ImageGenerationData,
    ImageGenerationRequest,
    ImageGenerationResponse,
)


class TestImageGenerationRequestSchema(unittest.TestCase):
    """ImageGenerationRequest 스키마 유닛 테스트"""

    def test_prompt_required(self):
        """prompt 없이 생성하면 ValidationError 발생"""
        with self.assertRaises(ValidationError):
            ImageGenerationRequest()  # type: ignore

    def test_valid_request(self):
        """유효한 prompt로 생성"""
        request = ImageGenerationRequest(prompt="A cute K-pop idol")

        self.assertEqual(request.prompt, "A cute K-pop idol")

    def test_prompt_max_length(self):
        """prompt는 200자 초과시 ValidationError"""
        long_prompt = "a" * 201
        with self.assertRaises(ValidationError):
            ImageGenerationRequest(prompt=long_prompt)

    def test_prompt_200_chars_allowed(self):
        """prompt 200자는 허용"""
        prompt_200 = "a" * 200
        request = ImageGenerationRequest(prompt=prompt_200)

        self.assertEqual(len(request.prompt), 200)


class TestImageGenerationDataSchema(unittest.TestCase):
    """ImageGenerationData 스키마 유닛 테스트"""

    def test_required_fields(self):
        """모든 필드가 필수"""
        with self.assertRaises(ValidationError):
            ImageGenerationData()  # type: ignore

    def test_valid_data(self):
        """유효한 이미지 데이터"""
        data = ImageGenerationData(
            image_url="https://example.com/image.png",
            width=1024,
            height=1024,
            format="png",
        )

        self.assertEqual(data.image_url, "https://example.com/image.png")
        self.assertEqual(data.width, 1024)
        self.assertEqual(data.format, "png")


class TestImageGenerationResponseSchema(unittest.TestCase):
    """ImageGenerationResponse 스키마 유닛 테스트"""

    def test_data_field_required(self):
        """data 필드가 필수"""
        with self.assertRaises(ValidationError):
            ImageGenerationResponse()  # type: ignore

    def test_valid_response(self):
        """유효한 응답 구조"""
        data = ImageGenerationData(
            image_url="https://example.com/image.png",
            width=1024,
            height=1024,
            format="png",
        )
        response = ImageGenerationResponse(data=data)

        self.assertEqual(response.data.image_url, "https://example.com/image.png")


if __name__ == "__main__":
    unittest.main()
