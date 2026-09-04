import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { checkHasRightIndividual } from "@flixlix-cards/shared/utils/compute-individual-position";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { type Flows } from "./index";

const battery2ToGridDot = (
  config: FlowCardPlusConfig,
  battery2: Flows["battery2"],
  newDur: Flows["newDur"]
) => {
  if (!checkShouldShowDots(config) || !battery2.state.toGrid) return nothing;

  return svg`<circle r="1" class="battery-to-grid" vector-effect="non-scaling-stroke">
      <animateMotion dur="${newDur.battery2Grid}s" repeatCount="indefinite" calcMode="paced">
        <mpath xlink:href="#battery2-grid" />
      </animateMotion>
    </circle>`;
};

/**
 * Battery 2's own export-to-grid flow line. Grid-charges-battery stays a
 * single, combined/generic line on battery 1 (see the module doc on
 * buildCombinedBattery) — this line only ever shows battery2's own
 * discharge-to-grid share, never a charging direction.
 */
export const flowBattery2ToGrid = (
  config: FlowCardPlusConfig,
  { battery2, grid, individual, newDur }: Flows
) => {
  const shouldShow = grid.has && battery2.has && showLine(config, battery2.state.toGrid || 0);
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
      id="battery2-grid-flow"
    >
      <path
        id="battery2-grid"
        class="${styleLine(battery2.state.toGrid || 0, config)}"
        d="M9.5,100 C9.5,75 -3.8,75 -3.8,60.8"
        vector-effect="non-scaling-stroke"
      ></path>
      ${battery2ToGridDot(config, battery2, newDur)}
    </svg>
  </div>`;
};
