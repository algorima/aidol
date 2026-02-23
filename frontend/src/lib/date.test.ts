import { getRelativeTime } from "./date";

describe("getRelativeTime", () => {
  const now = new Date("2026-02-23T12:00:00Z");

  it("유효하지 않은 날짜면 null을 반환한다", () => {
    expect(getRelativeTime("invalid", now)).toBeNull();
  });

  it("1분 미만이면 justNow 키를 반환한다", () => {
    const date = new Date(now.getTime() - 30 * 1000).toISOString();
    expect(getRelativeTime(date, now)).toEqual({ key: "chat.time.justNow" });
  });

  it("1분이면 minutesAgo 키와 count를 반환한다", () => {
    const date = new Date(now.getTime() - 60 * 1000).toISOString();
    expect(getRelativeTime(date, now)).toEqual({
      key: "chat.time.minutesAgo",
      params: { count: 1 },
    });
  });

  it("30분이면 minutesAgo 키와 count 30을 반환한다", () => {
    const date = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
    expect(getRelativeTime(date, now)).toEqual({
      key: "chat.time.minutesAgo",
      params: { count: 30 },
    });
  });

  it("1시간이면 hoursAgo 키와 count 1을 반환한다", () => {
    const date = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(date, now)).toEqual({
      key: "chat.time.hoursAgo",
      params: { count: 1 },
    });
  });

  it("5시간이면 hoursAgo 키와 count 5를 반환한다", () => {
    const date = new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(date, now)).toEqual({
      key: "chat.time.hoursAgo",
      params: { count: 5 },
    });
  });
});
