/** 관계 유형 → 친밀도 매핑 */
export const RELATIONSHIP_TYPE_TO_INTIMACY = {
  awkward: 15,
  polite: 30,
  friendly: 45,
  tikitaka: 60,
  trust: 70,
  emotional: 80,
  bestFriend: 90,
  inseparable: 100,
} as const;

/** 관계 유형 타입 (위 객체에서 자동 추론) */
export type RelationshipType = keyof typeof RELATIONSHIP_TYPE_TO_INTIMACY;

/** 친밀도 → 관계 유형 매핑 (위 객체에서 파생) */
export const INTIMACY_TO_RELATIONSHIP_TYPE = Object.fromEntries(
  Object.entries(RELATIONSHIP_TYPE_TO_INTIMACY).map(([type, intimacy]) => [
    intimacy,
    type,
  ]),
) as Record<number, RelationshipType>;
