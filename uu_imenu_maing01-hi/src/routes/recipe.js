//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import RecipesProvider from "../bricks/recipes/recipes-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Recipe = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Recipe",
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

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    // return <RecipesProvider />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Recipe };
export default Recipe;
//@@viewOff:exports
