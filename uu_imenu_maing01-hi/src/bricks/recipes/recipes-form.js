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
    const [content_meal, setContentMeal] = useState("");
    const [description, setDescription] = useState("");
    const [recipe_process, setRecipeProcess] = useState();
    const [ingredience, setIngredience] = useState({ id: "", amount: 0 });
    const [allValues, setAllValues] = useState({
      mobile: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const changeHandler = (e) => {
      setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };

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
            {"Nazov receptu"}
            <Uu5Forms.Text.Input
              value={name}
              name={"name"}
              type={"string"}
              onChange={(value) => setName(value.data.value)}
            />
            {"Typ jedla"}
            <Uu5Forms.SwitchSelect.Input
              itemList={[
                { children: "Hlavné jedlo", value: "hlavné jedlo" },
                { children: "Polievka", value: "polievka" },
              ]}
              onChange={(value) => setType_recipe(value.data.value)}
            />
            {"Obsah mäsa"}
            <Uu5Forms.SwitchSelect.Input
              itemList={[
                { children: "Mäsité", value: "mäsité" },
                { children: "Bezmäsité", value: "bezmäsité" },
              ]}
              onChange={(value) => setContentMeal(value.data.value)}
            />
            {"Popis"}
            <Uu5Forms.TextArea.Input
              value={description}
              name={"description"}
              type={"string"}
              onChange={(value) => setDescription(value.data.value)}
            />
            {"Postup"}
            <Uu5Forms.TextArea.Input
              value={recipe_process}
              name={"process"}
              type={"string"}
              onChange={(value) => setRecipeProcess(value.data.value)}
            />
            <h4>Ingredience</h4>
            <Uu5Forms.Select.Input
              itemList={[
                { value: "created" },
                { value: "initial" },
                { value: "active" },
                { value: "final" },
                { value: "alternative" },
                { value: "problem" },
                { value: "passive" },
                { value: "failed" },
                { value: "cancelled" },
              ]}
              value="initial"
              onChange={changeHandler}
              // TODO save value to state
            />
            <Uu5Forms.CancelButton onClick={props.onClose} />
            <Uu5Forms.SubmitButton> Vytvorit recept </Uu5Forms.SubmitButton>
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
