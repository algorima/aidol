"""
Repository Factory 유닛 테스트

팩토리 패턴 검증:
- AIdolRepositoryFactory: AIdolRepository 생성
- CompanionRepositoryFactory: CompanionRepository 생성
"""

import unittest
from unittest.mock import MagicMock

from aidol.factories import AIdolRepositoryFactory, CompanionRepositoryFactory
from aidol.repositories.aidol import AIdolRepository
from aidol.repositories.companion import CompanionRepository


class TestAIdolRepositoryFactory(unittest.TestCase):
    """AIdolRepositoryFactory 유닛 테스트"""

    def test_factory_creation(self):
        """팩토리 인스턴스 생성 가능"""
        factory = AIdolRepositoryFactory()

        self.assertIsNotNone(factory)

    def test_repository_class_setting(self):
        """팩토리가 올바른 레포지토리 클래스를 가지고 있어야 함"""
        factory = AIdolRepositoryFactory()

        self.assertEqual(factory.repository_class, AIdolRepository)

    def test_create_returns_repository(self):
        """create_repository() 호출 시 레포지토리 인스턴스 반환"""
        factory = AIdolRepositoryFactory()
        mock_session = MagicMock()

        repository = factory.create_repository(mock_session)

        self.assertIsInstance(repository, AIdolRepository)


class TestCompanionRepositoryFactory(unittest.TestCase):
    """CompanionRepositoryFactory 유닛 테스트"""

    def test_factory_creation(self):
        """팩토리 인스턴스 생성 가능"""
        factory = CompanionRepositoryFactory()

        self.assertIsNotNone(factory)

    def test_repository_class_setting(self):
        """팩토리가 올바른 레포지토리 클래스를 가지고 있어야 함"""
        factory = CompanionRepositoryFactory()

        self.assertEqual(factory.repository_class, CompanionRepository)

    def test_create_returns_repository(self):
        """create_repository() 호출 시 레포지토리 인스턴스 반환"""
        factory = CompanionRepositoryFactory()
        mock_session = MagicMock()

        repository = factory.create_repository(mock_session)

        self.assertIsInstance(repository, CompanionRepository)


if __name__ == "__main__":
    unittest.main()
