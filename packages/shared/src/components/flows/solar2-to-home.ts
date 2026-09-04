import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import {
  checkHasBottomIndividual,
  checkHasRightIndividual,
} from "@flixlix-cards/shared/utils/compute-individual-position";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { classMap } from "lit/directives/class-map.js";
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
 * Solar 2's own flow line to home. Solar2 renders directly beside solar1
 * in the same row (see render()), so this uses the exact same overlay box
 * as the original six lines — just with a longer horizontal reach, since
 * solar2 sits one column further from home.
 */
export const flowSolar2ToHome = (
  config: FlowCardPlusConfig,
  { battery, battery2, individual, solar2, newDur }: Flows
) => {
  const shouldShow =
    solar2.has && showLine(config, solar2.state.toHome || 0) && !config.entities.home?.hide;
  if (!shouldShow) return nothing;

  return html`<div
    class="lines ${classMap({
      high: battery.has || battery2.has || checkHasBottomIndividual(individual),
      "multi-individual": checkHasRightIndividual(individual),
    })}"
  >
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      id="solar2-home-flow"
    >
      <path
        id="solar2"
        class="solar2 ${styleLine(solar2.state.toHome || 0, config)}"
        d="M9.5,0 C9.5,25 104.5,25 104.5,60.8"
        vector-effect="non-scaling-stroke"
      ></path>
      ${solar2ToHomeDot(config, solar2, newDur)}
    </svg>
  </div>`;
};
