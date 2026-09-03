import { describe, expect, test } from "vitest";

import { buildCombinedBattery, buildCombinedSolar } from "../src/utils/build-combined-solar-battery";

describe("buildCombinedSolar", () => {
  test("only solar1 configured: result is identical to solar1 alone (backward-compat regression)", () => {
    const solar1 = { has: true, total: 1500 };
    expect(buildCombinedSolar(solar1)).toEqual({ has: true, total: 1500 });
    expect(buildCombinedSolar(solar1, undefined)).toEqual({ has: true, total: 1500 });
  });

  test("neither configured: has is false, total is 0", () => {
    const solar1 = { has: false, total: null };
    expect(buildCombinedSolar(solar1)).toEqual({ has: false, total: 0 });
  });

  test("both configured: totals sum", () => {
    const solar1 = { has: true, total: 1000 };
    const solar2 = { has: true, total: 500 };
    expect(buildCombinedSolar(solar1, solar2)).toEqual({ has: true, total: 1500 });
  });

  test("per-source tolerance is applied before summing", () => {
    const solar1 = { has: true, total: 1000 };
    const solar2 = { has: true, total: 3, displayZeroTolerance: 5 };
    expect(buildCombinedSolar(solar1, solar2)).toEqual({ has: true, total: 1000 });
  });

  test("solar2 has=false is excluded even if a stale total is present", () => {
    const solar1 = { has: true, total: 1000 };
    const solar2 = { has: false, total: 500 };
    expect(buildCombinedSolar(solar1, solar2)).toEqual({ has: true, total: 1000 });
  });
});

describe("buildCombinedBattery", () => {
  test("only battery1 configured: result is identical to battery1 alone (backward-compat regression)", () => {
    const battery1 = { has: true, toBattery: 300, fromBattery: 0 };
    expect(buildCombinedBattery(battery1)).toEqual({ has: true, toBattery: 300, fromBattery: 0 });
  });

  test("neither configured: has is false, both flows 0", () => {
    const battery1 = { has: false, toBattery: null, fromBattery: null };
    expect(buildCombinedBattery(battery1)).toEqual({ has: false, toBattery: 0, fromBattery: 0 });
  });

  test("both discharging: fromBattery sums, toBattery stays 0", () => {
    const battery1 = { has: true, toBattery: 0, fromBattery: 200 };
    const battery2 = { has: true, toBattery: 0, fromBattery: 150 };
    expect(buildCombinedBattery(battery1, battery2)).toEqual({
      has: true,
      toBattery: 0,
      fromBattery: 350,
    });
  });

  test("both charging: toBattery sums, fromBattery stays 0", () => {
    const battery1 = { has: true, toBattery: 200, fromBattery: 0 };
    const battery2 = { has: true, toBattery: 150, fromBattery: 0 };
    expect(buildCombinedBattery(battery1, battery2)).toEqual({
      has: true,
      toBattery: 350,
      fromBattery: 0,
    });
  });

  test("opposite directions: nets to a single signed flow instead of both being nonzero", () => {
    // battery1 charging 500W, battery2 discharging 300W simultaneously.
    const battery1 = { has: true, toBattery: 500, fromBattery: 0 };
    const battery2 = { has: true, toBattery: 0, fromBattery: 300 };
    // Net charging of 200W — matches what a single combined battery sensor would report.
    expect(buildCombinedBattery(battery1, battery2)).toEqual({
      has: true,
      toBattery: 200,
      fromBattery: 0,
    });
  });

  test("opposite directions that exactly cancel out: nets to 0/0", () => {
    const battery1 = { has: true, toBattery: 400, fromBattery: 0 };
    const battery2 = { has: true, toBattery: 0, fromBattery: 400 };
    expect(buildCombinedBattery(battery1, battery2)).toEqual({
      has: true,
      toBattery: 0,
      fromBattery: 0,
    });
  });

  test("per-source tolerance is applied before netting", () => {
    const battery1 = { has: true, toBattery: 0, fromBattery: 200 };
    const battery2 = { has: true, toBattery: 3, fromBattery: 0, displayZeroTolerance: 5 };
    expect(buildCombinedBattery(battery1, battery2)).toEqual({
      has: true,
      toBattery: 0,
      fromBattery: 200,
    });
  });
});
