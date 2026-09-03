import { type IndividualObject } from "@flixlix-cards/shared/states/raw/individual/get-individual-object";
import { type FlowCardPlusConfig, type NewDur } from "@flixlix-cards/shared/types";
import { html } from "lit";
import { flowBattery2ToGrid } from "./battery2-to-grid";
import { flowBattery2ToHome } from "./battery2-to-home";
import { flowBatteryToGrid } from "./battery-to-grid";
import { flowBatteryToHome } from "./battery-to-home";
import { flowGridToHome } from "./grid-to-home";
import { flowSolar2ToGrid } from "./solar2-to-grid";
import { flowSolar2ToHome } from "./solar2-to-home";
import { flowSolarToGrid } from "./solar-to-grid";
import { flowSolarToHome } from "./solar-to-home";
import { flowSolarToBattery } from "./solart-to-battery";

export interface Flows {
  battery: any;
  battery2: any;
  grid: any;
  individual: IndividualObject[];
  solar: any;
  solar2: any;
  newDur: NewDur;
}

export const flowElement = (config: FlowCardPlusConfig, flows: Flows) => {
  return html`
  ${flowSolarToHome(config, flows)}
  ${flowSolarToGrid(config, flows)}
  ${flowSolarToBattery(config, flows)}
  ${flowGridToHome(config, flows)}
  ${flowBatteryToHome(config, flows)}
  ${flowBatteryToGrid(config, flows)}
  ${flowSolar2ToHome(config, flows)}
  ${flowSolar2ToGrid(config, flows)}
  ${flowBattery2ToHome(config, flows)}
  ${flowBattery2ToGrid(config, flows)}
</div>`;
};
