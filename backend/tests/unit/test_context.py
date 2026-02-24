"""Tests for aidol context module.

Tests for time formatting utilities used by MessageContextBuilder.
"""

from __future__ import annotations

import unittest
from datetime import datetime, timedelta
from unittest.mock import MagicMock, patch
from zoneinfo import ZoneInfo

from aidol.context import Persona, format_datetime_korean, format_utc_offset
from aidol.context.builder import MessageContextBuilder
from aidol.providers.llm import ProviderConstraints
from aidol.schemas.companion import Grade


class TestFormatUtcOffset(unittest.TestCase):
    """Tests for format_utc_offset function."""

    def test_positive_whole_hour(self) -> None:
        """Test positive whole hour offset (e.g., UTC+9)."""
        result = format_utc_offset(timedelta(hours=9))
        self.assertEqual(result, "UTC+9")

    def test_negative_whole_hour(self) -> None:
        """Test negative whole hour offset (e.g., UTC-5)."""
        result = format_utc_offset(timedelta(hours=-5))
        self.assertEqual(result, "UTC-5")

    def test_positive_fractional_offset(self) -> None:
        """Test positive fractional offset (e.g., India UTC+5:30)."""
        result = format_utc_offset(timedelta(hours=5, minutes=30))
        self.assertEqual(result, "UTC+5:30")

    def test_negative_fractional_offset(self) -> None:
        """Test negative fractional offset (e.g., Newfoundland UTC-3:30)."""
        result = format_utc_offset(timedelta(hours=-3, minutes=-30))
        self.assertEqual(result, "UTC-3:30")

    def test_zero_offset(self) -> None:
        """Test zero offset (UTC)."""
        result = format_utc_offset(timedelta(hours=0))
        self.assertEqual(result, "UTC+0")

    def test_none_offset(self) -> None:
        """Test None offset returns 'UTC'."""
        result = format_utc_offset(None)
        self.assertEqual(result, "UTC")


class TestFormatDatetimeKorean(unittest.TestCase):
    """Tests for format_datetime_korean function."""

    def test_format_datetime_korean(self) -> None:
        """Test format_datetime_korean function with ISO 8601 format."""
        # Create a fixed datetime for testing
        test_datetime = datetime(2024, 10, 26, 14, 30, 0, tzinfo=ZoneInfo("Asia/Seoul"))
        result = format_datetime_korean(test_datetime)
        # Check ISO 8601 date format
        self.assertIn("2024-10-26", result)
        # Check Korean weekday (Saturday)
        self.assertIn("토요일", result)
        # Check time format (24-hour)
        self.assertIn("14:30", result)
        # Check UTC offset
        self.assertIn("UTC+9", result)

    def test_format_datetime_korean_negative_fractional_offset(self) -> None:
        """Test format_datetime_korean with negative fractional UTC offset."""
        # Create a fixed datetime with Newfoundland timezone (UTC-3:30)
        test_datetime = datetime(
            2025, 1, 15, 11, 0, 0, tzinfo=ZoneInfo("America/St_Johns")
        )
        result = format_datetime_korean(test_datetime)
        # Check ISO 8601 date format
        self.assertIn("2025-01-15", result)
        # Check Korean weekday (Wednesday)
        self.assertIn("수요일", result)
        # Check time format
        self.assertIn("11:00", result)
        # Check UTC offset (should be -3:30, not -4:30)
        self.assertIn("UTC-3:30", result)


class TestFormatCurrentTime(unittest.TestCase):
    """Tests for MessageContextBuilder._format_current_time method."""

    def setUp(self) -> None:
        """Set up test fixtures."""
        self.mock_provider = MagicMock(spec=ProviderConstraints)
        self.mock_provider.combine_system_messages = False
        self.mock_provider.require_first_user_message = False
        self.mock_provider.enforce_alternating_turns = False

    def test_format_korean_with_seoul_timezone(self) -> None:
        """Test Korean format with Asia/Seoul timezone."""
        persona = Persona(
            name="Test",
            system_prompt="Test prompt",
            timezone_name="Asia/Seoul",
            grade=Grade.B,
        )
        builder = MessageContextBuilder(self.mock_provider, persona)

        # Mock datetime to get consistent results
        with patch("aidol.context.builder.datetime") as mock_datetime:
            # Saturday, October 26, 2024, 14:30 KST
            mock_now = datetime(2024, 10, 26, 14, 30, 0, tzinfo=ZoneInfo("Asia/Seoul"))
            mock_datetime.now.return_value = mock_now

            result = builder._format_current_time()

        # Check ISO 8601 date format
        self.assertIn("2024-10-26", result)
        # Check Korean weekday (Saturday)
        self.assertIn("토요일", result)
        # Check time format (24-hour)
        self.assertIn("14:30", result)
        # Check UTC offset
        self.assertIn("UTC+9", result)

    def test_format_korean_with_utc_timezone(self) -> None:
        """Test Korean format with UTC timezone."""
        persona = Persona(
            name="Test",
            system_prompt="Test prompt",
            timezone_name="UTC",
            grade=Grade.B,
        )
        builder = MessageContextBuilder(self.mock_provider, persona)

        # Mock datetime to get consistent results
        with patch("aidol.context.builder.datetime") as mock_datetime:
            # Wednesday, January 15, 2025, 11:00 UTC
            mock_now = datetime(2025, 1, 15, 11, 0, 0, tzinfo=ZoneInfo("UTC"))
            mock_datetime.now.return_value = mock_now

            result = builder._format_current_time()

        # Check ISO 8601 date format
        self.assertIn("2025-01-15", result)
        # Check Korean weekday (Wednesday)
        self.assertIn("수요일", result)
        # Check time format
        self.assertIn("11:00", result)
        # Check UTC offset
        self.assertIn("UTC+0", result)

    def test_format_korean_with_negative_fractional_timezone(self) -> None:
        """Test Korean format with negative fractional timezone (Newfoundland)."""
        persona = Persona(
            name="Test",
            system_prompt="Test prompt",
            timezone_name="America/St_Johns",
            grade=Grade.B,
        )
        builder = MessageContextBuilder(self.mock_provider, persona)

        # Mock datetime to get consistent results
        with patch("aidol.context.builder.datetime") as mock_datetime:
            # Wednesday, January 15, 2025, 11:00 NST (UTC-3:30)
            mock_now = datetime(
                2025, 1, 15, 11, 0, 0, tzinfo=ZoneInfo("America/St_Johns")
            )
            mock_datetime.now.return_value = mock_now

            result = builder._format_current_time()

        # Check ISO 8601 date format
        self.assertIn("2025-01-15", result)
        # Check Korean weekday (Wednesday)
        self.assertIn("수요일", result)
        # Check time format
        self.assertIn("11:00", result)
        # Check UTC offset (Newfoundland is UTC-3:30 standard, UTC-2:30 daylight)
        self.assertTrue("UTC-3:30" in result or "UTC-2:30" in result)

    def test_format_korean_with_us_timezone(self) -> None:
        """Test Korean format with US Pacific timezone."""
        persona = Persona(
            name="Test",
            system_prompt="Test prompt",
            timezone_name="America/Los_Angeles",
            grade=Grade.B,
        )
        builder = MessageContextBuilder(self.mock_provider, persona)

        result = builder._format_current_time()

        # Check format elements
        self.assertIn("-", result)  # ISO date separator
        self.assertIn(":", result)  # Time separator
        self.assertIn("(", result)  # Parentheses for weekday/offset
        self.assertIn("UTC", result)  # UTC offset label

        # Check for Korean weekday
        korean_weekdays = [
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
            "일요일",
        ]
        self.assertTrue(any(day in result for day in korean_weekdays))


if __name__ == "__main__":
    unittest.main()
