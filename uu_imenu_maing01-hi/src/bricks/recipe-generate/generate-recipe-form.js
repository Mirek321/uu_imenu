//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Config from "../recipes/config/config.js";
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

const GenerateRecipeForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GenerateRecipeForm",
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
    const [soup, setSoup] = useState("");
    const [days, setDays] = useState([]);
    const [main_meal, setMain_meal] = useState("");

    function onSubmit() {
      let data = {
        count_meals: [
          { name: "polievka", count: soup },
          { name: "hlavné jedlo", count: main_meal },
        ],
        days: days,
      };

      props.onSave(data);
      console.log(props.data);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, GenerateRecipeForm);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <div
              className={Config.Css.css({
                display: "grid",
                rowGap: 1,
                columnGap: 1,
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(7, auto)",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: 1,
              })}
            >
              {"Polievka Pocet"}
              <Uu5Forms.Text.Input
                value={soup}
                name={"soup"}
                type={"number"}
                onChange={(value) => setSoup(value.data.value)}
              />
              {"Pocet hlavne jedlo"}
              <Uu5Forms.Text.Input
                value={main_meal}
                name={"main_meal"}
                type={"number"}
                onChange={(value) => setMain_meal(value.data.value)}
                required
              />

              <Uu5Forms.FormCheckboxes
                itemList={[
                  { label: "Pondelok", value: "Pondelok" },
                  { label: "Utorok", value: "Utorok" },
                  { label: "Streda", value: "Streda" },
                  { label: "Śtvrtok", value: "Štvrtok" },
                  { label: "Piatok", value: "Piatok" },
                ]}
                onChange={(e) => {
                  setDays(e.data.value);
                }}
              ></Uu5Forms.FormCheckboxes>
              <Uu5Forms.CancelButton onClick={props.onClose} />
              <Uu5Forms.SubmitButton> Generovat </Uu5Forms.SubmitButton>
            </div>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeForm };
export default GenerateRecipeForm;
//@@viewOff:exports
