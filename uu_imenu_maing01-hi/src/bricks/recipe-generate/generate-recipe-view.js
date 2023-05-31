//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute, RouteProvider, useEffect } from "uu5g05";
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import Uu5Forms from "uu5g05-forms";
import Config from "../recipes/config/config.js";
import RouteBar from "../../core/route-bar";
import recipesProvider from "../recipes/recipes-provider";
import GenerateRecipeForm from "./generate-recipe-form";

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

const GenerateRecipeView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "GenerateRecipeView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    let gridContent = [];
    let soup = [];
    let main_meal = [];

    const [route, setRoute] = useRoute();
    const [showBanner, setShowBanner] = useState(false);
    const [gridConte, setGridConte] = useState([]);
    const [soup_filter, setSoupFilter] = useState("");
    const [days, setDays] = useState([]);
    const [category, setCategory] = useState([]);
    const [main_meal_filter, setMain_meal_filter] = useState("");
    let [open, setOpen] = useState(false);
    const test = useRef();

    let g = [];

    function DivideTypeRecipe(recipes) {
      soup = [];
      main_meal = [];
      for (const element of recipes) {
        if (element.type_recipe == "polievka") {
          soup.push(element);
        }

        if (element.type_recipe == "hlavné jedlo") {
          main_meal.push(element);
        }
      }
    }
    function recipeBox(recipes) {
      let phrase = [];

      DivideTypeRecipe(recipes);

      phrase.push(<h4 style={{ margin: 0 }}>Polievka:</h4>);
      JSON.stringify(route);

      soup.forEach((element) =>
        phrase.push(
          <p style={{ margin: 0 }} onClick={() => setRoute("recipedetail", { id: element.id })}>
            {element.name}
          </p>
        )
      );
      phrase.push(<h4 style={{ margin: 0 }}>Hlavné jedlo:</h4>);
      main_meal.forEach((element) =>
        phrase.push(
          <p style={{ margin: 0 }} onClick={() => setRoute("recipedetail", { id: element.id })}>
            {element.name}
          </p>
        )
      );

      return phrase;
    }
    function ConvertDay(day) {
      if (day == "monday") {
        den = "Pondelok";
      } else if (day == "tuesday") {
        den = "Utorok";
      } else if (day == "wednesday") {
        den = "Streda";
      } else if (day == "thursday") {
        den = "Štvrtok";
      } else if (day == "friday") {
        den = "Piatok";
      }
      return den;
    }
    let den = "";

    function closeModal() {
      setOpen(false);
    }
    function openModal() {
      setOpen(true);
    }
    //@@viewOn:private

    const { children } = props;

    function onGenerate() {
      console.log(days);
      let filter = {
        count_meals: [
          { name: "polievka", count: soup_filter },
          { name: "hlavné jedlo", count: main_meal_filter },
        ],
        days: ["Pondelok","Utorok","Streda","Štvrtok","Piatok"],

      };
      if(category !== undefined){
        filter.category = [category];
      }
      if(days.length > 0){
        filter.days = days;
      }
      console.log(filter);
      props.onGenerate(filter);
      console.log(props.data);
    }
    if (props.data) {
      window.localStorage.setItem("MY_IMENU_APP", JSON.stringify(props.data));
    }

    if (JSON.parse(window.localStorage.getItem("MY_IMENU_APP"))) {
      let data = JSON.parse(window.localStorage.getItem("MY_IMENU_APP"));
      for (const [day, recipes] of Object.entries(data)) {
        gridContent.push(
          <Uu5Elements.Box className={Config.Css.css({ padding: 15, height: "120%" })}>
            <h2 style={{ textAlign: "center" }}>{ConvertDay(day)}</h2>{" "}
            <Uu5Elements.Grid>{recipeBox(recipes)}</Uu5Elements.Grid>
          </Uu5Elements.Box>
        );
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, GenerateRecipeView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <div className={Config.Css.css({ padding: 20 })}>
          <UU5.Bricks.Accordion colorSchema="default">
            <UU5.Bricks.Panel
              header="Filter"
              colorSchema="primary"
              iconExpanded="mdi-chevron-up"
              iconCollapsed="mdi-chevron-down"
              content={
                <Uu5Forms.Form.Provider onSubmit={onGenerate}>
                  <Uu5Forms.Form.View>
                    <Uu5Elements.Grid templateColumns="repeat(2, 1fr)" columnGap={"0"}>
                      <Uu5Elements.Grid.Item justifySelf="end" className={Config.Css.css({ paddingRight: 15 })}>
                        <Uu5Forms.FormNumber
                          className={Config.Css.css({ width: "100%" })}
                          label="Počet polievok v menu:"
                          value={soup_filter}
                          name={"soup"}
                          type={"number"}
                          onChange={(value) => setSoupFilter(value.data.value)}
                          required
                        />

                        <Uu5Forms.FormNumber
                          className={Config.Css.css({ width: "100%" })}
                          label="Počet hlavných jedál v menu:"
                          value={main_meal_filter}
                          name={"main_meal"}
                          type={"number"}
                          onChange={(value) => setMain_meal_filter(value.data.value)}
                          required
                        />
                        <Uu5Forms.FormSwitchSelect
                          name="Obsah mäsa"
                          label="Obsah mäsa"
                          itemList={[
                            { children: "Mäsité", value: "mäsité" },
                            { children: "Bezmäsité", value: "bezmäsité" },
                            // { children: "Mäsité / Bezmäsité", value: "" },
                          ]}
                          onChange={(value) => setCategory(value.data.value)}

                        />
                      </Uu5Elements.Grid.Item>
                      <Uu5Elements.Grid.Item justifySelf="start" className={Config.Css.css({ paddingLeft: 15 })}>
                        <Uu5Forms.FormCheckboxes
                          label="Dni v ktorych sa varí:"
                          className={Config.Css.css({ width: "100%" })}
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
                      </Uu5Elements.Grid.Item>
                      <Uu5Elements.Grid.Item justifySelf="center" colSpan={10}>
                        {/*<Uu5Elements.Button onClick={onGenerate}>/Uu5Elements.Button>*/}
                        <Uu5Forms.SubmitButton className={Config.Css.css({ width: "100%" })}>
                          {" "}
                          Generuj{" "}
                        </Uu5Forms.SubmitButton>
                      </Uu5Elements.Grid.Item>
                    </Uu5Elements.Grid>
                  </Uu5Forms.Form.View>
                </Uu5Forms.Form.Provider>
              }
            />
          </UU5.Bricks.Accordion>
          <div ref={test}>
            <Uu5Elements.Grid templateColumns="repeat(5, 1fr)">{gridContent} </Uu5Elements.Grid>
          </div>

          {/*<Uu5Elements.Modal header={"Filtrovanie generovania"} open={open}>*/}
          {/*  <GenerateRecipeForm onSave={props.onGenerate} onClose={closeModal}></GenerateRecipeForm>*/}
          {/*</Uu5Elements.Modal>*/}
          {g}
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeView };
export default GenerateRecipeView;
//@@viewOff:exports
