import { adjustZeroTolerance } from "@flixlix-cards/shared/states/tolerance/base";

export type CombinableSolar = {
  has: boolean;
  total: number | null;
  displayZeroTolerance?: number;
};

export type CombinedSolar = {
  has: boolean;
  total: number;
};

/**
 * Sums two independent PV systems into the single pseudo-solar object the
 * existing (unmodified) distribution algorithm expects. When `solar2` is
 * absent or has no reading, the result is identical to `solar1` alone —
 * this is what keeps existing single-PV configs byte-for-byte unchanged.
 */
export const buildCombinedSolar = (solar1: CombinableSolar, solar2?: CombinableSolar): CombinedSolar => {
  const total1 = solar1.has ? adjustZeroTolerance(solar1.total, solar1.displayZeroTolerance) : 0;
  const total2 = solar2?.has ? adjustZeroTolerance(solar2.total, solar2.displayZeroTolerance) : 0;

  return {
    has: solar1.has || !!solar2?.has,
    total: total1 + total2,
  };
};

export type CombinableBattery = {
  has: boolean;
  toBattery: number | null;
  fromBattery: number | null;
  displayZeroTolerance?: number;
};

export type CombinedBattery = {
  has: boolean;
  toBattery: number;
  fromBattery: number;
};

/**
 * Nets two independent batteries' charge/discharge power into the single
 * signed flow a single physical battery's own sensor would report
 * (positive = net discharging, negative = net charging). Fed into the
 * existing distribution algorithm unchanged, this is exactly correct
 * whenever at most one battery is active, or both move in the same
 * direction. Only in the rare case where both are simultaneously active in
 * *opposite* directions does the net direction become the leading signal
 * for the shared grid/home math, and the per-battery flow-arrow attribution
 * in compute-multi-source-shares.ts becomes an approximation — each
 * battery's own circle still always shows its real, independently measured
 * charge/discharge value, so only the shared flow-line split is affected.
 */
export const buildCombinedBattery = (
  battery1: CombinableBattery,
  battery2?: CombinableBattery
): CombinedBattery => {
  const netOf = (battery?: CombinableBattery): number => {
    if (!battery?.has) return 0;
    const toBattery = adjustZeroTolerance(battery.toBattery, battery.displayZeroTolerance);
    const fromBattery = adjustZeroTolerance(battery.fromBattery, battery.displayZeroTolerance);
    return fromBattery - toBattery;
  };

  const net = netOf(battery1) + netOf(battery2);

  return {
    has: battery1.has || !!battery2?.has,
    toBattery: net < 0 ? Math.abs(net) : 0,
    fromBattery: net > 0 ? net : 0,
  };
};
