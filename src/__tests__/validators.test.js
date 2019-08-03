import { isEmailValid, hasUnameValidChars } from "../validators.js";

describe("validators module", () => {
  it("isEmailValid validates emails correctly", () => {
    expect(isEmailValid("test@test.test")).toBe(true);

    expect(isEmailValid("test")).toBe(false);
    expect(isEmailValid("test@test")).toBe(false);
    expect(isEmailValid("test.test")).toBe(false);
    expect(isEmailValid("تست@test.test")).toBe(false);
  });

  it("hasUnameValidChars validates usernames correctly", () => {
    expect(hasUnameValidChars("test")).toBe(true);
    expect(hasUnameValidChars("t")).toBe(true);
    expect(hasUnameValidChars("test123")).toBe(true);
    expect(hasUnameValidChars("123")).toBe(true);
    expect(hasUnameValidChars("te_st")).toBe(true);
    expect(hasUnameValidChars("te-st")).toBe(true);

    expect(hasUnameValidChars("تست")).toBe(false);
    expect(hasUnameValidChars("te st")).toBe(false);
    expect(hasUnameValidChars("2 + 2 = 4")).toBe(false); // :)
    expect(hasUnameValidChars("te()st")).toBe(false);
  });
});
