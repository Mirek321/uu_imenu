//@@viewOn:imports
import { createComponent, useDataObject,useDataList } from "uu5g05";
import UU5 from "uu5g04";
import Config from "../config/config.js";
import Calls from "../../calls";
import RecipesView from "../recipes/recipes-view";
import GenerateRecipeView from "./generate-recipe-view";

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

    function recipeGenerate(filter) {
      return Calls.recipeGenerate(filter);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:hooks
    const callResultIngredience = useDataObject({
      handlerMap: {
        load: Calls.ingredienceList,
      },
    });
    const callResult = useDataObject({ handlerMap: {generate: recipeGenerate } });

    //@@viewOff:hooks

    //@@viewOn:render
    const { state, data, handlerMap, errorData } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "readyNoData":
      case "ready":
        return <GenerateRecipeView data={data} onGenerate={handlerMap.generate}  getIngredience={callResultIngredience.data}/>;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeProvider };
export default GenerateRecipeProvider;
//@@viewOff:exports
