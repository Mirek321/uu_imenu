//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute,useEffect } from "uu5g05";
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
import IngredienceFormDelete from "./ingredience-form-delete";
import {QrReader} from "react-qr-reader";
import Uu5Forms from "uu5g05-forms"
import IngredienceFormScanCashReceipt from "./ingredience-form-scan-cash-receipt";


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
    let [openDelete, setOpenDelete] = useState(false);
    let [data1, setData1] = useState();
    let [cashReceiptId, setCashReceiptId] = useState();
    let [cashReceipt,setCashReceipt] = useState("");
    const [ingAmount, setIngAmount] = useState([0]);
    const [ingredience, setIngredience] = useState([""]);
    let [openScanCashReceipt,setOpenScanCashReceipt] = useState(false);
    const countRef = useRef();

    let ingredienceList = [];

    if (ingredienceList.length === 0) {
      ingredienceList.push({ value: "", children: "" });
      props.data.map((value,index) =>  ingredienceList.push({ value: props.data[index].data.id, children: props.data[index].data.name }))

    }


    const COLUMN_LIST = [
      { value: "name", label: "Názov ingrediencie:" },
      { value: "amount", label: "Množstvo na sklade" },
      { value: "unit", label: "Jednotka" },
      { value: "allergen", label: "Alergén" },
      { header: "Akcie", type: "actionList" },
    ];
    let resultCashReceipt;





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
        {
          icon: "mdi-qrcode-scan",
          tooltip: "Naskenovanie pokladnicneho dokladu",
          onClick: () => scanCashReceipt(),
        }
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
    function  scanCashReceipt(){
      setOpenScanCashReceipt(true);
    }
    function removeIngredience(data) {
      // let result = confirm("Naozaj chcete odstrániť "+data.data.name+" ?");
      // if (result) {
      //   props.onDelete({ id: data.data.id });
      // }

      setOpenDelete(true);
       setData1(data);
      // props.onDelete({ id: data.data.id });
    }
    const handleInputChangeIng = (event, index) => {
      const newArray = [...ingredience];
      newArray[index] = event.data.value;
      setIngredience(newArray);
    };
    function deleteIngredience(data){
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
      setOpenScanCashReceipt(false);
    }
    function closeModalPurchase(){
      setOpenPurchase(false);
      window.localStorage.removeItem('MY_CASH_RECEIPT');
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

          <Uu5Elements.Block actionList={[{ component: [<Uu5TilesControls.SearchButton displayType={"menu-item"}/>] }]}>

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
          <IngredienceFormPurchase data={props.data} onUpdateMany={props.onUpdateMany} onFind={props.onFind} onClose={closeModalPurchase} />
        </Uu5Elements.Modal>
        <Uu5Elements.Modal header={"Naskenovanie blokoveho dokladu"} open={openScanCashReceipt}  >
      <IngredienceFormScanCashReceipt onFind={props.onFind} onClose={closeModal}/>
        </Uu5Elements.Modal>
        <Uu5Elements.Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          header={
            "Naozaj chcete odstrániť túto ingredienciu ?"
          }
          info={
            "Data suborou sa nedaju obnovit"
          }
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}

          actionDirection="horizontal"
          actionList={[
            {
              children: "Zrusit",
              onClick: () => console.log("Cancel"),
              significance: "distinct",
            },
            {
              children: "Vymazat",
              onClick: () => deleteIngredience(data1),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceView };
export default IngredienceView;
//@@viewOff:exports
