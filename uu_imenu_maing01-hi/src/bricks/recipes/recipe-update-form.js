//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useEffect } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
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
    const [name, setName] = useState(props.data.data.name);
    const [link, setLink] = useState(props.data.data.link_photo);
    const [type_recipe, setType_recipe] = useState(props.data.data.type_recipe);
    const [content_meal, setContentMeal] = useState(props.data.data.category[0]);
    const [description, setDescription] = useState(props.data.data.description);
    const [recipe_process, setRecipeProcess] = useState(props.data.data.process);
    const [portion, setPortion] = useState(props.data.data.portion);
    const [ingredience, setIngredience] = useState([]);
    const [ingAmount, setIngAmount] = useState([]);

    let ingredienceList = [];
    if (ingredienceList.length === 0) {
      props.onLoadIngredience.itemList.map((value, index) =>
        ingredienceList.push({
          value: props.onLoadIngredience.itemList[index].id,
          children: props.onLoadIngredience.itemList[index].name,
        })
      );
    }

    useEffect(() => {
      if (props.data && props.data.data.ingredience) {
        const idArray = props.data.data.ingredience.map((obj) => obj.id);
        const amountArray = props.data.data.ingredience.map((obj) => obj.amount);
        setIngAmount(amountArray);
        setIngredience(idArray);
      }
    }, [props.data]);

    // useEffect(() => {
    //   if (props.data && props.data.data.ingredience) {
    //
    //   }
    // }, [props.data]);

    const handleAddValueIng = () => {
      setIngredience([...ingredience, " "]);
      setIngAmount([...ingAmount, 0]);
    };

    const handleInputChange = (event, index) => {
      const newArray = [...recipe_process];
      newArray[index] = event.target.value;
      setRecipeProcess(newArray);
    };
    const handleDelete = (index) => {
      const newArray = [...recipe_process];
      newArray.splice(index, 1);
      setRecipeProcess(newArray);
    };
    const handleAddValue = () => {
      setRecipeProcess([...recipe_process, ""]);
    };
    const handleInputChangeIng = (event, index) => {
      const newArray = [...ingredience];
      newArray[index] = event.data.value;
      setIngredience(newArray);
    };
    const handleDeleteIng = (index) => {
      let newIngredienceArray = [...ingredience];
      newIngredienceArray.splice(index, 1);
      setIngredience(newIngredienceArray);

      let newIngAmountArray = [...ingAmount];
      newIngAmountArray.splice(index, 1);
      setIngAmount(newIngAmountArray);
    };
    const handleInputChangeAmount = (event, index) => {
      const newArray = [...ingAmount];
      newArray[index] = event.data.value;
      setIngAmount(newArray);
    };
    function onSubmit() {
      let ingredience_f = [];
      ingredience.map((value, index) => ingredience_f.push({ id: ingredience[index], amount: ingAmount[index] }));
      let data = {
        id: props.data.data.id,
        name,
        category: [content_meal],
        type_recipe,
        description,
        process: recipe_process,
        ingredience: ingredience_f,
        link_photo: link,
        portion: portion,
      };

      props.onUpdate(data);
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
            <Uu5Elements.Grid templateColumns="repeat(3, 1fr)">
              <Uu5Elements.Grid.Item>
                <UU5.Imaging.Image className={Config.Css.css({ width: "70%", marginLeft: "10%" })} src={link} />
                <Uu5Forms.Text
                  label={"Nazov receptu"}
                  value={name}
                  name={"name"}
                  type={"string"}
                  onChange={(value) => setName(value.data.value)}
                  required
                />
                <Uu5Forms.TextArea
                  label={"Popis: "}
                  value={description}
                  name={"description"}
                  type={"string"}
                  onChange={(value) => setDescription(value.data.value)}
                  required
                />
                <br />
                <Uu5Forms.Text
                  label={"Link k obrazku"}
                  value={link}
                  name={"link"}
                  type={"string"}
                  onChange={(value) => setLink(value.data.value)}
                  required
                />
                <br />
                <Uu5Elements.Grid templateColumns="repeat(2 1fr)">
                  <Uu5Elements.Grid.Item justifySelf={"center"}>
                    <Uu5Forms.SwitchSelect.Input
                      label={"Typ jedla"}
                      value={type_recipe}
                      itemList={[
                        { children: "Hlavné jedlo", value: "hlavné jedlo" },
                        { children: "Polievka", value: "polievka" },
                      ]}
                      onChange={(value) => setType_recipe(value.data.value)}
                      required
                    />
                  </Uu5Elements.Grid.Item>
                  <Uu5Elements.Grid.Item justifySelf={"center"}>
                    <Uu5Forms.SwitchSelect.Input
                      label={"Obsah mäsa"}
                      value={content_meal}
                      itemList={[
                        { children: "Mäsité", value: "mäsité" },
                        { children: "Bezmäsité", value: "bezmäsité" },
                      ]}
                      onChange={(value) => setContentMeal(value.data.value)}
                      required
                    />
                  </Uu5Elements.Grid.Item>
                </Uu5Elements.Grid>
                <Uu5Forms.Number
                  className={Config.Css.css({ width: "100%" })}
                  label={"Porcie: "}
                  value={portion}
                  name={"portion"}
                  type={"number"}
                  onChange={(value) => setPortion(value.data.value)}
                  required
                />
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>
                <h4>Ingrediencie</h4>
                <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
                  <Uu5Elements.Grid.Item justifySelf={"start"}>
                    {ingredience.map((value, index) => (
                      <div>
                        <Uu5Forms.TextSelect
                          label={"Ingrediencia " + (index + 1).toString() + ": "}
                          itemList={ingredienceList}
                          value={value}
                          onChange={(event) => handleInputChangeIng(event, index)}
                          // className={Config.Css.css({ width: "50%" })}
                          required
                        />

                        <Uu5Elements.Button
                          icon="mdi-delete"
                          tooltip={"Odstraniť ingredienciu"}
                          onClick={() => handleDeleteIng(index)}
                          className={Config.Css.css({ marginLeft: "40%", marginTop: "5%" })}
                        />
                      </div>
                    ))}
                  </Uu5Elements.Grid.Item>

                  <Uu5Elements.Grid.Item justifySelf={"center"}>
                    {/*{ingAmount.map((value, index) => (*/}
                    {/*  <div>*/}
                    {/*    <Uu5Forms.Number*/}
                    {/*      label={"Množstvo ingrediencie " + (index + 1).toString() + ": "}*/}
                    {/*      value={value}*/}
                    {/*      onChange={(event) => handleInputChangeAmount(event, index)}*/}
                    {/*      // className={Config.Css.css({ width: "50%" })}*/}
                    {/*      required*/}
                    {/*    />*/}
                    {/*    {console.log(value)}*/}
                    {/*    <Uu5Elements.Button*/}
                    {/*      icon="mdi-delete"*/}
                    {/*      tooltip={"Odstraniť ingredienciu"}*/}
                    {/*      onClick={() => handleDeleteIng(index)}*/}
                    {/*      className={Config.Css.css({ marginLeft: "40%", marginTop: "7%" })}*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*))}*/}
                  </Uu5Elements.Grid.Item>
                </Uu5Elements.Grid>
                <Uu5Elements.Grid templateColumns="repeat(1, 1fr)">
                  <br />
                  <Uu5Elements.Grid.Item justifySelf="center">
                    <Uu5Elements.Button icon="mdi-plus" tooltip={"Pridať ingredienciu"} onClick={handleAddValueIng} />
                  </Uu5Elements.Grid.Item>
                </Uu5Elements.Grid>
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item>
                <h4>Postup</h4>
                <div>
                  {recipe_process.map((value, index) => (
                    <div key={index}>
                      <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
                        <Uu5Forms.TextArea
                          label={"Krok " + (index + 1).toString() + ": "}
                          value={value}
                          name={"process"}
                          type={"text"}
                          onChange={(event) => handleInputChange(event, index)}
                          className={Config.Css.css({ width: "185%" })}
                          required
                        />
                        <Uu5Elements.Grid.Item justifySelf={"end"} className={Config.Css.css({ paddingTop: "25%" })}>
                          <Uu5Elements.Button
                            icon="mdi-delete"
                            tooltip={"Odstraniť krok"}
                            onClick={() => handleDelete(index)}
                          />
                        </Uu5Elements.Grid.Item>
                      </Uu5Elements.Grid>
                    </div>
                  ))}
                  <Uu5Elements.Grid templateColumns="repeat(1, 1fr)">
                    <br />
                    <Uu5Elements.Grid.Item justifySelf="center">
                      <Uu5Elements.Button icon="mdi-plus" tooltip={"Pridať krok"} onClick={handleAddValue} />
                    </Uu5Elements.Grid.Item>
                  </Uu5Elements.Grid>
                </div>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
            <br /> <br />
            <Uu5Elements.Grid justifyItems={"center"} templateColumns="repeat(1, 1fr)">
              <Uu5Elements.Grid.Item>
                <Uu5Forms.SubmitButton>Upraviť recept </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={props.onClose}>Zatvoriť</Uu5Forms.CancelButton>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
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
