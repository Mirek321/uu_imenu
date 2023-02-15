//@@viewOn:imports
import { createComponent, useRoute } from "uu5g05";
import Config from "./config/config.js";
import RecipesDetailProvider from "../bricks/recipes/recipes-detail-provider";
import RecipeDetailProvider from "../bricks/recipe-detail/recipe-detail-provider";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipesDetail = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesDetail",
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
    //@@viewOff:private

    //@@viewOn:interface
    return <RecipesDetailProvider />;
    //@@viewOff:interface

    //@@viewOn:render
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesDetail };
export default RecipesDetail;
//@@viewOff:exports
