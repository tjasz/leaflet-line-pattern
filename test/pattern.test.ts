import { describe, it, expect } from "@jest/globals";
import { parsePattern, patternToString } from "../src/pattern";

// these two tests ensure the 33 patterns defined by CalTopo can be parsed losslessly
describe("in many cases, patternToString(parsePattern(s)) should equal s, as functions are lossless", () => {
  it.each<string>([
    "solid",
    "M-5 5L0 -5M5 5L0 -5,40,80,T",
    "M-5 5L0 -5M5 5L0 -5,20,40,T",
    "M-6 8L0 -8M6 8L0 -8M0 0L-6 8M0 0L6 8,40,80,T",
    "M-6 8L0 -8M6 8L0 -8M0 0L-6 8M0 0L6 8,20,40,T",
  ])("parsePattern(%p)", (path: string) => {
    expect(patternToString(parsePattern(path))).toEqual(path);
  });
});
describe("in some cases, patternToString(parsePattern(s)) should not equal s, as defaults are applied and excess characters are removed", () => {
  it.each<[string, string]>([
    // a default offset of 0 is filled in some cases
    ["M-4 0L4 0,,8,T", "M-4 0L4 0,0,8,T"],
    // an excessive space can also be removed
    ["M0 -1 L0 1,,8,F", "M0 -1L0 1,0,8,F"],
    ["M0 0L 6 0,,10,T", "M0 0L6 0,0,10,T"],
    ["M-6 0L6 0,,10,F", "M-6 0L6 0,0,10,F"],
    ["M0 -3 L0 3,,12,F", "M0 -3L0 3,0,12,F"],
    ["M-5 3L5 0M-5 -3L5 0,,6,F", "M-5 3L5 0M-5 -3L5 0,0,6,F"],
    // a default interval of 100% can be applied
    ["M-5 8 L0 -2 L5 8 Z,100%,,T", "M-5 8L0 -2L5 8Z,100%,100%,T"],
    ["M-4 -4L-4 4L4 4L4 -4Z,,25,T", "M-4 -4L-4 4L4 4L4 -4Z,0,25,T"],
    // a default type of F can be applied
    ["M0 -3 L0 3,0,16,F;M0 -1L0 0,8,16", "M0 -3L0 3,0,16,F;M0 -1L0 0,8,16,F"],
    [
      "M-8 -6M8 6M-6 0L0 4L6 0L0 -4Z,,10,F",
      "M-8 -6M8 6M-6 0L0 4L6 0L0 -4Z,0,10,F",
    ],
    [
      "M-6 0M6 0M-5 -5 L5 5 M5 -5 L-5 5,,10,F",
      "M-6 0M6 0M-5 -5L5 5M5 -5L-5 5,0,10,F",
    ],
    [
      "M-6 0M6 0M-5 -5 L5 5 M5 -5 L-5 5,,15,F",
      "M-6 0M6 0M-5 -5L5 5M5 -5L-5 5,0,15,F",
    ],
    [
      "M-6 0M6 0M-5 -5 L5 5 M5 -5 L-5 5,7,60,T",
      "M-6 0M6 0M-5 -5L5 5M5 -5L-5 5,7,60,T",
    ],
    [
      "M-6 14L0 -2M6 14L0 -2M0 6L-6 14M0 6L6 14,100%,,T",
      "M-6 14L0 -2M6 14L0 -2M0 6L-6 14M0 6L6 14,100%,100%,T",
    ],
    [
      "M5 5M-5 -5M3 0A3 3 0 1 0 -3 0 A3 3 0 1 0 3 0,,15,F",
      "M5 5M-5 -5M3 0A3 3 0 1 0 -3 0A3 3 0 1 0 3 0,0,15,F",
    ],
    [
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,,15,F",
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,0,15,F",
    ],
    [
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,,10,F",
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,0,10,F",
    ],
    [
      "M6 6M-6 -6M-5 0L0 5 M5 0L0 5M-5 0L0 -5M5 0L0 -5,,12,F",
      "M6 6M-6 -6M-5 0L0 5M5 0L0 5M-5 0L0 -5M5 0L0 -5,0,12,F",
    ],
    [
      "M5 6L-5 3M5 0L-5 3M5 0L-5 -2M-5 -5L-5 -2M5 -6L-5 -6,,14,F",
      "M5 6L-5 3M5 0L-5 3M5 0L-5 -2M-5 -5L-5 -2M5 -6L-5 -6,0,14,F",
    ],
    [
      "M12 -7M0 5M9 0A3 3 0 1 0 6 0 A3 3 0 0 0 9 0,2,20,T;M0 0L12 0,15,20",
      "M12 -7M0 5M9 0A3 3 0 1 0 6 0A3 3 0 0 0 9 0,2,20,T;M0 0L12 0,15,20,F",
    ],
    [
      "M0 -3 L0 3,,12,F;M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,5,36,F",
      "M0 -3L0 3,0,12,F;M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,5,36,F",
    ],
    [
      "M-7 0M7 0M-6 0L-2 -4M-6 0L-2 4M2 0L-2 -4M2 0L-2 4M2 0L6 -4M2 0L6 4,,8,F",
      "M-7 0M7 0M-6 0L-2 -4M-6 0L-2 4M2 0L-2 -4M2 0L-2 4M2 0L6 -4M2 0L6 4,0,8,F",
    ],
    [
      "M-6 5L-4 2M0 0L-4 2M0 0L4 2M6 5L4 2 M-6 -5L-4 -2M0 0L-4 -2M0 0L4 -2M6 -5L4 -2,,16,F",
      "M-6 5L-4 2M0 0L-4 2M0 0L4 2M6 5L4 2M-6 -5L-4 -2M0 0L-4 -2M0 0L4 -2M6 -5L4 -2,0,16,F",
    ],
    [
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,,20,F;M0 5L7 7M-7 13L7 7M-7 13L0 15,0,20",
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,0,20,F;M0 5L7 7M-7 13L7 7M-7 13L0 15,0,20,F",
    ],
    [
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,,15,F;M-6 0M6 0M-5 -5 L5 5 M5 -5 L-5 5,7,45,F",
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,0,15,F;M-6 0M6 0M-5 -5L5 5M5 -5L-5 5,7,45,F",
    ],
    // excess tab characters are removed or replaced with spaces
    [
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0,,20,F;M-8 6L-4 1M4 6L-4 1M4 6L8 1\tM-8 -1L-4 -6M4 -1L-4 -6M4 -1L8 -6,10,40",
      "M4 4M-4 -4M2 0A2 2 0 1 0 -2 0A2 2 0 1 0 2 0,0,20,F;M-8 6L-4 1M4 6L-4 1M4 6L8 1M-8 -1L-4 -6M4 -1L-4 -6M4 -1L8 -6,10,40,F",
    ],
    [
      "M-8 -8M8 8M-7 0L7 0M-5 0L-4 2L-2 4L-1 4L0 6M5 0L4 2L2 4L1 4L0 6M-5 0L-4 -2L-2 -4L-1 -4L0 -6M5 0L4 -2L2 -4L1 -4L0 -6,,30,T",
      "M-8 -8M8 8M-7 0L7 0M-5 0L-4 2L-2 4L-1 4L0 6M5 0L4 2L2 4L1 4L0 6M-5 0L-4 -2L-2 -4L-1 -4L0 -6M5 0L4 -2L2 -4L1 -4L0 -6,0,30,T",
    ],
    [
      "M-12 -12 M12 12 M2 6A2 2 0 1 0 -2 6 A2 2 0 1 0 2 6\t M10 6A2 2 0 1 0 6 6 A2 2 0 0 0 10 6\tM-10 6A2 2 0 1 0 -6 6 A2 2 0 0 0 -10 6\tM6 0A2 2 0 1 0 2 0 A2 2 0 0 0 6 0 M-6 0A2 2 0 1 0 -2 0 A2 2 0 0 0 -6 0\tM2 -6A2 2 0 1 0 -2 -6 A2 2 0 1 0 2 -6,,25,F",
      "M-12 -12M12 12M2 6A2 2 0 1 0 -2 6A2 2 0 1 0 2 6M10 6A2 2 0 1 0 6 6A2 2 0 0 0 10 6M-10 6A2 2 0 1 0 -6 6A2 2 0 0 0 -10 6M6 0A2 2 0 1 0 2 0A2 2 0 0 0 6 0M-6 0A2 2 0 1 0 -2 0A2 2 0 0 0 -6 0M2 -6A2 2 0 1 0 -2 -6A2 2 0 1 0 2 -6,0,25,F",
    ],
  ])("parsePattern(%p)", (input: string, expected: string) => {
    expect(patternToString(parsePattern(input))).toEqual(expected);
  });
});
