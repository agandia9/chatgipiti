import { getCurrentTime } from "./tools/getCurrentTime.js";

export const availableTools = {
  getCurrentTime,
};

export const toolDefinitions = [
  {
    type: "function",
    name: "getCurrentTime",
    description: "Returns the current date and time",
  },
];
