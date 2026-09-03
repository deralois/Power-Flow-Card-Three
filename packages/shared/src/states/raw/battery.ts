import { getEntityState } from "@flixlix-cards/shared/states/utils/get-entity-state";
import { type FlowCardPlusConfig } from "@flixlix-cards/shared/types";
import { type HomeAssistant } from "custom-card-helpers";
import { getFieldInState, getFieldOutState } from "./base";

export const getBatteryStateOfCharge = (hass: HomeAssistant, config: FlowCardPlusConfig) => {
  const entity = config.entities.battery?.state_of_charge;

  if (entity === undefined) return null;

  return getEntityState(hass, entity);
};

export const getBatteryInState = (hass: HomeAssistant, config: FlowCardPlusConfig) =>
  getFieldInState(hass, config, "battery");

export const getBatteryOutState = (hass: HomeAssistant, config: FlowCardPlusConfig) =>
  getFieldOutState(hass, config, "battery");

export const getBattery2StateOfCharge = (hass: HomeAssistant, config: FlowCardPlusConfig) => {
  const entity = config.entities.battery2?.state_of_charge;

  if (entity === undefined) return null;

  return getEntityState(hass, entity);
};

export const getBattery2InState = (hass: HomeAssistant, config: FlowCardPlusConfig) =>
  getFieldInState(hass, config, "battery2");

export const getBattery2OutState = (hass: HomeAssistant, config: FlowCardPlusConfig) =>
  getFieldOutState(hass, config, "battery2");
