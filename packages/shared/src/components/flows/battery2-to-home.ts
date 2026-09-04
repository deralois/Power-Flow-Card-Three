import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { type Flows } from "./index";

const battery2ToHomeDot = (
  config: FlowCardPlusConfig,
  battery2: Flows["battery2"],
  newDur: Flows["newDur"]
) => {
  if (!checkShouldShowDots(config) || !battery2.state.toHome) return nothing;

  return svg`<circle r="1" class="battery2-home" vector-effect="non-scaling-stroke">
      <animateMotion dur="${newDur.battery2ToHome}s" repeatCount="indefinite" calcMode="paced">
        <mpath xlink:href="#battery2-home" />
      </animateMotion>
    </circle>`;
};

/**
 * Battery 2's own flow line to home. Lives in a separate, independently
 * positioned overlay below the primary 3-row layout (`.lines-battery2` in
 * the shared stylesheet) since battery2 renders in its own row below the
 * existing battery row, not in one of the original 4 fixed slots.
 */
export const flowBattery2ToHome = (config: FlowCardPlusConfig, { battery2, newDur }: Flows) => {
  const shouldShow =
    battery2.has && showLine(config, battery2.state.toHome) && !config.entities.home?.hide;
  if (!shouldShow) return nothing;

  return html`<div class="lines-battery2">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      id="battery2-home-flow"
    >
      <path
        id="battery2-home"
        class="battery2-home ${styleLine(battery2.state.toHome || 0, config)}"
        d="M48.6,95.1 C48.6,82.7 -19.6,82.7 -19.6,70.4 C-19.6,51.1 102.8,51.1 102.8,31.7"
        vector-effect="non-scaling-stroke"
      ></path>
      ${battery2ToHomeDot(config, battery2, newDur)}
    </svg>
  </div>`;
};
