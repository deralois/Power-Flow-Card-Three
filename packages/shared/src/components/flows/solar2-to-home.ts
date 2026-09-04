import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { type Flows } from "./index";

const solar2ToHomeDot = (
  config: FlowCardPlusConfig,
  solar2: Flows["solar2"],
  newDur: Flows["newDur"]
) => {
  if (!checkShouldShowDots(config) || !solar2.state.toHome) return nothing;

  return svg`<circle r="1" class="solar2" vector-effect="non-scaling-stroke">
      <animateMotion dur="${newDur.solar2ToHome}s" repeatCount="indefinite" calcMode="paced">
        <mpath xlink:href="#solar2" />
      </animateMotion>
    </circle>`;
};

/**
 * Solar 2's own flow line to home. Lives in a separate, independently
 * positioned overlay above the primary 3-row layout (`.lines-solar2` in the
 * shared stylesheet) since solar2 renders in its own row above the existing
 * solar/non-fossil row, not in one of the original 4 fixed slots.
 */
export const flowSolar2ToHome = (config: FlowCardPlusConfig, { solar2, newDur }: Flows) => {
  const shouldShow =
    solar2.has && showLine(config, solar2.state.toHome || 0) && !config.entities.home?.hide;
  if (!shouldShow) return nothing;

  return html`<div class="lines-solar2">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      id="solar2-home-flow"
    >
      <path
        id="solar2"
        class="solar2 ${styleLine(solar2.state.toHome || 0, config)}"
        d="M48.6,3.8 C48.6,20.8 -19.6,20.8 -19.6,37.9 C-19.6,58.7 102.8,58.7 102.8,79.5"
        vector-effect="non-scaling-stroke"
      ></path>
      ${solar2ToHomeDot(config, solar2, newDur)}
    </svg>
  </div>`;
};
