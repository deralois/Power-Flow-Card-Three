import {
  type CardMainContext,
  type ConfigEntities,
  type FlowCardPlusConfig,
} from "@flixlix-cards/shared/types";
import { displayValue } from "@flixlix-cards/shared/utils/display-value";
import { html, nothing } from "lit";

/**
 * A small satellite bubble beside the main battery circle, showing one
 * battery's own state of charge (or net power, if no SoC entity is
 * configured), connected to the combined circle by a short straight line.
 * Used for the "3 bubbles" layout when a second battery is configured (see
 * power-flow-card-three.ts `battery1Own`/`battery2`).
 */
const satelliteElement = (
  main: CardMainContext,
  config: FlowCardPlusConfig,
  {
    data,
    position,
    colorClass,
  }: {
    data: {
      name: string;
      icon: string;
      entity?: string | { consumption: string; production: string };
      state_of_charge: { state: number | null; unit?: string; unit_white_space?: boolean; decimals?: number };
      state: { toBattery: number | null; fromBattery: number | null };
      tap_action?: any;
      hold_action?: any;
      double_tap_action?: any;
    };
    position: "left" | "right";
    colorClass: string;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  const socText =
    data.state_of_charge.state !== null
      ? displayValue(main.hass, config, data.state_of_charge.state, {
          unit: data.state_of_charge.unit ?? "%",
          unitWhiteSpace: data.state_of_charge.unit_white_space,
          decimals: data.state_of_charge.decimals,
          accept_negative: true,
        })
      : null;
  const isCharging = (data.state.toBattery ?? 0) > 0;
  const isDischarging = (data.state.fromBattery ?? 0) > 0;
  const powerText = isCharging
    ? displayValue(main.hass, config, data.state.toBattery, {})
    : displayValue(main.hass, config, data.state.fromBattery ?? 0, {});
  const target =
    typeof data.entity === "string" ? data.entity : (data.entity?.production ?? undefined);
  return html`<div class="satellite satellite-${position}">
    <div
      class="satellite-circle satellite-circle-battery ${colorClass} ${disableEntityClick
        ? "pointer-events-none"
        : ""}"
      @click=${(e: MouseEvent) => {
        main.onEntityClick(e, data, target);
      }}
      @dblclick=${(e: MouseEvent) => {
        main.onEntityDoubleClick(e, data, target);
      }}
      @pointerdown=${(e: PointerEvent) => {
        main.onEntityPointerDown(e, data, target);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      ${socText !== null ? html`<span class="satellite-soc">${socText}</span>` : nothing}
      <span
        class="satellite-power ${isCharging ? "charging" : isDischarging ? "discharging" : ""}"
      >
        ${powerText}
      </span>
    </div>
    <span class="label satellite-label">${data.name}</span>
  </div>`;
};

export const batteryElement = (
  main: CardMainContext,
  config: FlowCardPlusConfig,
  {
    battery,
    battery2,
    battery1Own,
    entities,
  }: {
    battery: any;
    battery2?: any;
    battery1Own?: any;
    entities: ConfigEntities;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  const showSatellites = !!battery2?.has;
  return html`<div class="circle-container battery ${showSatellites ? "has-satellites" : ""}">
    <div
      class="circle ${disableEntityClick ? "pointer-events-none" : ""}"
      @click=${(e: MouseEvent) => {
        const target = entities.battery?.state_of_charge
          ? entities.battery?.state_of_charge
          : typeof entities.battery?.entity === "string"
            ? entities.battery?.entity
            : entities.battery?.entity.production;
        main.onEntityClick(e, battery, target);
      }}
      @dblclick=${(e: MouseEvent) => {
        const target = entities.battery?.state_of_charge
          ? entities.battery?.state_of_charge
          : typeof entities.battery?.entity === "string"
            ? entities.battery?.entity
            : entities.battery?.entity.production;
        main.onEntityDoubleClick(e, battery, target);
      }}
      @pointerdown=${(e: PointerEvent) => {
        const target = entities.battery?.state_of_charge
          ? entities.battery?.state_of_charge
          : typeof entities.battery?.entity === "string"
            ? entities.battery?.entity
            : entities.battery?.entity.production;
        main.onEntityPointerDown(e, battery, target);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
        if (e.key === "Enter") {
          const target = entities.battery?.state_of_charge
            ? entities.battery?.state_of_charge
            : typeof entities.battery?.entity === "string"
              ? entities.battery.entity
              : entities.battery?.entity.production;
          main.openDetails(e, battery, target, "tap");
        }
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      ${battery.state_of_charge.state !== null && entities.battery?.show_state_of_charge !== false
        ? html` <span
            @click=${(e: MouseEvent) => {
              main.onEntityClick(e, battery, entities.battery?.state_of_charge);
            }}
            @dblclick=${(e: MouseEvent) => {
              main.onEntityDoubleClick(e, battery, entities.battery?.state_of_charge);
            }}
            @pointerdown=${(e: PointerEvent) => {
              main.onEntityPointerDown(e, battery, entities.battery?.state_of_charge);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                main.openDetails(e, battery, entities.battery?.state_of_charge, "tap");
              }
            }}
            id="battery-state-of-charge-text"
          >
            ${displayValue(main.hass, config, battery.state_of_charge.state, {
              unit: battery.state_of_charge.unit ?? "%",
              unitWhiteSpace: battery.state_of_charge.unit_white_space,
              decimals: battery.state_of_charge.decimals,
              accept_negative: true,
            })}
          </span>`
        : nothing}
      ${battery.icon !== " "
        ? html` <ha-icon
            id="battery-icon"
            .icon=${battery.icon}
            @click=${(e: MouseEvent) => {
              main.onEntityClick(e, battery, entities.battery?.state_of_charge);
            }}
            @dblclick=${(e: MouseEvent) => {
              main.onEntityDoubleClick(e, battery, entities.battery?.state_of_charge);
            }}
            @pointerdown=${(e: PointerEvent) => {
              main.onEntityPointerDown(e, battery, entities.battery?.state_of_charge);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                main.openDetails(e, battery, entities.battery?.state_of_charge, "tap");
              }
            }}
          ></ha-icon>`
        : nothing}
      ${entities.battery?.display_state === "two_way" ||
      entities.battery?.display_state === undefined ||
      (entities.battery?.display_state === "one_way_no_zero" && battery.state.toBattery > 0) ||
      (entities.battery?.display_state === "one_way" && battery.state.toBattery !== 0)
        ? html`<span
            class="battery-in"
            @click=${(e: MouseEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.production!;

              main.onEntityClick(e, entities.battery, target);
            }}
            @dblclick=${(e: MouseEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.production!;
              main.onEntityDoubleClick(e, entities.battery, target);
            }}
            @pointerdown=${(e: PointerEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.production!;
              main.onEntityPointerDown(e, entities.battery, target);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                const target =
                  typeof entities.battery!.entity === "string"
                    ? entities.battery!.entity!
                    : entities.battery!.entity!.production!;

                main.openDetails(e, entities.battery, target, "tap");
              }
            }}
          >
            <ha-icon class="small" .icon=${"mdi:arrow-down"}></ha-icon>
            ${displayValue(main.hass, config, battery.state.toBattery, {
              unit: battery.unit,
              unitWhiteSpace: battery.unit_white_space,
              decimals: battery.decimals,
            })}</span
          >`
        : nothing}
      ${entities.battery?.display_state === "two_way" ||
      entities.battery?.display_state === undefined ||
      (entities.battery?.display_state === "one_way_no_zero" && battery.state.fromBattery > 0) ||
      (entities.battery?.display_state === "one_way" &&
        (battery.state.toBattery === 0 || battery.state.fromBattery !== 0))
        ? html`<span
            class="battery-out"
            @click=${(e: MouseEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.consumption!;

              main.onEntityClick(e, entities.battery, target);
            }}
            @dblclick=${(e: MouseEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.consumption!;
              main.onEntityDoubleClick(e, entities.battery, target);
            }}
            @pointerdown=${(e: PointerEvent) => {
              const target =
                typeof entities.battery!.entity === "string"
                  ? entities.battery!.entity!
                  : entities.battery!.entity!.consumption!;
              main.onEntityPointerDown(e, entities.battery, target);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                const target =
                  typeof entities.battery!.entity === "string"
                    ? entities.battery!.entity!
                    : entities.battery!.entity!.consumption!;

                main.openDetails(e, entities.battery, target, "tap");
              }
            }}
          >
            <ha-icon class="small" .icon=${"mdi:arrow-up"}></ha-icon>
            ${displayValue(main.hass, config, battery.state.fromBattery, {
              unit: battery.unit,
              unitWhiteSpace: battery.unit_white_space,
              decimals: battery.decimals,
            })}</span
          >`
        : nothing}
    </div>
    <span class="label">${battery.name}</span>
    ${showSatellites
      ? satelliteElement(main, config, {
          data: battery1Own,
          position: "left",
          colorClass: "battery",
        })
      : nothing}
    ${showSatellites
      ? satelliteElement(main, config, {
          data: battery2,
          position: "right",
          colorClass: "battery2",
        })
      : nothing}
  </div>`;
};
