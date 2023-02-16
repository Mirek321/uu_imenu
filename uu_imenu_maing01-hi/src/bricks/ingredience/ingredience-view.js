//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import UU5 from "uu5g04";
import Uu5Imaging from "uu5imagingg01";
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

const IngredienceView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceView",
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
    const modalRef = useRef();
    const COLUMN_LIST = [
      { value: "name", header: "Názov ingrediencie" },
      { value: "amount", header: "Množstvo na sklade" },
      { value: "unit", header: "Jednotka" },
      { value: "allergen", header: "Alergén" },
      { header: "Akcie", type: "actionList" },
    ];

    function getActionList() {
      let actionList = [
        {
          icon: "mdi-plus",
          tooltip: "Pridat novy ticket",
          onClick: () => addNewTicket(),
        },
      ];
      return actionList;
    }

    function getTileActionList({ rowList, data }) {
      let itemList = [
        {
          icon: "mdi-minus",
          tooltip: "Odobrat ticket",
          onClick: () => removeTicket(),
        },
      ];
      return itemList;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Plus4u5Elements.IdentificationBlock
          header={"Ingrediencie na sklade"}
          actionList={getActionList()}
          headerSeparator={true}
          card={"full"}
        >
          <Uu5TilesElements.List
            getActionList={getTileActionList}
            view={"grid"}
            columnList={COLUMN_LIST}
            data={props.data.itemList}
          />
        </Plus4u5Elements.IdentificationBlock>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceView };
export default IngredienceView;
//@@viewOff:exports
