import { css } from "lit";

export { allDynamicStyles } from "./all";
export { computeColor } from "./colors";
export { convertColorListToHex } from "./convert-color";

export const styles = css`
  :host {
    --size-circle-entity: 79.99px;
    --mdc-icon-size: 24px;
    --clickable-cursor: pointer;
    --individual-left-bottom-color: #d0cc5b;
    --individual-left-top-color: #964cb5;
    --individual-right-top-color: #b54c9d;
    --individual-right-bottom-color: #5bd0cc;
    --non-fossil-color: var(--energy-non-fossil-color, #0f9d58);
    --icon-non-fossil-color: var(--non-fossil-color, #0f9d58);
    --icon-solar-color: var(--energy-solar-color, #ff9800);
    --icon-individual-bottom-color: var(--individual-left-bottom-color, #d0cc5b);
    --icon-individual-top-color: var(--individual-left-top-color, #964cb5);
    --icon-grid-color: var(--energy-grid-consumption-color, #488fc2);
    --icon-battery-color: var(--energy-battery-in-color, #f06292);
    --icon-home-color: var(--energy-grid-consumption-color, #488fc2);
    --text-solar-color: var(--primary-text-color);
    --text-non-fossil-color: var(--primary-text-color);
    --text-individual-bottom-color: var(--primary-text-color);
    --text-individual-top-color: var(--primary-text-color);
    --text-home-color: var(--primary-text-color);
    --secondary-text-individual-bottom-color: var(--primary-text-color);
    --secondary-text-individual-top-color: var(--primary-text-color);
    --text-battery-state-of-charge-color: var(--primary-text-color);
    --cirlce-grid-color: var(--energy-grid-consumption-color, #488fc2);
    --circle-battery-color: var(--energy-battery-in-color, #f06292);
    --battery-grid-line: var(--energy-grid-return-color, #8353d1);
    --secondary-text-solar-color: var(--primary-text-color);
    --secondary-text-grid-color: var(--primary-text-color);
    --secondary-text-home-color: var(--primary-text-color);
    --secondary-text-non-fossil-color: var(--primary-text-color);
    --lines-svg-not-flat-line-height: 106%;
    --lines-svg-not-flat-line-top: -2%;
    --lines-svg-flat-width: calc(100% - 160px);
    --lines-svg-not-flat-width: calc(103% - 165px);
    --lines-svg-not-flat-multi-indiv-height: 104%;
    --lines-svg-not-flat-multi-indiv-width: calc(103% - var(--size-circle-entity) * 3.7);
    --lines-svg-not-flat-multi-indiv-width: calc(((106% - 165px) * 0.5));
    --lines-svg-not-flat-multi-indiv-width: calc(((130% - 246px) * 0.5));
    --lines-svg-not-flat-multi-indiv-right-indiv-width: calc(((130% - 210px) * 0.5));
    --lines-svg-not-flat-multi-indiv-right-indiv-height: 103%;
    --lines-svg-flat-multi-indiv-width: calc((129% - 242px) * 0.5);
    --lines-svg-flat-left: 0;
    --lines-svg-not-flat-left: 0;
    --dot-size: 3.5px;

    --transparency: var(--transparency-unused-lines);
    --greyed-out--line-color: #bdbdbd;
    --text-grid-consumption-color: var(--energy-grid-consumption-color);
    --text-grid-return-color: var(--energy-grid-return-color);
    --text-battery-in-color: var(--energy-battery-in-color);
    --text-battery-out-color: var(--energy-battery-out-color);
    --home-circle-animation: rotate-in 0.6s ease-in;

    /*
     * second PV system / second battery. Unlike --energy-solar-color etc.
     * (which Home Assistant's own theme defines globally, so this card only
     * ever needs a fallback), HA has no concept of a second source — these
     * names are ours alone, so they need real default VALUES here, not just
     * a fallback on their derived --icon-*/--text-* variables, or every
     * plain var(--energy-solar2-color) usage (e.g. border-color) resolves
     * to nothing and silently falls back to the browser default (white).
     */
    --energy-solar2-color: #ffc107;
    --energy-battery2-in-color: #7e57c2;
    --energy-battery2-out-color: #26a69a;
    --icon-solar2-color: var(--energy-solar2-color);
    --text-solar2-color: var(--primary-text-color);
    --secondary-text-solar2-color: var(--primary-text-color);
    --icon-battery2-color: var(--energy-battery2-in-color);
    --circle-battery2-color: var(--energy-battery2-in-color);
    --text-battery2-state-of-charge-color: var(--primary-text-color);
    --text-battery2-in-color: var(--energy-battery2-in-color);
    --text-battery2-out-color: var(--energy-battery2-out-color);
  }

  ha-card {
    overflow: hidden;
  }

  ha-card.full-size {
    height: 100%;
  }

  .card-content.full-size {
    transform: scale(2) translateY(30%);
  }

  .card-content {
    position: relative;
    margin: 0 auto;
  }

  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    position: relative;
    text-decoration: none;
    color: var(--primary-text-color);
    gap: 2px;
    overflow: hidden;
  }

  .circle > ha-ripple {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .circle > :not(ha-ripple) {
    position: relative;
    z-index: 1;
  }

  .card-content,
  .row {
    max-width: 470px;
  }
  .lines {
    position: absolute;
    bottom: 0;
    left: var(--size-circle-entity);
    width: 100%;
    height: 146px;
    display: flex;
    justify-content: flex-start;
    padding: 0 16px 16px;
    box-sizing: border-box;
    pointer-events: none;
  }

  :dir(rtl) .lines {
    justify-content: flex-end;
  }

  .lines:not(.multi-individual) svg.flat-line {
    left: var(--lines-svg-flat-left);
  }

  .lines:not(.multi-individual) svg:not(.flat-line) {
    left: var(--lines-svg-not-flat-left);
  }

  .lines:has(svg:not(.flat-line)) {
    margin-left: -1%;
  }
  .lines.individual-bottom-individual-top {
    bottom: 110px;
  }
  .lines.high {
    bottom: 100px;
    height: 156px;
  }

  .lines svg {
    width: var(--lines-svg-flat-width);
    height: 100%;
    max-width: 340px;
    position: relative;
  }

  .lines svg:not(.flat-line) {
    width: var(--lines-svg-not-flat-width);
    height: var(--lines-svg-not-flat-line-height);
    top: var(--lines-svg-not-flat-line-top);
  }

  .multi-individual {
    left: calc(var(--size-circle-entity) + 2%);
    margin-left: -2.2% !important;
  }

  .multi-individual svg {
    width: var(--lines-svg-flat-multi-indiv-width);
  }

  .multi-individual svg:not(.flat-line) {
    width: var(--lines-svg-not-flat-multi-indiv-width);
    margin-top: 1px;
    height: var(--lines-svg-not-flat-multi-indiv-height);
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 500px;
    margin: 0 auto;
  }
  .circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .circle-container.solar {
    height: 130px;
  }
  .circle-container.individual-top {
    height: 130px;
  }
  .circle-container.individual-bottom {
    justify-content: flex-end;
  }
  .circle-container.individual-bottom.bottom {
    position: relative;
    top: -20px;
    margin-bottom: -20px;
  }
  .circle-container.battery {
    height: 110px;
    justify-content: flex-end;
  }
  .circle-container.solar2 {
    height: 130px;
  }
  .circle-container.battery2 {
    height: 110px;
    justify-content: flex-end;
  }
  .spacer {
    width: var(--size-circle-entity);
  }

  .circle-container .circle {
    cursor: var(--clickable-cursor);
  }
  #battery-grid {
    stroke: var(--battery-grid-line);
  }
  #battery2-grid {
    /* battery2's line only ever shows its own export-to-grid direction
       (charging stays a shared/generic line on battery1, see battery2-to-grid.ts) */
    stroke: var(--energy-battery2-out-color);
  }
  ha-icon {
    display: inline;
    padding-bottom: 2px;
  }
  ha-icon.small {
    --mdc-icon-size: 12px;
  }
  .label {
    color: var(--secondary-text-color);
    font-size: 12px;
    max-width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-height: 20px;
  }

  .card-content.no-labels .label {
    display: none;
  }

  .card-content.no-labels .circle-container.solar,
  .card-content.no-labels .circle-container.low-carbon,
  .card-content.no-labels .circle-container.individual-top {
    height: 110px !important;
  }

  .card-content.no-labels .right-individual-flow-container,
  .card-content.no-labels .lines {
    transform: translateY(20px);
  }

  /*
   * Solar2/battery2 "satellite" bubbles: a second PV system/battery shows
   * up as a small extra circle near the main one, connected by a short
   * straight line, rather than an independent flow line all the way to
   * home/grid. Absolutely positioned so they never affect the main
   * circle-container's own box size — the row's flex layout (and every
   * flow-line coordinate calibrated against it) stays exactly as it was
   * for single-source configs.
   *
   * Positioned ABOVE the circle for solar (row 1, topmost — nothing above
   * it to collide with) and BELOW it for battery (row 3, bottommost —
   * nothing below it either), rather than to the left/right: on narrow
   * (phone-width) cards the horizontal gap between adjacent row slots can
   * shrink to exactly 0px, so anything placed sideways WILL overlap the
   * neighboring circle (individual devices, grid, home, ...) — there is no
   * satellite size small enough to avoid that. Vertical space above/below
   * the outermost rows doesn't have that constraint.
   */
  .circle-container.solar,
  .circle-container.battery {
    position: relative;
  }
  /*
   * Guaranteed clearance for the satellites above/below the card's own
   * content, independent of however much padding ha-card itself happens to
   * have in a given Home Assistant theme — without this, ha-card's own
   * "overflow: hidden" could clip the satellites right at the card edge.
   * Deliberately added to ha-card itself, not .card-content: .card-content
   * is "position: relative" and every flow line is positioned absolute
   * against ITS padding edge (e.g. "bottom: 0") — padding .card-content
   * directly would shift that whole reference point and re-break the
   * original six lines' alignment with the actual row content.
   */
  ha-card.has-solar-satellites {
    padding-top: 48px;
  }
  ha-card.has-battery-satellites {
    padding-bottom: 48px;
  }
  .satellite {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 36px;
    pointer-events: auto;
  }
  .circle-container.solar .satellite {
    bottom: calc(100% + 6px);
  }
  .circle-container.battery .satellite {
    top: calc(100% + 6px);
  }
  .satellite-left {
    left: -14px;
  }
  .satellite-right {
    right: -14px;
  }
  .satellite-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    line-height: 8px;
    cursor: var(--clickable-cursor);
    position: relative;
    overflow: hidden;
    gap: 0px;
  }
  .satellite-circle > ha-ripple {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
  }
  .satellite-circle ha-icon {
    --mdc-icon-size: 11px;
  }
  .satellite-connector {
    position: absolute;
    left: 50%;
    width: 2px;
    height: 6px;
    transform: translateX(-50%);
  }
  .circle-container.solar .satellite-connector {
    bottom: -6px;
  }
  .circle-container.battery .satellite-connector {
    top: -6px;
  }
  .satellite-label {
    font-size: 8px;
    max-width: 40px;
    margin-top: 1px;
    min-height: 0;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .satellite-circle {
    background-color: var(--card-background-color, #111);
  }
  .satellite-circle.solar {
    border-color: var(--energy-solar-color);
  }
  .satellite-circle.solar ha-icon,
  .satellite-circle.solar span {
    color: var(--energy-solar-color);
  }
  .satellite-connector.solar {
    background-color: var(--energy-solar-color);
  }
  .satellite-circle.solar2 {
    border-color: var(--energy-solar2-color);
  }
  .satellite-circle.solar2 ha-icon,
  .satellite-circle.solar2 span {
    color: var(--energy-solar2-color);
  }
  .satellite-connector.solar2 {
    background-color: var(--energy-solar2-color);
  }
  .satellite-circle.battery {
    border-color: var(--circle-battery-color);
  }
  .satellite-circle.battery ha-icon,
  .satellite-circle.battery span {
    color: var(--circle-battery-color);
  }
  .satellite-connector.battery {
    background-color: var(--circle-battery-color);
  }
  .satellite-circle.battery2 {
    border-color: var(--circle-battery2-color);
  }
  .satellite-circle.battery2 ha-icon,
  .satellite-circle.battery2 span {
    color: var(--circle-battery2-color);
  }
  .satellite-connector.battery2 {
    background-color: var(--circle-battery2-color);
  }

  line,
  path {
    stroke: var(--disabled-text-color);
    stroke-width: 1;
    fill: none;
  }
  path.transparency {
    opacity: calc(calc(100 - var(--transparency)) / 100);
  }
  path.grey {
    stroke: var(--greyed-out--line-color) !important;
  }
  .circle svg {
    position: absolute;
    fill: none;
    stroke-width: 4px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  span.secondary-info {
    color: var(--primary-text-color);
    font-size: 12px;
    max-width: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .individual-top path,
  .individual-top circle {
    stroke: var(--individual-left-top-color);
  }

  #individual-left-bottom-icon {
    color: var(--icon-individual-left-bottom-color);
  }
  #individual-left-top-icon {
    color: var(--icon-individual-left-top-color);
  }

  #individual-right-bottom-icon {
    color: var(--icon-individual-right-bottom-color);
  }
  #individual-right-top-icon {
    color: var(--icon-individual-right-top-color);
  }

  #solar-icon {
    color: var(--icon-solar-color);
  }
  circle.individual-top {
    stroke-width: 4;
    width: var(--dot-size);
    fill: var(--individual-left-top-color);
  }
  circle.individual-bottom {
    stroke-width: 4;
    width: var(--dot-size);
    fill: var(--individual-left-bottom-color);
  }
  .individual-top .circle {
    border-color: var(--individual-left-top-color);
  }
  .individual-bottom path,
  .individual-bottom circle {
    stroke: var(--individual-left-bottom-color);
  }
  .individual-bottom .circle {
    border-color: var(--individual-left-bottom-color);
  }

  .individual-right-top .circle {
    border-color: var(--individual-right-top-color);
  }

  circle.individual-right-top .circle {
    fill: var(--individual-right-top-color);
  }

  .individual-right-top path,
  .individual-right-top circle {
    stroke: var(--individual-right-top-color);
  }
  .individual-right-bottom .circle {
    border-color: var(--individual-right-bottom-color);
  }

  circle.individual-right-bottom .circle {
    fill: var(--individual-right-bottom-color);
  }

  .individual-right-bottom path,
  .individual-right-bottom circle {
    stroke: var(--individual-right-bottom-color);
  }

  .right-individual-flow-container {
    position: absolute;
    right: calc(var(--size-circle-entity) - 27% * 1.1 + 6px);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 156px;
    bottom: 100px;
    padding: 0 16px 16px;
    margin-right: -1.2%;
    box-sizing: border-box;
    pointer-events: none;
  }
  .right-individual-flow-container > svg {
    width: var(--lines-svg-not-flat-multi-indiv-right-indiv-width);
  }

  .right-individual-flow {
    height: var(--lines-svg-not-flat-multi-indiv-right-indiv-height);
    margin-top: 2px;
    width: var(--lines-svg-not-flat-multi-indiv-width);
    top: var(--lines-svg-not-flat-line-top);
    max-width: 340px;
    position: relative;
  }
  .circle-container.low-carbon {
    height: 130px;
  }
  .low-carbon path {
    stroke: var(--non-fossil-color);
  }
  .low-carbon .circle {
    border-color: var(--non-fossil-color);
  }
  .low-carbon ha-icon:not(.small) {
    color: var(--icon-non-fossil-color);
  }
  circle.low-carbon {
    stroke-width: 4;
    fill: var(--non-fossil-color);
    stroke: var(--non-fossil-color);
  }
  .solar {
    color: var(--primary-text-color);
  }
  .solar .circle {
    border-color: var(--energy-solar-color);
  }
  .solar ha-icon:not(.small) {
    color: var(--icon-solar-color);
  }
  circle.solar,
  path.solar {
    stroke: var(--energy-solar-color);
  }
  circle.solar {
    stroke-width: 4;
    fill: var(--energy-solar-color);
  }
  .solar2 {
    color: var(--primary-text-color);
  }
  .solar2 .circle {
    border-color: var(--energy-solar2-color);
  }
  .solar2 ha-icon:not(.small) {
    color: var(--icon-solar2-color);
  }
  circle.solar2,
  path.solar2 {
    stroke: var(--energy-solar2-color);
  }
  circle.solar2 {
    stroke-width: 4;
    fill: var(--energy-solar2-color);
  }
  span.solar2 {
    color: var(--text-solar2-color);
  }
  .solar2 span.secondary-info {
    color: var(--secondary-text-solar2-color);
  }
  .battery .circle {
    border-color: var(--circle-battery-color);
  }
  circle.battery,
  path.battery {
    stroke: var(--energy-battery-out-color);
  }
  path.battery-home,
  circle.battery-home {
    stroke: var(--energy-battery-out-color);
  }
  circle.battery-home {
    stroke-width: 4;
    fill: var(--energy-battery-out-color);
  }
  path.battery-solar,
  circle.battery-solar {
    stroke: var(--energy-battery-in-color);
  }
  circle.battery-solar {
    stroke-width: 4;
    fill: var(--energy-battery-in-color);
  }
  .battery-in {
    color: var(--energy-battery-in-color);
  }
  .battery-out {
    color: var(--energy-battery-out-color);
  }
  span.battery-in {
    color: var(--text-battery-in-color);
  }
  span.battery-out {
    color: var(--text-battery-out-color);
  }
  path.battery-from-grid {
    stroke: var(--energy-grid-consumption-color);
  }
  path.battery-to-grid {
    stroke: var(--battery-grid-line);
  }
  .battery ha-icon:not(.small) {
    color: var(--icon-battery-color);
  }
  .battery2 .circle {
    border-color: var(--circle-battery2-color);
  }
  path.battery2-home,
  circle.battery2-home {
    stroke: var(--energy-battery2-out-color);
  }
  circle.battery2-home {
    stroke-width: 4;
    fill: var(--energy-battery2-out-color);
  }
  .battery2 ha-icon:not(.small) {
    color: var(--icon-battery2-color);
  }
  #battery2-state-of-charge-text {
    color: var(--text-battery2-state-of-charge-color);
  }

  path.return,
  circle.return,
  circle.battery-to-grid {
    stroke: var(--energy-grid-return-color);
  }
  circle.return,
  circle.battery-to-grid {
    stroke-width: 4;
    fill: var(--energy-grid-return-color);
  }
  .return {
    color: var(--energy-grid-return-color);
  }
  span.return {
    color: var(--text-grid-return-color);
  }
  .grid .circle {
    border-color: var(--circle-grid-color);
  }
  .consumption {
    color: var(--energy-grid-consumption-color);
  }
  span.consumption {
    color: var(--text-grid-consumption-color);
  }
  circle.grid,
  circle.battery-from-grid,
  path.grid {
    stroke: var(--energy-grid-consumption-color);
  }
  circle.grid,
  circle.battery-from-grid {
    stroke-width: 4;
    fill: var(--energy-grid-consumption-color);
  }
  .grid ha-icon:not(.small) {
    color: var(--icon-grid-color);
  }
  .home .circle {
    border-width: 0;
    border-color: var(--primary-color);
  }
  .home .circle.border {
    border-width: 2px;
  }
  .home ha-icon:not(.small) {
    color: var(--icon-home-color);
  }
  .circle svg circle {
    animation: var(--home-circle-animation);
    transition:
      stroke-dashoffset 0.4s,
      stroke-dasharray 0.4s;
    fill: none;
  }
  span.solar {
    color: var(--text-solar-color);
  }

  span.low-carbon {
    color: var(--text-non-fossil-color);
  }

  span.low-carbon.secondary-info {
    color: var(--secondary-text-non-fossil-color);
  }

  #home-circle {
    color: var(--text-home-color);
    z-index: 2;
  }

  .individual-bottom .circle {
    color: var(--text-individual-bottom-color);
  }

  .individual-top .circle {
    color: var(--text-individual-top-color);
  }

  .individual-bottom span.secondary-info {
    color: var(--secondary-text-individual-bottom-color);
  }

  .individual-top span.secondary-info {
    color: var(--secondary-text-individual-top-color);
  }

  span.secondary-info.left-top {
    color: var(--secondary-text-individual-left-top-color);
  }
  span.individual-left-top {
    color: var(--text-individual-left-top-color);
  }
  span.secondary-info.left-bottom {
    color: var(--secondary-text-individual-left-bottom-color);
  }
  span.individual-left-bottom {
    color: var(--text-individual-left-bottom-color);
  }
  span.secondary-info.right-top {
    color: var(--secondary-text-individual-right-top-color);
  }
  span.individual-right-top {
    color: var(--text-individual-right-top-color);
  }

  span.secondary-info.right-bottom {
    color: var(--secondary-text-individual-right-bottom-color);
  }
  span.individual-right-bottom {
    color: var(--text-individual-right-bottom-color);
  }

  .solar span.secondary-info {
    color: var(--secondary-text-solar-color);
  }

  .grid span.secondary-info {
    color: var(--secondary-text-grid-color);
  }

  .home span.secondary-info {
    color: var(--secondary-text-home-color);
  }

  #battery-state-of-charge-text {
    color: var(--text-battery-state-of-charge-color);
  }

  @keyframes rotate-in {
    from {
      stroke-dashoffset: 238.76104;
      stroke-dasharray: 238.76104;
    }
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-actions a {
    text-decoration: none;
  }

  .home-circle-sections {
    pointer-events: none;
  }

  .pointer-events-none {
    pointer-events: none;
  }
`;
