import { getParticle } from "./koreanParticle";

describe("getParticle", () => {
  describe("과/와 조사", () => {
    it("받침이 있으면 '과'를 반환한다", () => {
      expect(getParticle("민국", "과", "와")).toBe("과"); // 국: ㄱ+ㅜ+ㄱ (받침 ㄱ)
      expect(getParticle("민준", "과", "와")).toBe("과"); // 준: ㅈ+ㅜ+ㄴ (받침 ㄴ)
      expect(getParticle("놓", "과", "와")).toBe("과"); // 놓: ㄴ+ㅗ+ㅎ (받침 ㅎ)
      expect(getParticle("흙", "과", "와")).toBe("과"); // 흙: ㅎ+ㅡ+ㄹ+ㄱ (받침 ㄱ)
    });

    it("받침이 없으면 '와'를 반환한다", () => {
      expect(getParticle("민아", "과", "와")).toBe("와"); // 아: ㅇ+ㅏ (받침 없음)
      expect(getParticle("지우", "과", "와")).toBe("와"); // 우: ㅇ+ㅜ (받침 없음)
      expect(getParticle("정의", "과", "와")).toBe("와"); // 의: ㅇ+ㅡ+ㅣ (받침 없음)
    });
  });

  describe("으로/로 조사", () => {
    it("받침이 있으면 '으로'를 반환한다", () => {
      expect(getParticle("집", "으로", "로")).toBe("으로");
    });

    it("받침이 없으면 '로'를 반환한다", () => {
      expect(getParticle("학교", "으로", "로")).toBe("로");
    });

    it("받침이 'ㄹ'이면 '로'를 반환한다", () => {
      expect(getParticle("길", "으로", "로")).toBe("로");
    });
  });

  describe("엣지 케이스", () => {
    it("빈 문자열이면 받침 없는 조사를 반환한다", () => {
      expect(getParticle("", "과", "와")).toBe("와");
    });

    it("영어는 받침 없는 조사를 반환한다", () => {
      expect(getParticle("John", "과", "와")).toBe("와");
    });

    it("숫자는 받침 없는 조사를 반환한다", () => {
      expect(getParticle("123", "과", "와")).toBe("와");
    });
  });
});
