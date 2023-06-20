//@@viewOn:imports
import {createVisualComponent, Utils, Content, useEffect, useState} from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import {QrReader} from "react-qr-reader";
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

const IngredienceFormScanCashReceipt = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceFormScanCashReceipt",
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
    let [cashReceiptId, setCashReceiptId] = useState();
    const handleFindReceipt = () => {


      let cashReceiptIngredience = props.onFind({"receiptId":cashReceiptId});
      console.log(cashReceiptIngredience);
      cashReceiptIngredience.then((result) => {
        // result[0] = resultCashReceipt; // Output: "Promise resolved!"
        console.log(result);
        window.localStorage.setItem("MY_CASH_RECEIPT", JSON.stringify(result));

        // window.location.reload(false);

      })
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceFormScanCashReceipt);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={handleFindReceipt} >
          <Uu5Forms.Form.View>
            <Uu5Elements.Grid justifyItems={"center"}>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setCashReceiptId(result?.text);
                  }

                  if (!!error) {
                    console.log(error);
                  }
                }}
                className={Config.Css.css({ width: "50%" })}
              />
              <Uu5Forms.Text
                label={"Id dokladu: "}
                value={cashReceiptId}
                onChange={(value) => setCashReceiptId(value.data.value)}

              />

              <Uu5Elements.Grid justifyItems={"center"} templateColumns="repeat(1, 1fr)">
                <Uu5Elements.Grid.Item>
                  <Uu5Forms.SubmitButton> Naskenovať</Uu5Forms.SubmitButton>
                  <Uu5Forms.CancelButton onClick={props.onClose}>Zatvoriť</Uu5Forms.CancelButton>
                </Uu5Elements.Grid.Item>
              </Uu5Elements.Grid>
            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceFormScanCashReceipt };
export default IngredienceFormScanCashReceipt;
//@@viewOff:exports
