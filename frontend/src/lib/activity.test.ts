import { getCurrentActivity } from "./activity";

const dateAt = (hour: number): Date => {
  const date = new Date(2025, 0, 1, hour, 0, 0);
  return date;
};

describe("getCurrentActivity", () => {
  describe("RESTING (06:00-11:59)", () => {
    it("06시에 RESTING을 반환한다", () => {
      expect(getCurrentActivity(dateAt(6))).toBe("RESTING");
    });

    it("11시에 RESTING을 반환한다", () => {
      expect(getCurrentActivity(dateAt(11))).toBe("RESTING");
    });
  });

  describe("PRACTICING (12:00-16:59)", () => {
    it("12시에 PRACTICING을 반환한다", () => {
      expect(getCurrentActivity(dateAt(12))).toBe("PRACTICING");
    });

    it("16시에 PRACTICING을 반환한다", () => {
      expect(getCurrentActivity(dateAt(16))).toBe("PRACTICING");
    });
  });

  describe("SHORT_BREAK (17:00-18:59)", () => {
    it("17시에 SHORT_BREAK를 반환한다", () => {
      expect(getCurrentActivity(dateAt(17))).toBe("SHORT_BREAK");
    });

    it("18시에 SHORT_BREAK를 반환한다", () => {
      expect(getCurrentActivity(dateAt(18))).toBe("SHORT_BREAK");
    });
  });

  describe("RESTING_AT_HOME (19:00-05:59)", () => {
    it("19시에 RESTING_AT_HOME을 반환한다", () => {
      expect(getCurrentActivity(dateAt(19))).toBe("RESTING_AT_HOME");
    });

    it("23시에 RESTING_AT_HOME을 반환한다", () => {
      expect(getCurrentActivity(dateAt(23))).toBe("RESTING_AT_HOME");
    });

    it("0시에 RESTING_AT_HOME을 반환한다", () => {
      expect(getCurrentActivity(dateAt(0))).toBe("RESTING_AT_HOME");
    });

    it("5시에 RESTING_AT_HOME을 반환한다", () => {
      expect(getCurrentActivity(dateAt(5))).toBe("RESTING_AT_HOME");
    });
  });

  describe("경계값 테스트", () => {
    it("05:59 → RESTING_AT_HOME", () => {
      const date = new Date(2025, 0, 1, 5, 59, 59);
      expect(getCurrentActivity(date)).toBe("RESTING_AT_HOME");
    });

    it("06:00 → RESTING", () => {
      expect(getCurrentActivity(dateAt(6))).toBe("RESTING");
    });

    it("11:59 → RESTING", () => {
      const date = new Date(2025, 0, 1, 11, 59, 59);
      expect(getCurrentActivity(date)).toBe("RESTING");
    });

    it("12:00 → PRACTICING", () => {
      expect(getCurrentActivity(dateAt(12))).toBe("PRACTICING");
    });

    it("16:59 → PRACTICING", () => {
      const date = new Date(2025, 0, 1, 16, 59, 59);
      expect(getCurrentActivity(date)).toBe("PRACTICING");
    });

    it("17:00 → SHORT_BREAK", () => {
      expect(getCurrentActivity(dateAt(17))).toBe("SHORT_BREAK");
    });

    it("18:59 → SHORT_BREAK", () => {
      const date = new Date(2025, 0, 1, 18, 59, 59);
      expect(getCurrentActivity(date)).toBe("SHORT_BREAK");
    });

    it("19:00 → RESTING_AT_HOME", () => {
      expect(getCurrentActivity(dateAt(19))).toBe("RESTING_AT_HOME");
    });
  });
});
