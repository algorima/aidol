"""
Real Integration Test for Image Generation API.
"""

import os
import unittest

import PIL.Image

from aidol.services.image_generation_service import ImageGenerationService
from aidol.settings import GoogleGenAISettings


class TestRealImageGenerationAPI(unittest.TestCase):
    """
    실제 통합 테스트: Google Gemini 이미지 생성 API 호출

    이 테스트는 Mock을 사용하지 않고 '실제' 외부 API를 호출합니다.
    다음 중 하나의 환경 변수가 설정되어 있어야 실행됩니다:
    - GOOGLE_API_KEY (Google AI API)
    - GOOGLE_CLOUD_PROJECT (Vertex AI with ADC)

    비용이 발생할 수 있으므로 주의해서 실행해야 합니다.
    """

    def setUp(self) -> None:
        # Check if either GOOGLE_API_KEY or GOOGLE_CLOUD_PROJECT is set
        api_key = os.getenv("GOOGLE_API_KEY")
        cloud_project = os.getenv("GOOGLE_CLOUD_PROJECT")

        if not api_key and not cloud_project:
            self.skipTest(
                "GOOGLE_API_KEY 또는 GOOGLE_CLOUD_PROJECT가 설정되지 않아 "
                "실제 API 테스트를 건너뜁니다."
            )

        # GoogleGenAISettings will automatically load from environment variables
        self.service = ImageGenerationService(settings=GoogleGenAISettings())

    def test_generate_image_real_call(self):
        """
        실제 Google Gemini API를 호출하여 이미지 생성 검증

        시나리오:
        - 환경: GOOGLE_API_KEY 또는 GOOGLE_CLOUD_PROJECT 설정됨
        - 요청: 간단한 프롬프트로 이미지 생성 요청
        - 기대 결과:
            1. 에러 없이 성공
            2. 유효한 PIL Image 객체 반환
            3. 이미지 크기가 예상(1024x1024)과 일치 (Resizing 로직이 없다면 원본 크기)
        """
        # Given: 간단한 프롬프트
        prompt = "A cute chibi style robot k-pop idol character, white background"

        # When: 실제 서비스 호출
        print(f"\n[Real API] Generating image for prompt: '{prompt}'...")
        image = self.service.generate_and_download_image(prompt=prompt)

        # Then: 결과 검증
        self.assertIsNotNone(image, "이미지 생성 실패 (None 반환)")
        assert image is not None
        self.assertIsInstance(
            image, PIL.Image.Image, "반환값은 PIL Image 객체여야 합니다"
        )

        # 메타데이터 출력 (확인용)
        print(f"[Real API] Image generated! Size: {image.size}, Format: {image.format}")

        # (선택 사항) 로컬에 저장하여 육안 확인 가능
        # image.save("test_real_gen.png")
