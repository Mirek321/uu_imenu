//@@viewOn:imports
import { createComponent, useRoute } from "uu5g05";
import Config from "./config/config.js";
import IngredienceProvider from "../bricks/ingredience/ingredience-provider";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Ingredience = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Ingredience",
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
    return <IngredienceProvider />;
    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Ingredience };
export default Ingredience;
//@@viewOff:exports
