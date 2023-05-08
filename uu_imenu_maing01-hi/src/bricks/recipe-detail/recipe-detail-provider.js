//@@viewOn:imports
import { createComponent, useDataObject, useRoute } from "uu5g05";
import Config from "../recipes/config/config.js";
import Calls from "../../calls";
import RecipeDetailView from "./recipe-detail-view";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipeDetailProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeDetailProvider",
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
    const [route, setRoute] = useRoute();
    function recipeLoad() {
      return Calls.recipeLoad({ id: route.params.id });
    }
    function recipesUpdate(ingredience) {
      return Calls.ingredienceUpdateMany(ingredience);
    }

    //@@viewOff:private
    //@@viewOn:hooks
    const callResult = useDataObject({ handlerMap: { load: recipeLoad, update: recipesUpdate } });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    /* JSON.stringify(route);
    console.log(typeof route.params.id);*/
    const { state, data, handlerMap, errorData } = callResult;
    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";

      case "readyNoData":
      case "ready":
        return <RecipeDetailView data={data} onLoad={handlerMap.load} onUpdate={handlerMap.update} />;
    }
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeDetailProvider };
export default RecipeDetailProvider;
//@@viewOff:exports
