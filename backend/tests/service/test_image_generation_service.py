"""
Integration (Mock) tests for Image Generation Service.
"""

import unittest
from unittest.mock import MagicMock, patch

from aidol.services.image_generation_service import ImageGenerationService
from aidol.settings import GoogleGenAISettings


class TestImageGenerationService(unittest.TestCase):
    """
    통합 테스트(Mock): 이미지 생성 서비스 검증

    이 테스트는 Google Gemini API를 Mocking하여 서비스 로직을 검증합니다.
    실제 API 호출 없이 응답 처리, 에러 핸들링, 이미지 변환 과정을 확인합니다.
    """

    @patch("aidol.services.image_generation_service.genai")
    def test_generate_and_download_image_success(self, mock_genai):
        """
        이미지 생성 성공 시나리오 검증

        시나리오:
        - 환경: genai.Client가 Mocking됨
        - API 응답: 유효한 이미지 바이너리 데이터 포함
        - 기대 결과: PIL Image 객체 반환
        """
        # Given: Mock 설정
        mock_client = MagicMock()
        mock_genai.Client.return_value = mock_client

        # Mock Response Structure
        # response.parts[0].inline_data.data = bytes
        mock_response = MagicMock()
        mock_part = MagicMock()
        mock_part.inline_data.data = b"fake_image_bytes"  # 실제 이미지는 아니지만 bytes
        mock_response.parts = [mock_part]

        mock_client.models.generate_content.return_value = mock_response

        # Service 초기화
        service = ImageGenerationService(settings=GoogleGenAISettings(api_key="fake-key"))

        # When: Mocking된 PIL.Image.open이 필요함 (bytes -> Image)
        # 하지만 실제 bytes가 유효한 이미지가 아니면 PIL.Image.open에서 에러 발생 가능.
        # 따라서 PIL.Image.open도 patch해야 함.
        with patch("PIL.Image.open") as mock_pil_open:
            mock_image = MagicMock()
            mock_pil_open.return_value = mock_image

            result = service.generate_and_download_image(prompt="test prompt")

            # Then: 검증
            self.assertIsNotNone(result)
            self.assertEqual(result, mock_image)  # 리턴된 객체가 Mock 이미지인지 확인

            # API 호출 검증
            mock_client.models.generate_content.assert_called_once()
            _, kwargs = mock_client.models.generate_content.call_args
            self.assertEqual(kwargs["model"], "gemini-3-pro-image-preview")
            self.assertEqual(kwargs["contents"], ["test prompt"])

    @patch("aidol.services.image_generation_service.genai_errors")
    @patch("aidol.services.image_generation_service.genai")
    def test_generate_image_api_failure(self, mock_genai, mock_genai_errors):
        """
        API 에러 발생 시 처리 검증

        시나리오:
        - 환경: API 호출 시 예외 발생
        - 기대 결과: None 반환 (서비스가 에러를 로깅하고 None 반환 처리)
        """

        # Mock APIError class that the service catches
        class MockAPIError(Exception):
            def __init__(self, message, code):
                self.message = message
                self.code = code

        # Service가 참조하는 genai_errors.APIError를 우리가 만든 Mock 예외 클래스로 교체
        mock_genai_errors.APIError = MockAPIError

        # Given: Mock 설정 (MockAPIError 발생)
        mock_client = MagicMock()
        mock_genai.Client.return_value = mock_client

        # MockAPIError 발생시키기
        mock_error = MockAPIError(message="API Error", code=500)
        mock_client.models.generate_content.side_effect = mock_error

        service = ImageGenerationService(settings=GoogleGenAISettings(api_key="fake-key"))

        # When: 생성 요청
        result = service.generate_and_download_image(prompt="test")

        # Then: None 반환 확인
        self.assertIsNone(result)

    @patch("aidol.services.image_generation_service.genai")
    def test_generate_image_no_data(self, mock_genai):
        """
        API 응답에 이미지 데이터가 없는 경우 처리 검증

        시나리오:
        - 환경: API 응답은 성공했으나 parts에 인라인 데이터가 없음
        - 기대 결과: None 반환
        """
        # Given
        mock_client = MagicMock()
        mock_genai.Client.return_value = mock_client

        # Empty parts or no inline_data
        mock_response = MagicMock()
        mock_part = MagicMock()
        mock_part.inline_data = None  # 데이터 없음
        mock_response.parts = [mock_part]

        mock_client.models.generate_content.return_value = mock_response

        service = ImageGenerationService(settings=GoogleGenAISettings(api_key="fake-key"))

        # When
        result = service.generate_and_download_image(prompt="test")

        # Then
        self.assertIsNone(result)
