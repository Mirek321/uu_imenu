//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import UU5 from "uu5g04";
import Uu5Imaging from "uu5imagingg01";
import Config from "../config/config.js";
import IngredienceFormCreate from "./ingredience-form-create";
import IngredienceFormUpdate from "./ingredience-form-update";
import IngredienceFormPurchase from "./ingredience-form-purchase";
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
    let [openCreate, setOpenCreate] = useState(false);
    let [openUpdate, setOpenUpdate] = useState(false);
    let [openPurchase, setOpenPurchase] = useState(false);
    let [data1, setData1] = useState();
    const modalRef = useRef();
    const COLUMN_LIST = [
      { value: "name", label: "Názov ingrediencie:" },
      { value: "amount", label: "Množstvo na sklade" },
      { value: "unit", label: "Jednotka" },
      { value: "allergen", label: "Alergén" },
      { header: "Akcie", type: "actionList" },
    ];

    function getActionList() {
      let actionList = [
        {
          icon: "mdi-plus",
          tooltip: "Pridanie ingrediencie",
          onClick: () => addNewIngredience(),
        },
        {
          icon: "mdi-cart",
          tooltip: "Nový nákup",
          onClick: () => newPurchase(),
        },
      ];
      return actionList;
    }

    function getTileActionList({ rowList, data }) {
      let itemList = [
        {
          icon: "mdi-pencil",
          tooltip: "Upraviť ingredienciu",
          onClick: () => updateIngredience(data),
        },
        {
          icon: "mdi-delete",
          tooltip: "Odstrániť ingredienciu",
          onClick: () => removeIngredience(data),
        },
      ];
      return itemList;
    }
    function removeIngredience(data) {
      props.onDelete({ id: data.data.id });
    }
    function addNewIngredience() {
      setOpenCreate(true);
    }
    function updateIngredience(data) {
      setData1(data);
      setOpenUpdate(true);
    }
    function closeModal() {
      setOpenCreate(false);
      setOpenUpdate(false);
      setOpenPurchase(false);
    }
    function  newPurchase(){
      setOpenPurchase(true)
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

        <Uu5Tiles.ControllerProvider serieList={COLUMN_LIST} data={props.data}>
          <Uu5Elements.Block actionList={[{ component: <Uu5TilesControls.SearchButton /> }]}>
            <Plus4u5Elements.IdentificationBlock
              header={"Ingrediencie na sklade"}
              actionList={getActionList()}
              headerSeparator={true}
              card={"full"}
            >
              <Uu5TilesElements.List getActionList={getTileActionList} view={"grid"} />
            </Plus4u5Elements.IdentificationBlock>
          </Uu5Elements.Block>
        </Uu5Tiles.ControllerProvider>
        <Uu5Elements.Modal header={"Pridanie ingrediencie"} open={openCreate}>
          <IngredienceFormCreate onSave={props.onCreate} onClose={closeModal} />
        </Uu5Elements.Modal>
        <Uu5Elements.Modal header={"Upravenie ingrediencie"} open={openUpdate}>
          <IngredienceFormUpdate data={data1} onUpdate={props.onUpdate} onClose={closeModal} />
        </Uu5Elements.Modal>
        <Uu5Elements.Modal header={"Nákup nových ingrediencíich"} open={openPurchase}>
          <IngredienceFormPurchase data={props.data} onUpdateMany={props.onUpdateMany} onClose={closeModal} />
        </Uu5Elements.Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceView };
export default IngredienceView;
//@@viewOff:exports
