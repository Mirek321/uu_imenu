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
    const [ing_name, setIngName] = useState("");
    const [ing_amount, setIngAmount] = useState("");
    const [ing_unit, setIngUnit] = useState("");
    const [ing_allergen, setAlergen] = useState("");

    function onSubmit() {
      let data = {
        ing_name,
        ing_amount,
        ing_unit,
        ing_allergen,
      };
      props.onSave(data);
      window.location.reload(false);
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
                value={ing_name}
                name={"ing_name"}
                type={"text"}
                onChange={(value) => setIngName(value.data.value)}
              />

              <Uu5Forms.FormNumber
                className={Config.Css.css({ width: "100%" })}
                label="Množstvo ingrediencií:"
                value={ing_amount}
                name={"ing_amount"}
                type={"number"}
                onChange={(value) => setIngAmount(value.data.value)}
              />
              <Uu5Forms.FormText
                className={Config.Css.css({ width: "100%" })}
                label="Jednotka:"
                value={ing_unit}
                name={"ing_unit"}
                type={"text"}
                onChange={(value) => setIngUnit(value.data.value)}
              />
              <Uu5Forms.FormSwitchSelect
                label="Alergén"
                itemList={[
                  { children: "Áno", value: "Áno" },
                  { children: "Nie", value: "Nie" },
                ]}
                onChange={(value) => setAlergen(value.data.value)}
              />

              <Uu5Forms.CancelButton onClick={props.onClose} />

              <Uu5Forms.SubmitButton>Pridať ingredienciu</Uu5Forms.SubmitButton>
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
