import {
  type CardMainContext,
  type ConfigEntities,
  type FlowCardPlusConfig,
} from "@flixlix-cards/shared/types";
import { displayValue } from "@flixlix-cards/shared/utils/display-value";
import { html, nothing } from "lit";

/**
 * A second, independent battery's circle. Near-identical twin of
 * `battery.ts`, reading `entities.battery2` instead of `entities.battery`
 * and using its own DOM ids/CSS class so it can render alongside the first
 * battery without colliding with it.
 */
export const battery2Element = (
  main: CardMainContext,
  config: FlowCardPlusConfig,
  {
    battery2,
    entities,
  }: {
    battery2: any;
    entities: ConfigEntities;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  return html`<div class="circle-container battery2">
    <div
      class="circle ${disableEntityClick ? "pointer-events-none" : ""}"
      @click=${(e: MouseEvent) => {
        const target = entities.battery2?.state_of_charge
          ? entities.battery2?.state_of_charge
          : typeof entities.battery2?.entity === "string"
            ? entities.battery2?.entity
            : entities.battery2?.entity.production;
        main.onEntityClick(e, battery2, target);
      }}
      @dblclick=${(e: MouseEvent) => {
        const target = entities.battery2?.state_of_charge
          ? entities.battery2?.state_of_charge
          : typeof entities.battery2?.entity === "string"
            ? entities.battery2?.entity
            : entities.battery2?.entity.production;
        main.onEntityDoubleClick(e, battery2, target);
      }}
      @pointerdown=${(e: PointerEvent) => {
        const target = entities.battery2?.state_of_charge
          ? entities.battery2?.state_of_charge
          : typeof entities.battery2?.entity === "string"
            ? entities.battery2?.entity
            : entities.battery2?.entity.production;
        main.onEntityPointerDown(e, battery2, target);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
        if (e.key === "Enter") {
          const target = entities.battery2?.state_of_charge
            ? entities.battery2?.state_of_charge
            : typeof entities.battery2?.entity === "string"
              ? entities.battery2.entity
              : entities.battery2?.entity.production;
          main.openDetails(e, battery2, target, "tap");
        }
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      ${battery2.state_of_charge.state !== null &&
      entities.battery2?.show_state_of_charge !== false
        ? html` <span
            @click=${(e: MouseEvent) => {
              main.onEntityClick(e, battery2, entities.battery2?.state_of_charge);
            }}
            @dblclick=${(e: MouseEvent) => {
              main.onEntityDoubleClick(e, battery2, entities.battery2?.state_of_charge);
            }}
            @pointerdown=${(e: PointerEvent) => {
              main.onEntityPointerDown(e, battery2, entities.battery2?.state_of_charge);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                main.openDetails(e, battery2, entities.battery2?.state_of_charge, "tap");
              }
            }}
            id="battery2-state-of-charge-text"
          >
            ${displayValue(main.hass, config, battery2.state_of_charge.state, {
              unit: battery2.state_of_charge.unit ?? "%",
              unitWhiteSpace: battery2.state_of_charge.unit_white_space,
              decimals: battery2.state_of_charge.decimals,
              accept_negative: true,
            })}
          </span>`
        : nothing}
      ${battery2.icon !== " "
        ? html` <ha-icon
            id="battery2-icon"
            .icon=${battery2.icon}
            @click=${(e: MouseEvent) => {
              main.onEntityClick(e, battery2, entities.battery2?.state_of_charge);
            }}
            @dblclick=${(e: MouseEvent) => {
              main.onEntityDoubleClick(e, battery2, entities.battery2?.state_of_charge);
            }}
            @pointerdown=${(e: PointerEvent) => {
              main.onEntityPointerDown(e, battery2, entities.battery2?.state_of_charge);
            }}
            @pointerup=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @pointercancel=${(e: PointerEvent) => {
              main.onEntityPointerUp(e);
            }}
            @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
              if (e.key === "Enter") {
                main.openDetails(e, battery2, entities.battery2?.state_of_charge, "tap");
              }
            }}
          ></ha-icon>`
        : nothing}
      ${entities.battery2?.display_state === "two_way" ||
      entities.battery2?.display_state === undefined ||
      (entities.battery2?.display_state === "one_way_no_zero" && battery2.state.toBattery > 0) ||
      (entities.battery2?.display_state === "one_way" && battery2.state.toBattery !== 0)
        ? html`<span
            class="battery-in"
            @click=${(e: MouseEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.production!;

              main.onEntityClick(e, entities.battery2, target);
            }}
            @dblclick=${(e: MouseEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.production!;
              main.onEntityDoubleClick(e, entities.battery2, target);
            }}
            @pointerdown=${(e: PointerEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.production!;
              main.onEntityPointerDown(e, entities.battery2, target);
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
                  typeof entities.battery2!.entity === "string"
                    ? entities.battery2!.entity!
                    : entities.battery2!.entity!.production!;

                main.openDetails(e, entities.battery2, target, "tap");
              }
            }}
          >
            <ha-icon class="small" .icon=${"mdi:arrow-down"}></ha-icon>
            ${displayValue(main.hass, config, battery2.state.toBattery, {
              unit: battery2.unit,
              unitWhiteSpace: battery2.unit_white_space,
              decimals: battery2.decimals,
            })}</span
          >`
        : nothing}
      ${entities.battery2?.display_state === "two_way" ||
      entities.battery2?.display_state === undefined ||
      (entities.battery2?.display_state === "one_way_no_zero" &&
        battery2.state.fromBattery > 0) ||
      (entities.battery2?.display_state === "one_way" &&
        (battery2.state.toBattery === 0 || battery2.state.fromBattery !== 0))
        ? html`<span
            class="battery-out"
            @click=${(e: MouseEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.consumption!;

              main.onEntityClick(e, entities.battery2, target);
            }}
            @dblclick=${(e: MouseEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.consumption!;
              main.onEntityDoubleClick(e, entities.battery2, target);
            }}
            @pointerdown=${(e: PointerEvent) => {
              const target =
                typeof entities.battery2!.entity === "string"
                  ? entities.battery2!.entity!
                  : entities.battery2!.entity!.consumption!;
              main.onEntityPointerDown(e, entities.battery2, target);
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
                  typeof entities.battery2!.entity === "string"
                    ? entities.battery2!.entity!
                    : entities.battery2!.entity!.consumption!;

                main.openDetails(e, entities.battery2, target, "tap");
              }
            }}
          >
            <ha-icon class="small" .icon=${"mdi:arrow-up"}></ha-icon>
            ${displayValue(main.hass, config, battery2.state.fromBattery, {
              unit: battery2.unit,
              unitWhiteSpace: battery2.unit_white_space,
              decimals: battery2.decimals,
            })}</span
          >`
        : nothing}
    </div>
    <span class="label">${battery2.name}</span>
  </div>`;
};
