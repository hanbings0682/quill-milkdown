import { MilkdownPlugin } from "@milkdown/kit/ctx";

export const atPlugin: MilkdownPlugin = (ctx) => {
  // #1 prepare plugin
  console.log("1")
  return async () => {
    // #2 run plugin
    console.log("2")
    return async () => {
      // #3 clean up plugin
      console.log("3")
    };
  };
};