//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import UU5 from "uu5g04";
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
    const [ingredience1, setIngredience1] = useState("");
    const [ingredience2, setIngredience2] = useState("");
    const [ingredience3, setIngredience3] = useState("");
    const [ingredience4, setIngredience4] = useState("");
    const [ingredience5, setIngredience5] = useState("");
    const [count_steps, setCountSteps] = useState();
    const [ing_amount1, setIngAmount1] = useState();
    const [ing_amount2, setIngAmount2] = useState();
    const [ing_amount3, setIngAmount3] = useState();
    const [ing_amount4, setIngAmount4] = useState();
    const [ing_amount5, setIngAmount5] = useState();
    const [allValues, setAllValues] = useState({
      mobile: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    console.log(recipe_process);
    const changeHandler = (e) => {
      setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };
    let itemList = [
      { value: "63ee8da49683bf3a1cac9771", children: "Bravčové karé" },
      { value: "63ee8dc69683bf3a1cac9774", children: "Ryžové víno" },
      { value: "63ee8de09683bf3a1cac9777", children: "Sójová omáčka" },
      { value: "63f0ae00bd31c23490911d75", children: "Hladká múka" },
    ];
    function onSubmit() {
      let r_process = recipe_process.split(";");
      let data = {
        name,
        category: [content_meal],
        type_recipe,
        description,
        process: r_process,
        ingredience: [
          { id: ingredience1, amount: ing_amount1 },
          { id: ingredience2, amount: ing_amount2 },
          { id: ingredience3, amount: ing_amount3 },
          { id: ingredience4, amount: ing_amount4 },
          { id: ingredience5, amount: ing_amount5 },
        ],
        link_photo: link,
      };
      props.onSave(data);
      window.location.reload(false);
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
            <UU5.Imaging.Image className={Config.Css.css({ width: "70%", marginLeft: "10%" })} src={link} />
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
              itemList={itemList}
              value={ingredience1}
              onChange={(value) => setIngredience1(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 1 :"
              value={ing_amount1}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount1(value.data.value)}
            />
            <Uu5Forms.TextSelect
              label="Ingrediencia 2:"
              itemList={itemList}
              value={ingredience2}
              onChange={(value) => setIngredience2(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 2 :"
              value={ing_amount2}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount2(value.data.value)}
            />
            <Uu5Forms.TextSelect
              label="Ingrediencia 3:"
              itemList={itemList}
              value={ingredience3}
              onChange={(value) => setIngredience3(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 3 :"
              value={ing_amount3}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount3(value.data.value)}
            />
            <Uu5Forms.TextSelect
              label="Ingrediencia 4:"
              itemList={itemList}
              value={ingredience4}
              onChange={(value) => setIngredience4(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 4 :"
              value={ing_amount4}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount4(value.data.value)}
            />
            <Uu5Forms.TextSelect
              label="Ingrediencia 5:"
              itemList={itemList}
              value={ingredience5}
              onChange={(value) => setIngredience5(value.data.value)}
              // TODO save value to state
            />
            <Uu5Forms.Number
              className={Config.Css.css({ width: "100%" })}
              label="Množstvo ingrediencie 5 :"
              value={ing_amount5}
              name={"ing_amount"}
              type={"number"}
              onChange={(value) => setIngAmount5(value.data.value)}
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
              label={"Jednotlivé kroky: "}
              value={recipe_process}
              name={"process"}
              type={"string"}
              onChange={(value) => setRecipeProcess(value.data.value)}
            />
            <br /> <br />
            <Uu5Forms.SubmitButton> Vytvoriť recept </Uu5Forms.SubmitButton>
            <Uu5Forms.CancelButton onClick={props.onClose}>Zatvoriť</Uu5Forms.CancelButton>
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
