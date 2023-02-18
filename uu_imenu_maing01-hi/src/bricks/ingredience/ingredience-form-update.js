//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
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

const IngredienceFormUpdate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceFormUpdate",
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
      let data = { id: props.data.id, ing_name, ing_amount, ing_unit, ing_allergen };
      props.onUpdate(data);
      window.location.reload(false);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceFormUpdate);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <div
              className={Config.Css.css({
                display: "grid",
                rowGap: 8,
                columnGap: 32,
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(4, auto)",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: 8,
              })}
            >
              <Uu5Forms.FormText
                className={Config.Css.css({ width: "100%" })}
                label="Názov ingrediencie:"
                value={props.data.name}
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
              <Uu5Forms.SubmitButton>Upraviť ingredienciu </Uu5Forms.SubmitButton>
            </div>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { IngredienceFormUpdate };
export default IngredienceFormUpdate;
//@@viewOff:exports
