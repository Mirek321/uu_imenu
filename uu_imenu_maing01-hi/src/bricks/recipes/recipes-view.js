//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import RecipesForm from "./recipes-form";
import Config from "./config/config.js";
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

const RecipesView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesView",
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
    let [open, setOpen] = useState(false);
    const modalRef = useRef();
    const COLUMN_LIST = [
      { value: "name", header: "Názov receptu" },
      { value: "type_recipe", header: "Typ jedla" },
    ];

    function getActionList() {
      let actionList = [
        {
          icon: "mdi-plus",
          tooltip: "Pridat novy recept",
          onClick: () => addNewRecipe(),
        },
      ];
      return actionList;
    }
    function addNewRecipe() {
      setOpen(true);
      console.log("Adding new ticket");
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipesView);
    console.log(props.data.itemList[0].name);
    return currentNestingLevel ? (
      <div {...attrs}>
        <Plus4u5Elements.IdentificationBlock
          header={"Zoznam receptov"}
          actionList={getActionList()}
          headerSeparator={true}
          card={"full"}
        >
          <Uu5TilesElements.Table columnList={COLUMN_LIST} data={props.data.itemList} />
        </Plus4u5Elements.IdentificationBlock>
        <Uu5Elements.Modal header={"Vytvorenie novehou receptu"} ref={modalRef} open={open}>
          <RecipesForm onSave={props.onCreate} />
        </Uu5Elements.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesView };
export default RecipesView;
//@@viewOff:exports
