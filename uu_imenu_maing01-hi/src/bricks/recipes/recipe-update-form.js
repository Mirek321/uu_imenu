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

const RecipeUpdateForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeUpdateForm",
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
    const [name, setName] = useState(props.data.name);
    const [link, setLink] = useState(props.data.link_photo);
    const [type_recipe, setType_recipe] = useState(props.data.type_recipe);
    const [content_meal, setContentMeal] = useState(props.data.category[0]);
    const [description, setDescription] = useState(props.data.description);
    const [recipe_process, setRecipeProcess] = useState(props.data.process);
    const [ingredience, setIngredience] = useState(props.data.ingredience[0].id);
    const [count_steps, setCountSteps] = useState();
    const [ing_amount, setIngAmount] = useState(props.data.ingredience[0].amount);
    const [allValues, setAllValues] = useState({
      mobile: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    function onSubmit() {
      let data = {
        id: props.data.id,
        name,
        category: [content_meal],
        type_recipe,
        description,
        process: [recipe_process],
        ingredience: [{ id: ingredience, amount: ing_amount }],
        link_photo: link,
      };

      props.onUpdate(data);
      // window.location.reload(false);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeUpdateForm);

    return currentNestingLevel ? (
      <div {...attrs}>
        {" "}
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
            <br />
            <Uu5Forms.Text
              label={"Link k obrazku"}
              value={link}
              name={"link"}
              type={"string"}
              onChange={(value) => setLink(value.data.value)}
            />
            <br />
            <Uu5Forms.SwitchSelect.Input
              label={"Typ jedla"}
              value={type_recipe}
              itemList={[
                { children: "Hlavné jedlo", value: "hlavné jedlo" },
                { children: "Polievka", value: "polievka" },
              ]}
              onChange={(value) => setType_recipe(value.data.value)}
            />
            <br />
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
            <Uu5Forms.TextSelect.Input
              label="Ingrediencia 1:"
              value={ingredience}
              onChange={(value) => setIngredience(value.data.value)}
              itemList={[
                { value: "63ee8da49683bf3a1cac9771", children: "Bravčové karé" },
                { value: "63ee8dc69683bf3a1cac9774", children: "Ryžové víno" },
                { value: "63ee8de09683bf3a1cac9777", children: "Sójová omáčka" },
                { value: "63f0ae00bd31c23490911d75", children: "Hladká múka" },
              ]}
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
            <Uu5Forms.SubmitButton> Upraviť recept </Uu5Forms.SubmitButton>
          </Uu5Forms.Form.View>
        </Uu5Forms.Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeUpdateForm };
export default RecipeUpdateForm;
//@@viewOff:exports
