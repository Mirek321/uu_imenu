//@@viewOn:imports
import { QrReader } from "react-qr-reader";
import { createVisualComponent, Utils, Content, useState, useEffect } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import UU5 from "uu5g04";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Imaging from "uu5imagingg01";
import Config from "../config/config.js";

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

const IngredienceFormPurchase = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceFormPurchase",
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
    const [ingAmount, setIngAmount] = useState([0]);
    const [ingredience, setIngredience] = useState([""]);
    const [cashReceiptId, setCashReceiptId] = useState();

    //@@viewOff:private

    useEffect(() => {
      //Runs on the first render
      //And any time any dependency value changes
      console.log(JSON.parse(window.localStorage.getItem("MY_CASH_RECEIPT")));
      if (JSON.parse(window.localStorage.getItem("MY_CASH_RECEIPT"))) {
        console.log("haha");

        const idArray = JSON.parse(window.localStorage.getItem("MY_CASH_RECEIPT")).map((obj) => obj.id);
        setIngredience(idArray);
        // setIngredience([JSON.parse(window.localStorage.getItem("MY_CASH_RECEIPT"))[0].id]);
        const amountArray = JSON.parse(window.localStorage.getItem("MY_CASH_RECEIPT")).map((obj) => obj.amount);
        setIngAmount(amountArray);
      }
    }, []);

    const handleFindReceipt = () => {
      let resultCashReceipt;
      let cashReceiptIngredience = props.onFind({ receiptId: cashReceiptId });
      cashReceiptIngredience.then((result) => {
        result[0] = resultCashReceipt; // Output: "Promise resolved!"
      });
    };
    const handleAddValueIng = () => {
      setIngredience([...ingredience, " "]);
      setIngAmount([...ingAmount, 0]);
    };

    const handleInputChangeIng = (event, index) => {
      const newArray = [...ingredience];
      newArray[index] = event.data.value;
      setIngredience(newArray);
    };
    const handleDeleteIng = (index) => {
      let newIngredienceArray = [...ingredience];
      newIngredienceArray.splice(index, 1);
      setIngredience(newIngredienceArray);

      let newIngAmountArray = [...ingAmount];
      newIngAmountArray.splice(index, 1);
      setIngAmount(newIngAmountArray);
    };
    const handleInputChangeAmount = (event, index) => {
      const newArray = [...ingAmount];
      newArray[index] = event.data.value;
      setIngAmount(newArray);
    };
    //@@viewOn:interface

    let ingredienceList = [];

    if (ingredienceList.length === 0) {
      ingredienceList.push({ value: "", children: "" });
      props.data.map((value, index) =>
        ingredienceList.push({ value: props.data[index].data.id, children: props.data[index].data.name })
      );
    }
    //@@viewOff:interface
    function onSubmit() {
      let newIng = [];
      console.log(props.data);
      ingredience.map((value, i) =>
        newIng.push(props.data.find((item) => item.data.id === ingredience[i]).data.amount + ingAmount[i])
      );
      let ingredience_f = [];
      ingredience.map((value, index) => ingredience_f.push({ id: ingredience[index], difference: newIng[index] }));
      console.log(ingredience_f);

      props.onUpdateMany(ingredience_f);

      window.localStorage.removeItem("MY_CASH_RECEIPT");

      window.location.reload(false);
    }
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceFormPurchase);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
              <Uu5Elements.Grid.Item justifySelf={"start"}>
                {ingredience.map((value, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <Uu5Forms.TextSelect
                      label={"Ingrediencia " + (index + 1).toString() + ": "}
                      itemList={ingredienceList}
                      value={value}
                      onChange={(event) => handleInputChangeIng(event, index)}
                      className={Config.Css.css({ width: "120%" })}
                      required
                    />

                    <Uu5Elements.Button
                      icon="mdi-delete"
                      tooltip={"Odstraniť krok"}
                      onClick={() => handleDeleteIng(index)}
                      className={Config.Css.css({ marginLeft: "50%", marginTop: "5%" })}
                    />
                  </div>
                ))}
              </Uu5Elements.Grid.Item>

              <Uu5Elements.Grid.Item justifySelf={"center"}>
                {ingAmount.map((value, index) => (
                  <div>
                    <Uu5Forms.Number
                      label={"Množstvo ingrediencie " + (index + 1).toString() + ": "}
                      value={value}
                      name={"ingAmount"}
                      type={"number"}
                      onChange={(event) => handleInputChangeAmount(event, index)}
                      className={Config.Css.css({ width: "120%" })}
                      required
                    />
                    <Uu5Elements.Button
                      icon="mdi-delete"
                      tooltip={"Odstraniť krok"}
                      onClick={() => handleDeleteIng(index)}
                      className={Config.Css.css({ marginLeft: "50%", marginTop: "7%" })}
                    />
                  </div>
                ))}
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>

            <Uu5Elements.Grid templateColumns="repeat(1, 1fr)">
              <Uu5Elements.Grid.Item justifySelf="center">
                <Uu5Elements.Button icon="mdi-plus" tooltip={"Pridať ingredienciu"} onClick={handleAddValueIng} />
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
            <br />
            <br />
            <Uu5Elements.Grid justifyItems={"center"} templateColumns="repeat(1, 1fr)">
              <Uu5Elements.Grid.Item>
                <Uu5Forms.SubmitButton> Doplniť </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={props.onClose}>Zatvoriť</Uu5Forms.CancelButton>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceFormPurchase };
export default IngredienceFormPurchase;
//@@viewOff:exports
