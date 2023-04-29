//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
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

    //@@viewOff:private
    //@@viewOn:hooks
    const callResult = useDataList({
      handlerMap: {
        load: Calls.ingredienceList,
        createIngrediencie: Calls.ingredienceCreate,
        updateIngredience: Calls.ingredienceUpdate,
        deleteIngredience: Calls.ingredienceDelete,
      },
    });
    // const callResult = useDataObject({
    //   handlerMap: {
    //     load: ingredienceList,
    //     delete: ingredienceDelete,
    //     create: ingredienceCreate,
    //     update: ingredienceUpdate,
    //   },
    // });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;
    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";
      case "readyNoData":
      case "ready":
        return (
          <IngredienceView
            data={data}
            onDelete={handlerMap.deleteIngredience}
            onCreate={handlerMap.createIngrediencie}
            onUpdate={handlerMap.updateIngredience}
          />
        );
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
