import { describe, expect, test } from "vitest";

import { computeBatteryShares, computeSolarShares } from "../src/utils/compute-multi-source-shares";

describe("computeSolarShares", () => {
  test("equal production splits the combined flow 50/50", () => {
    const combined = { toHome: 1000, toGrid: 200, toBattery: 300 };
    const { source1, source2 } = computeSolarShares(combined, 500, 500);
    expect(source1).toEqual({ toHome: 500, toGrid: 100, toBattery: 150 });
    expect(source2).toEqual({ toHome: 500, toGrid: 100, toBattery: 150 });
  });

  test("shares are proportional to each source's own generation", () => {
    const combined = { toHome: 900, toGrid: 0, toBattery: 0 };
    const { source1, source2 } = computeSolarShares(combined, 300, 100);
    // solar1 produced 3x solar2 -> gets 3x the share
    expect(source1.toHome).toBe(675);
    expect(source2.toHome).toBe(225);
  });

  test("shares always sum exactly back to the combined value (remainder-based, no rounding drift)", () => {
    const combined = { toHome: 1000, toGrid: 333, toBattery: 111 };
    const { source1, source2 } = computeSolarShares(combined, 700, 333);
    expect(source1.toHome + source2.toHome).toBe(1000);
    expect(source1.toGrid + source2.toGrid).toBe(333);
    expect(source1.toBattery + source2.toBattery).toBe(111);
  });

  test("both sources at 0W: no NaN, both shares are 0", () => {
    const combined = { toHome: 0, toGrid: 0, toBattery: 0 };
    const { source1, source2 } = computeSolarShares(combined, 0, 0);
    expect(source1).toEqual({ toHome: 0, toGrid: 0, toBattery: 0 });
    expect(source2).toEqual({ toHome: 0, toGrid: 0, toBattery: 0 });
  });

  test("only source1 producing: source2 gets nothing", () => {
    const combined = { toHome: 500, toGrid: 0, toBattery: 0 };
    const { source1, source2 } = computeSolarShares(combined, 500, 0);
    expect(source1.toHome).toBe(500);
    expect(source2.toHome).toBe(0);
  });

  test("null combined values are treated as 0", () => {
    const combined = { toHome: null, toGrid: null, toBattery: null };
    const { source1, source2 } = computeSolarShares(combined, 500, 500);
    expect(source1).toEqual({ toHome: 0, toGrid: 0, toBattery: 0 });
    expect(source2).toEqual({ toHome: 0, toGrid: 0, toBattery: 0 });
  });
});

describe("computeBatteryShares", () => {
  test("shares are proportional to each battery's own discharge power", () => {
    const combined = { toHome: 600, toGrid: 0 };
    const { source1, source2 } = computeBatteryShares(combined, 400, 200);
    expect(source1.toHome).toBe(400);
    expect(source2.toHome).toBe(200);
  });

  test("both at 0W discharge: no NaN, both shares are 0", () => {
    const combined = { toHome: 0, toGrid: 0 };
    const { source1, source2 } = computeBatteryShares(combined, 0, 0);
    expect(source1).toEqual({ toHome: 0, toGrid: 0 });
    expect(source2).toEqual({ toHome: 0, toGrid: 0 });
  });

  test("one battery charging (0 discharge share) while the other discharges: full share to the discharging one", () => {
    // battery1 is charging (its own discharge contribution is 0), battery2 is discharging.
    const combined = { toHome: 300, toGrid: 50 };
    const { source1, source2 } = computeBatteryShares(combined, 0, 300);
    expect(source1).toEqual({ toHome: 0, toGrid: 0 });
    expect(source2).toEqual({ toHome: 300, toGrid: 50 });
  });
});
