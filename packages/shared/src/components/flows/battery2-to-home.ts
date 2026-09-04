import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { checkHasRightIndividual } from "@flixlix-cards/shared/utils/compute-individual-position";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { classMap } from "lit/directives/class-map.js";
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
 * Battery 2's own flow line to home. Battery2 renders directly beside
 * battery1 in the same row (see render()), so this uses the exact same
 * overlay box as the original six lines.
 */
export const flowBattery2ToHome = (
  config: FlowCardPlusConfig,
  { battery2, individual, newDur }: Flows
) => {
  const shouldShow =
    battery2.has && showLine(config, battery2.state.toHome) && !config.entities.home?.hide;
  if (!shouldShow) return nothing;

  return html`<div
    class="lines ${classMap({
      high: true,
      "multi-individual": checkHasRightIndividual(individual),
    })}"
  >
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      id="battery2-home-flow"
    >
      <path
        id="battery2-home"
        class="battery2-home ${styleLine(battery2.state.toHome || 0, config)}"
        d="M9.5,100 C9.5,75 104.5,75 104.5,60.8"
        vector-effect="non-scaling-stroke"
      ></path>
      ${battery2ToHomeDot(config, battery2, newDur)}
    </svg>
  </div>`;
};
