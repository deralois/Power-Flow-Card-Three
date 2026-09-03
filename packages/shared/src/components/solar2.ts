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
 * A second, independent PV system's circle. Near-identical twin of
 * `solar.ts`, reading `entities.solar2` instead of `entities.solar` and
 * using its own DOM ids/CSS class so it can render alongside the first PV
 * system without colliding with it.
 */
export const solar2Element = (
  main: CardMainContext,
  config: FlowCardPlusConfig,
  {
    entities,
    solar2,
    templatesObj,
  }: {
    entities: ConfigEntities;
    solar2: any;
    templatesObj: TemplatesObj;
  }
) => {
  const disableEntityClick = config.clickable_entities === false;
  const templateResult = templatesObj.solar2Secondary;
  const shouldShowSecondary = () => {
    if (templateResult) return true;
    if (config.entities.solar2?.secondary_info?.display_zero === true) return true;
    if (!solar2?.secondary?.state) return false;
    if (!isNumberValue(solar2?.secondary?.state)) return true;

    const toleranceSet = config.entities.solar2?.secondary_info?.display_zero_tolerance ?? 0;
    return (
      Number(solar2.secondary.state) >= toleranceSet ||
      (config.entities.solar2?.secondary_info?.accept_negative &&
        typeof Number(+solar2.secondary.state) === "number")
    );
  };
  const sumTotalConfig = entities.solar2?.secondary_info?.sum_total;
  const secondaryEntity = config.entities.solar2?.secondary_info?.entity;
  const secondarySolarStateWatts = secondaryEntity
    ? Math.max(getEntityStateWatts(main.hass, secondaryEntity), 0)
    : 0;
  const bottomSolarState = sumTotalConfig
    ? solar2.state.total - secondarySolarStateWatts
    : solar2.state.total;
  return html`<div class="circle-container solar2">
    <span class="label">${solar2.name}</span>
    <div
      class="circle ${disableEntityClick ? "pointer-events-none" : ""}"
      @click=${(e: MouseEvent) => {
        main.onEntityClick(e, solar2, solar2.entity);
      }}
      @dblclick=${(e: MouseEvent) => {
        main.onEntityDoubleClick(e, solar2, solar2.entity);
      }}
      @pointerdown=${(e: PointerEvent) => {
        main.onEntityPointerDown(e, solar2, solar2.entity);
      }}
      @pointerup=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @pointercancel=${(e: PointerEvent) => {
        main.onEntityPointerUp(e);
      }}
      @keyDown=${(e: { key: string; stopPropagation: () => void; target: HTMLElement }) => {
        if (e.key === "Enter") {
          main.openDetails(e, solar2, solar2.entity, "tap");
        }
      }}
    >
      <ha-ripple .disabled=${disableEntityClick}></ha-ripple>
      ${shouldShowSecondary()
        ? generalSecondarySpan(main.hass, main, config, templatesObj, solar2, "solar2")
        : nothing}
      ${solar2.icon !== " "
        ? html` <ha-icon id="solar2-icon" .icon=${solar2.icon}></ha-icon>`
        : nothing}
      ${entities.solar2?.display_zero_state !== false || (bottomSolarState || 0) > 0
        ? html` <span class="solar2">
            ${displayValue(main.hass, config, bottomSolarState, {
              unit: solar2.state.unit,
              unitWhiteSpace: solar2.state.unit_white_space,
              decimals: solar2.state.decimals,
            })}
          </span>`
        : nothing}
    </div>
  </div>`;
};
