//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import UU5 from "uu5g04";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Imaging from "uu5imagingg01";
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
    const [ing_name, setIngName] = useState(props.data.name);
    const [ing_amount, setIngAmount] = useState(props.data.amount);
    const [ing_unit, setIngUnit] = useState(props.data.unit);
    const [ing_allergen, setAlergen] = useState(props.data.allergen);
    let item = { name: props.data?.name ?? "" };
    console.log(props.data);

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
            <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
              <Uu5Elements.Grid.Item>
                {"Názov ingrediencie:"}
                <Uu5Forms.Text.Input
                  className={Config.Css.css({ width: "100%" })}
                  label="Názov ingrediencie:"
                  value={ing_name}
                  name={"ing_name"}
                  type={"text"}
                  onChange={(value) => setIngName(value.data.value)}
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>
                {"Množstvo ingrediencií:"}
                <Uu5Forms.Number.Input
                  className={Config.Css.css({ width: "100%" })}
                  label="Množstvo ingrediencií:"
                  value={ing_amount}
                  name={"ing_amount"}
                  type={"number"}
                  onChange={(value) => setIngAmount(value.data.value)}
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>
                {"Jednotka:"}
                <Uu5Forms.Text.Input
                  className={Config.Css.css({ width: "100%" })}
                  label="Jednotka:"
                  value={ing_unit}
                  name={"ing_unit"}
                  type={"text"}
                  onChange={(value) => setIngUnit(value.data.value)}
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>
                {"Alergén"}
                <br></br>
                <Uu5Forms.SwitchSelect.Input
                  value={ing_allergen}
                  label="Alergén"
                  itemList={[
                    { children: "Áno", value: "Áno" },
                    { children: "Nie", value: "Nie" },
                  ]}
                  onChange={(value) => setAlergen(value.data.value)}
                />
              </Uu5Elements.Grid.Item>

              <Uu5Forms.SubmitButton> Upraviť ingredienciu </Uu5Forms.SubmitButton>
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
export { IngredienceFormUpdate };
export default IngredienceFormUpdate;
//@@viewOff:exports
