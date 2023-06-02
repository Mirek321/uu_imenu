//@@viewOn:imports
import { createComponent, useDataObject, useDataList, useEffect } from "uu5g05";
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


    //@@viewOff:private


    const callResultIngredience = useDataObject({
      handlerMap: {
        load: Calls.ingredienceList,
      },
    });
    const callResult = useDataList({
      handlerMap: {
        load: Calls.recipeList,
        create: Calls.recipeCreate,
        delete: Calls.recipeDelete,
        update: Calls.recipeUpdate,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const { state, data, handlerMap, errorData } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return "Loading";

      case "readyNoData":
      case "ready":
        return (
          <RecipesView
            data={data}
            getIngredience={callResultIngredience.data}
            onCreate={handlerMap.create}
            onDelete={handlerMap.delete}
            onUpdate={handlerMap.update}
          />
        );
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
