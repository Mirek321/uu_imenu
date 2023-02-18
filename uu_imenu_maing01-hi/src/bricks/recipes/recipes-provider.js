//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import UU5 from "uu5g04";
import Config from "../config/config.js";
import Calls from "../../calls";
import RecipesView from "../recipes/recipes-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipesProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesProvider",
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
      return Calls.recipeList();
    }
    function recipeCreate(data) {
      console.log(data);
      return Calls.recipeCreate(data);
    }
    function recipeDelete(data) {
      return Calls.recipeDelete({ id: data.id });
    }
    //@@viewOff:private

    //@@viewOn:hooks
    const callResult = useDataObject({ handlerMap: { load: recipeList, create: recipeCreate, delete: recipeDelete } });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap, errorData } = callResult;
    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "ready":
      case "readyNoData":
        return <RecipesView data={data} onCreate={handlerMap.create} onDelete={handlerMap.delete} />;
    }
    console.log(callResult);
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesProvider };
export default RecipesProvider;
//@@viewOff:exports
