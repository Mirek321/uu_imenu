//@@viewOn:imports
import { createComponent, useDataObject, useRoute } from "uu5g05";
import Config from "./config/config.js";
import RecipesDetailView from "./recipes-detail-view";
import Calls from "../../calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipesDetailProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesDetailProvider",
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
    //@@viewOff:private
    //@@viewOn:hooks
    const callResult = useDataObject({ handlerMap: { load: recipeLoad } });
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
        return <RecipesDetailView data={data} />;
    }
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesDetailProvider };
export default RecipesDetailProvider;
//@@viewOff:exports
