// 한글의 마지막 글자를 기준으로 적절한 조사를 반환하는 함수
// words: 조사 적용 대상 단어
// withFinalConsonant: 받침이 있을 때 사용할 조사
// withoutFinalConsonant: 받침이 없을 때 사용할 조사
// 예: getParticle("민준", "과", "와") => "과"
export function getParticle(
  word: string,
  withFinalConsonant: string,
  withoutFinalConsonant: string,
): string {
  if (!word) return withoutFinalConsonant;

  const lastChar = word.charAt(word.length - 1);
  const code = lastChar.charCodeAt(0);

  // 한글 유니코드 범위 = 0xAC00 ~ 0xD7A3
  if (code < 0xac00 || code > 0xd7a3) {
    return withoutFinalConsonant;
  }

  // 받침 여부 (code - 0xAC00) % 28 !== 0 이면 받침 있음
  const finalConsonantIndex = (code - 0xac00) % 28;

  // '로/으로' 예외 처리
  if (withFinalConsonant === "으로" && withoutFinalConsonant === "로") {
    return finalConsonantIndex === 0 || finalConsonantIndex === 8
      ? "로"
      : "으로"; // 8 = ㄹ
  }

  return finalConsonantIndex === 0 ? withoutFinalConsonant : withFinalConsonant;
}
