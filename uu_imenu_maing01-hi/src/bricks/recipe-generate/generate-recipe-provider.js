//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
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
    function recipeList() {
      console.log("List");
      return Calls.recipeList();
    }
    function recipeGenerate(filter) {
      // const filter = {
      //   count_meals: [
      //     { name: "polievka", count: 0 },
      //     { name: "hlavné jedlo", count: 1 },
      //   ],
      //   days: ["Pondelok", "Utorok", "Štvrtok", "Piatok"],
      //   category: ["mäsité"],
      // };
      return Calls.recipeGenerate(filter);
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
        return <GenerateRecipeView data={data} onGenerate={handlerMap.generate} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeProvider };
export default GenerateRecipeProvider;
//@@viewOff:exports
