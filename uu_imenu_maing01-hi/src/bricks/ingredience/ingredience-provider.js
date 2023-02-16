//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import RecipesView from "../recipes/recipes-view";
import Calls from "../../calls";
import IngredienceView from "./ingredience-view";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const IngredienceProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceProvider",
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
    function ingredienceList() {
      return Calls.ingredienceList();
    }
    //@@viewOff:private
    //@@viewOn:hooks
    const callResult = useDataObject({ handlerMap: { load: ingredienceList } });
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
        return <IngredienceView data={data} />;
    }
    console.log(callResult);
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceProvider };
export default IngredienceProvider;
//@@viewOff:exports
