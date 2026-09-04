import { getEntityStateWatts } from "@flixlix-cards/shared/states/utils/get-entity-state-watts";
import {
  type CardMainContext,
  type ConfigEntities,
  type FlowCardPlusConfig,
  type TemplatesObj,
} from "@flixlix-cards/shared/types";
import { displayValue } from "@flixlix-cards/shared/utils/display-value";
import { isNumberValue } from "@flixlix-cards/shared/utils/utils";
import { html, nothing } from "lit";
import { generalSecondarySpan } from "./spans/general-secondary-span";

/**
 * A small satellite bubble beside the main solar circle, showing one PV
 * system's own reading, connected to the combined circle by a short
 * straight line. Used for the "3 bubbles" layout when a second PV system
 * is configured (see power-flow-card-three.ts `solar1Own`/`solar2`).
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
      entity?: string;
      state: { total: number | null };
      tap_action?: any;
      hold_action?: any;
      double_tap_action?: any;
    };
    position: "left" | "right";
    colorClass: string;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  return html`<div class="satellite satellite-${position}">
    <div class="satellite-connector satellite-connector-${position} ${colorClass}"></div>
    <div
      class="satellite-circle ${colorClass} ${disableEntityClick ? "pointer-events-none" : ""}"
      @click=${(e: MouseEvent) => {
        main.onEntityClick(e, data, data.entity);
      }}
      @dblclick=${(e: MouseEvent) => {
        main.onEntityDoubleClick(e, data, data.entity);
      }}
      @pointerdown=${(e: PointerEvent) => {
        main.onEntityPointerDown(e, data, data.entity);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      <ha-icon .icon=${data.icon}></ha-icon>
      <span>${displayValue(main.hass, config, data.state.total, {})}</span>
    </div>
    <span class="label satellite-label">${data.name}</span>
  </div>`;
};

export const solarElement = (
  main: CardMainContext,
  config: FlowCardPlusConfig,
  {
    entities,
    solar,
    solar2,
    solar1Own,
    templatesObj,
  }: {
    entities: ConfigEntities;
    solar: any;
    solar2?: any;
    solar1Own?: any;
    templatesObj: TemplatesObj;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  const templateResult = templatesObj.solarSecondary;
  const shouldShowSecondary = () => {
    if (templateResult) return true;
    if (config.entities.solar?.secondary_info?.display_zero === true) return true;
    if (!solar?.secondary?.state) return false;
    if (!isNumberValue(solar?.secondary?.state)) return true;

    const toleranceSet = config.entities.solar?.secondary_info?.display_zero_tolerance ?? 0;
    return (
      Number(solar.secondary.state) >= toleranceSet ||
      (config.entities.solar?.secondary_info?.accept_negative &&
        typeof Number(+solar.secondary.state) === "number")
    );
  };
  const sumTotalConfig = entities.solar?.secondary_info?.sum_total;
  const secondaryEntity = config.entities.solar?.secondary_info?.entity;
  const secondarySolarStateWatts = secondaryEntity
    ? Math.max(getEntityStateWatts(main.hass, secondaryEntity), 0)
    : 0;
  const bottomSolarState = sumTotalConfig
    ? solar.state.total - secondarySolarStateWatts
    : solar.state.total;
  const showSatellites = !!solar2?.has;
  return html`<div class="circle-container solar ${showSatellites ? "has-satellites" : ""}">
    <span class="label">${solar.name}</span>
    <div
      class="circle ${disableEntityClick ? "pointer-events-none" : ""}"
      @click=${(e: MouseEvent) => {
        main.onEntityClick(e, solar, solar.entity);
      }}
      @dblclick=${(e: MouseEvent) => {
        main.onEntityDoubleClick(e, solar, solar.entity);
      }}
      @pointerdown=${(e: PointerEvent) => {
        main.onEntityPointerDown(e, solar, solar.entity);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
        if (e.key === "Enter") {
          main.openDetails(e, solar, solar.entity, "tap");
        }
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      ${shouldShowSecondary()
        ? generalSecondarySpan(main.hass, main, config, templatesObj, solar, "solar")
        : nothing}
      ${solar.icon !== " "
        ? html` <ha-icon id="solar-icon" .icon=${solar.icon}></ha-icon>`
        : nothing}
      ${entities.solar?.display_zero_state !== false || (bottomSolarState || 0) > 0
        ? html` <span class="solar">
            ${displayValue(main.hass, config, bottomSolarState, {
              unit: solar.state.unit,
              unitWhiteSpace: solar.state.unit_white_space,
              decimals: solar.state.decimals,
            })}
          </span>`
        : nothing}
    </div>
    ${showSatellites
      ? satelliteElement(main, config, { data: solar1Own, position: "left", colorClass: "solar" })
      : nothing}
    ${showSatellites
      ? satelliteElement(main, config, { data: solar2, position: "right", colorClass: "solar2" })
      : nothing}
  </div>`;
};
