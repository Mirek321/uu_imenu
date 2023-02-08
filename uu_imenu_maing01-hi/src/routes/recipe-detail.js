//@@viewOn:imports
import { createComponent, useRoute } from "uu5g05";
import Config from "./config/config.js";
import generateRecipeView from "../bricks/recipes/generate-recipe-view";
import RecipesProvider from "../bricks/recipes/recipes-provider";
import RecipeDetailProvider from "../bricks/recipes/recipe-detail-provider";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipeDetail = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeDetail",
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

    //@@viewOff:interface

    //@@viewOn:render
    return <RecipeDetailProvider />;
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeDetail };
export default RecipeDetail;
//@@viewOff:exports
