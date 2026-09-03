/**
 * Splits a combined flow value between two sources by their relative share
 * of a weight (e.g. each solar system's own generation total, or each
 * battery's own discharge power). The second source's share is the exact
 * remainder of the first, so the two shares always sum back to the input
 * value with no rounding drift. When both weights are zero (or missing),
 * both shares are zero rather than dividing by zero.
 */
const splitByShare = (
  combinedValue: number | null,
  weight1: number,
  weight2: number
): [number, number] => {
  const value = combinedValue ?? 0;
  const combinedWeight = weight1 + weight2;
  if (combinedWeight <= 0) return [0, 0];

  const share1 = value * (weight1 / combinedWeight);
  return [share1, value - share1];
};

export type SolarShareInput = {
  toHome: number | null;
  toGrid: number | null;
  toBattery: number | null;
};

export type SolarShareOutput = {
  toHome: number;
  toGrid: number;
  toBattery: number;
};

export type SolarShares = {
  source1: SolarShareOutput;
  source2: SolarShareOutput;
};

/**
 * Attributes the combined solar flow (already computed by the existing,
 * unmodified distribution algorithm) back to each of the two PV systems,
 * proportional to each system's own share of total generation. This is a
 * deliberate approximation, not a physical measurement — there is no way to
 * tell which PV string's electrons specifically went where once combined on
 * the same bus — but it gives each system its own, internally-consistent
 * flow-line magnitude.
 */
export const computeSolarShares = (
  combined: SolarShareInput,
  total1: number,
  total2: number
): SolarShares => {
  const [toHome1, toHome2] = splitByShare(combined.toHome, total1, total2);
  const [toGrid1, toGrid2] = splitByShare(combined.toGrid, total1, total2);
  const [toBattery1, toBattery2] = splitByShare(combined.toBattery, total1, total2);

  return {
    source1: { toHome: toHome1, toGrid: toGrid1, toBattery: toBattery1 },
    source2: { toHome: toHome2, toGrid: toGrid2, toBattery: toBattery2 },
  };
};

export type BatteryShareInput = {
  toHome: number | null;
  toGrid: number | null;
};

export type BatteryShareOutput = {
  toHome: number;
  toGrid: number;
};

export type BatteryShares = {
  source1: BatteryShareOutput;
  source2: BatteryShareOutput;
};

/**
 * Attributes the combined battery-to-home/grid flow back to each of the two
 * batteries, proportional to each battery's own discharge power. See the
 * module doc on `buildCombinedBattery` for why this is exact in the common
 * case (at most one battery active, or both discharging) and an
 * approximation only when both batteries are simultaneously active in
 * opposite directions.
 */
export const computeBatteryShares = (
  combined: BatteryShareInput,
  fromBattery1: number,
  fromBattery2: number
): BatteryShares => {
  const [toHome1, toHome2] = splitByShare(combined.toHome, fromBattery1, fromBattery2);
  const [toGrid1, toGrid2] = splitByShare(combined.toGrid, fromBattery1, fromBattery2);

  return {
    source1: { toHome: toHome1, toGrid: toGrid1 },
    source2: { toHome: toHome2, toGrid: toGrid2 },
  };
};
