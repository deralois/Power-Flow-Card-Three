import { beforeEach, describe, expect, test, vi } from "vitest";

import { PowerFlowCardPlusEditor } from "../src/ui-editor/ui-editor";

const { loadHaFormMock } = vi.hoisted(() => ({
  loadHaFormMock: vi.fn(),
}));

vi.mock("@flixlix-cards/shared/ui-editor/utils/load-ha-form", () => ({
  loadHaForm: loadHaFormMock,
}));

describe("power flow ui editor", () => {
  beforeEach(() => {
    loadHaFormMock.mockReset();
  });

  test("connectedCallback triggers ha-form loader", () => {
    const editor = new PowerFlowCardPlusEditor();

    editor.connectedCallback();

    expect(loadHaFormMock).toHaveBeenCalledTimes(1);
  });

  test("migrateLegacyFields maps legacy power decimal and threshold fields", () => {
    const editor = new PowerFlowCardPlusEditor();
    const configChanged = vi.fn();
    editor.addEventListener("config-changed", configChanged);
    (editor as any)._config = {
      type: "custom:power-flow-card-three",
      entities: {},
      watt_threshold: 900,
      w_decimals: 1,
      kw_decimals: 2,
    };

    (editor as any)._migrateLegacyFields();

    const config = configChanged.mock.calls[0]?.[0]?.detail?.config;
    expect(config.kilo_threshold).toBe(900);
    expect(config.base_decimals).toBe(1);
    expect(config.kilo_decimals).toBe(2);
    expect(config.watt_threshold).toBeUndefined();
    expect(config.w_decimals).toBeUndefined();
    expect(config.kw_decimals).toBeUndefined();
  });

  test("migrateLegacyIndividualFields moves legacy slots into entities.individual", () => {
    const editor = new PowerFlowCardPlusEditor();
    const configChanged = vi.fn();
    editor.addEventListener("config-changed", configChanged);
    (editor as any)._config = {
      type: "custom:power-flow-card-three",
      entities: {
        individual: [{ entity: "sensor.existing" }],
        individual1: { entity: "sensor.legacy_1" },
        individual2: [{ entity: "sensor.legacy_2" }, { entity: "sensor.legacy_3" }],
      },
    };

    (editor as any)._migrateLegacyIndividualFields();

    const config = configChanged.mock.calls[0]?.[0]?.detail?.config;
    expect(config.entities.individual).toEqual([
      { entity: "sensor.existing" },
      { entity: "sensor.legacy_1" },
      { entity: "sensor.legacy_2" },
      { entity: "sensor.legacy_3" },
    ]);
    expect(config.entities.individual1).toBeUndefined();
    expect(config.entities.individual2).toBeUndefined();
  });

  test("valueChanged nests updates into current entity page", () => {
    const editor = new PowerFlowCardPlusEditor();
    const configChanged = vi.fn();
    editor.addEventListener("config-changed", configChanged);
    (editor as any).hass = { localize: vi.fn() };
    (editor as any)._config = {
      type: "custom:power-flow-card-three",
      entities: {
        grid: { entity: "sensor.old_grid" },
      },
    };
    (editor as any)._currentConfigPage = "grid";

    (editor as any)._valueChanged({
      detail: {
        value: { entity: "sensor.new_grid" },
      },
    });

    const config = configChanged.mock.calls[0]?.[0]?.detail?.config;
    expect(config.entities.grid).toEqual({ entity: "sensor.new_grid" });
  });

  test("valueChanged nests updates into the solar2/battery2 pages the same way", async () => {
    const editor = new PowerFlowCardPlusEditor();
    (editor as any).hass = { localize: vi.fn() };
    await editor.setConfig({
      type: "custom:power-flow-card-three",
      entities: { grid: { entity: "sensor.grid" } },
    } as any);

    const solar2Changed = vi.fn();
    editor.addEventListener("config-changed", solar2Changed);
    (editor as any)._currentConfigPage = "solar2";
    (editor as any)._valueChanged({ detail: { value: { entity: "sensor.solar2" } } });
    expect(solar2Changed.mock.calls[0]?.[0]?.detail?.config.entities.solar2).toEqual({
      entity: "sensor.solar2",
    });

    const battery2Changed = vi.fn();
    editor.addEventListener("config-changed", battery2Changed);
    (editor as any)._currentConfigPage = "battery2";
    (editor as any)._valueChanged({ detail: { value: { entity: "sensor.battery2" } } });
    expect(battery2Changed.mock.calls[0]?.[0]?.detail?.config.entities.battery2).toEqual({
      entity: "sensor.battery2",
    });
  });

  test("setConfig accepts a config containing entities.solar2 and entities.battery2", async () => {
    const editor = new PowerFlowCardPlusEditor();

    await expect(
      editor.setConfig({
        type: "custom:power-flow-card-three",
        entities: {
          grid: { entity: "sensor.grid" },
          solar2: { entity: "sensor.solar2" },
          battery2: { entity: "sensor.battery2", state_of_charge: "sensor.battery2_soc" },
        },
      } as any)
    ).resolves.not.toThrow();
  });
});
