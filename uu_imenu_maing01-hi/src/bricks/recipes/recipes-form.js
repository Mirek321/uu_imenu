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
    const [link, setLink] = useState("");
    const [type_recipe, setType_recipe] = useState("");
    const [content_meal, setContentMeal] = useState("");
    const [description, setDescription] = useState("");
    const [recipe_process, setRecipeProcess] = useState();
    const [ingredience, setIngredience] = useState("");
    const [count_steps, setCountSteps] = useState();
    const [ing_amount, setIngAmount] = useState();
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
        category: [content_meal],
        type_recipe,
        description,
        process: [recipe_process],
        ingredience: [{ id: ingredience, amount: ing_amount }],
        link_photo: link,
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
            <Uu5Forms.Text
              label={"Nazov receptu"}
              value={name}
              name={"name"}
              type={"string"}
              onChange={(value) => setName(value.data.value)}
            />
            <Uu5Forms.TextArea
              label={"Popis: "}
              value={description}
              name={"description"}
              type={"string"}
              onChange={(value) => setDescription(value.data.value)}
            />
            <Uu5Forms.Text
              label={"Link k obrazku"}
              value={link}
              name={"link"}
              type={"string"}
              onChange={(value) => setLink(value.data.value)}
            />
            <Uu5Forms.SwitchSelect.Input
              label={"Typ jedla"}
              value={type_recipe}
              itemList={[
                { children: "Hlavné jedlo", value: "hlavné jedlo" },
                { children: "Polievka", value: "polievka" },
              ]}
              onChange={(value) => setType_recipe(value.data.value)}
            />
            <Uu5Forms.SwitchSelect.Input
              label={"Obsah mäsa"}
              value={content_meal}
              itemList={[
                { children: "Mäsité", value: "mäsité" },
                { children: "Bezmäsité", value: "bezmäsité" },
              ]}
              onChange={(value) => setContentMeal(value.data.value)}
            />
            <h4>Ingredience</h4>
            <Uu5Forms.TextSelect
              label="Ingrediencia 1:"
              itemList={[
                { value: "63ee8da49683bf3a1cac9771", children: "Bravčové karé" },
                { value: "63ee8dc69683bf3a1cac9774", children: "Ryžové víno" },
                { value: "63ee8de09683bf3a1cac9777", children: "Sójová omáčka" },
                { value: "63f0ae00bd31c23490911d75", children: "Hladká múka" },
              ]}
              value={ingredience}
              onChange={(value) => setIngredience(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 1 :"
              value={ing_amount}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount(value.data.value)}
            />
            <h4>Postup</h4>
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Počet krokov"
              value={count_steps}
              name={"count_steps"}
              type={"number"}
              onChange={(value) => setCountSteps(value.data.value)}
            />
            <Uu5Forms.TextArea
              label={"Krok 1: "}
              value={recipe_process}
              name={"process"}
              type={"string"}
              onChange={(value) => setRecipeProcess(value.data.value)}
            />
            <br /> <br />
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
