//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import UU5 from "uu5g04";
import Config from "./config/config.js";
import Calls from "../../calls";
import RecipesView from "./recipes-view";
import generateRecipeView, { GenerateRecipeView } from "./generate-recipe-view";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const GenerateRecipeProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GenerateRecipeProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    function recipeGenerate() {
      console.log("generuje");
      return Calls.recipeGenerate();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:hooks
    const callResult = useDataObject({ handlerMap: { generate: recipeGenerate } });
    //@@viewOff:hooks

    //@@viewOn:render
    const { state, data, handlerMap, errorData } = callResult;
    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "ready":
      case "readyNoData":
        return <GenerateRecipeView data={data} />;
    }
    console.log(callResult);
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeProvider };
export default GenerateRecipeProvider;
//@@viewOff:exports
