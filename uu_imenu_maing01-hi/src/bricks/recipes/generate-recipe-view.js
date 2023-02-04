//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef } from "uu5g05";
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const GenerateRecipeView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GenerateRecipeView",
  nestingLevel: ["areaCollection", "area"],
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
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    console.log(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, GenerateRecipeView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Button>Generuj</Uu5Elements.Button>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeView };
export default GenerateRecipeView;
//@@viewOff:exports
