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

const RecipesForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesForm",
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
    const [name, setName] = useState("");
    const [type_recipe, setType_recipe] = useState("");
    function onSubmit() {
      let data = {
        name,
        type_recipe,
      };
      props.onSave(data);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipesForm);

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
              {"Nazov receptu"}
              <Uu5Forms.Text.Input
                value={name}
                name={"name"}
                type={"string"}
                onChange={(value) => setName(value.data.value)}
              />
              {"Typ jedla"}
              <Uu5Forms.Text.Input
                value={type_recipe}
                name={"type_recipe"}
                type={"string"}
                onChange={(value) => setType_recipe(value.data.value)}
              />
              <Uu5Forms.CancelButton onClick={props.onClose} />
              <Uu5Forms.SubmitButton> Vytvorit recept </Uu5Forms.SubmitButton>
            </div>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesForm };
export default RecipesForm;
//@@viewOff:exports
