//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import UU5 from "uu5g04";
import Uu5Imaging from "uu5imagingg01";
import Config from "../config/config.js";
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

const IngredienceFormCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceFormCreate",
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
    const [ingName, setIngName] = useState("");
    const [ingAmount, setIngAmount] = useState("");
    const [ingUnit, setIngUnit] = useState("");
    const [ingAllergen, setAlergen] = useState("");

    function onSubmit() {
      let data = {
        ingName,
        ingAmount,
        ingUnit,
        ingAllergen,
      };
      const filter = {
        name: data.ingName,
        amount: data.ingAmount,
        unit: data.ingUnit,
        allergen: data.ingAllergen,
        category: "",
      };
      props.onSave(filter);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceFormCreate);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
              <Uu5Forms.FormText
                className={Config.Css.css({ width: "100%" })}
                label="Názov ingrediencie:"
                value={ingName}
                name={"ingName"}
                type={"text"}
                onChange={(value) => setIngName(value.data.value)}
                required
              />

              <Uu5Forms.FormNumber
                className={Config.Css.css({ width: "100%" })}
                label="Množstvo ingrediencií:"
                value={ingAmount}
                name={"ingAmount"}
                type={"number"}
                onChange={(value) => setIngAmount(value.data.value)}
                required
              />
              <Uu5Forms.FormText
                className={Config.Css.css({ width: "100%" })}
                label="Jednotka:"
                value={ingUnit}
                name={"ingUnit"}
                type={"text"}
                onChange={(value) => setIngUnit(value.data.value)}
                required
              />
              <Uu5Forms.FormSwitchSelect
                label="Alergén"
                itemList={[
                  { children: "Áno", value: "Áno" },
                  { children: "Nie", value: "Nie" },
                ]}
                onChange={(value) => setAlergen(value.data.value)}
              />

              <Uu5Forms.SubmitButton> Vytvoriť ingredienciu </Uu5Forms.SubmitButton>
              <Uu5Forms.CancelButton onClick={props.onClose}>Zatvoriť</Uu5Forms.CancelButton>
            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceFormCreate };
export default IngredienceFormCreate;
//@@viewOff:exports
