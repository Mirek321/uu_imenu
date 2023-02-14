//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import UU5 from "uu5g04";

import Uu5Imaging from "uu5imagingg01";
import RecipesForm from "./recipes-form";
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
    const { data } = props;
    let [open, setOpen] = useState(false);
    const modalRef = useRef();

    const COLUMN_LIST = [
      { value: "name", header: "Názov receptu" },
      { value: "type_recipe", header: "Typ jedla" },
      { value: "link_photo", header: "Obrazok", type: "image" },
      { header: "Akcie", type: "actionList" },
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
    function getTileActionList({ rowList, data }) {
      let itemList = [
        {
          icon: "mdi-minus",
          tooltip: "Odstranit recept",
          onClick: () => removeRecipe(),
        },
      ];
      return itemList;
    }
    function removeRecipe(data) {
      console.log();
    }
    function addNewRecipe() {
      setOpen(true);
      console.log("Adding new ticket");
    }
    function closeModal() {
      setOpen(false);
    }
    const grid = (props) => {
      let data = props.data;
      console.log("test");

      return (
        <Uu5Elements.Grid.Item>
          <Uu5Elements.Box>
            <UU5.Imaging.Image src={data.link_photo} />
            <h3>{data.name}</h3>
            <p>{data.type_recipe}</p>
          </Uu5Elements.Box>
        </Uu5Elements.Grid.Item>
      );
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipesView);
    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Uu5TilesElements.Grid data={props.data.itemList} tileMaxWidth={480} tileMinWidth={310}>
          {grid}
        </Uu5TilesElements.Grid>
        {/*<Plus4u5Elements.IdentificationBlock*/}
        {/*  header={"Zoznam receptov"}*/}
        {/*  actionList={getActionList()}*/}
        {/*  headerSeparator={true}*/}
        {/*  card={"full"}*/}
        {/*>*/}
        {/*  <Uu5TilesElements.List*/}
        {/*    view={"grid"}*/}
        {/*    columnList={COLUMN_LIST}*/}
        {/*    data={props.data.itemList}*/}
        {/*    getActionList={getTileActionList}*/}
        {/*  ></Uu5TilesElements.List>*/}
        {/*</Plus4u5Elements.IdentificationBlock>*/}
        <Uu5Elements.Modal header={"Vytvorenie novehou receptu"} open={open}>
          <RecipesForm onSave={props.onCreate} onClose={closeModal} />
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
