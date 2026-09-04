import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { checkShouldShowDots } from "@flixlix-cards/shared/utils/check-should-show-dots";
import { showLine } from "@flixlix-cards/shared/utils/show-line";
import { styleLine } from "@flixlix-cards/shared/utils/style-line";
import { html, nothing, svg } from "lit";
import { type Flows } from "./index";

const solar2ToGridDot = (
  config: FlowCardPlusConfig,
  solar2: Flows["solar2"],
  newDur: Flows["newDur"]
) => {
  if (!checkShouldShowDots(config) || !solar2.state.toGrid || !solar2.has) return nothing;

  return svg`<circle r="1" class="return" vector-effect="non-scaling-stroke">
      <animateMotion dur="${newDur.solar2ToGrid}s" repeatCount="indefinite" calcMode="paced">
        <mpath xlink:href="#solar2-return" />
      </animateMotion>
    </circle>`;
};

/** Solar 2's own flow line to grid. See `flowSolar2ToHome` for layout context. */
export const flowSolar2ToGrid = (config: FlowCardPlusConfig, { grid, solar2, newDur }: Flows) => {
  const shouldShow =
    grid.has && grid.hasReturnToGrid && solar2.has && showLine(config, solar2.state.toGrid || 0);
  if (!shouldShow) return nothing;

  return html`<div class="lines-solar2">
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      id="solar2-grid-flow"
    >
      <path
        id="solar2-return"
        class="return ${styleLine(solar2.state.toGrid || 0, config)}"
        d="M48.6,3.8 C48.6,20.8 -19.6,20.8 -19.6,37.9 C-19.6,58.7 -5.6,58.7 -5.6,79.5"
        vector-effect="non-scaling-stroke"
      ></path>
      ${solar2ToGridDot(config, solar2, newDur)}
    </svg>
  </div>`;
};
