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
    const { data1 } = props;
    const [ingName, setIngName] = useState(props.data.data.name);
    const [ingAmount, setIngAmount] = useState(props.data.data.amount);
    const [ingUnit, setIngUnit] = useState(props.data.data.unit);
    const [ingAllergen, setAllergen] = useState(props.data.data.allergen);


    function onSubmit() {
      let data = { id: props.data.data.id, ingName, ingAmount, ingUnit, ingAllergen };
      const filter = {
        id: data.id,
        name: data.ingName,
        amount: data.ingAmount,
        unit: data.ingUnit,
        allergen: data.ingAllergen,
        category: "",
      };
      props.onUpdate(filter);
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

                <Uu5Forms.Text
                  className={Config.Css.css({ width: "100%" })}
                  label="Názov ingrediencie:"
                  value={ingName}
                  name={"ingName"}
                  type={"text"}
                  onChange={(value) => setIngName(value.data.value)}
                  required
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>

                <Uu5Forms.Number
                  className={Config.Css.css({ width: "100%" })}
                  label="Množstvo ingrediencií:"
                  value={ingAmount}
                  name={"ingAmount"}
                  type={"number"}
                  onChange={(value) => setIngAmount(value.data.value)}
                  required
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>

                <Uu5Forms.Text
                  className={Config.Css.css({ width: "100%" })}
                  label="Jednotka:"
                  value={ingUnit}
                  name={"ingUnit"}
                  type={"text"}
                  onChange={(value) => setIngUnit(value.data.value)}
                  required
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>


                <Uu5Forms.SwitchSelect
                  value={ingAllergen}
                  label="Alergén"
                  itemList={[
                    { children: "Áno", value: "Áno" },
                    { children: "Nie", value: "Nie" },
                  ]}
                  onChange={(value) => setAllergen(value.data.value)}

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
