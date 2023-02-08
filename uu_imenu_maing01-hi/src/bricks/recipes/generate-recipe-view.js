//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute, RouteProvider } from "uu5g05";
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import Uu5Imaging from "uu5imagingg01";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar";
import recipesProvider from "./recipes-provider";

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

      phrase.push(<h4>Polievka</h4>);
      JSON.stringify(route);
      console.log(route);
      soup.forEach((element) =>
        phrase.push(
          <p
            width={150}
            className={Config.Css.css({ padding: 16 })}
            onClick={() => setRoute("recipedetail", { id: element.id })}
          >
            {element.name}
          </p>
        )
      );
      phrase.push(<h4>Hlavné jedlo</h4>);
      main_meal.forEach((element) =>
        phrase.push(
          <p
            width={150}
            className={Config.Css.css({ padding: 16 })}
            onClick={() => setRoute("recipedetail", { id: element.id })}
          >
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
    if (props.data) {
      for (const [day, recipes] of Object.entries(props.data)) {
        gridContent.push(
          <Uu5Elements.Box>
            <h2>{ConvertDay(day)}</h2> <Uu5Elements.Grid>{recipeBox(recipes)}</Uu5Elements.Grid>
          </Uu5Elements.Box>
        );
      }
    }

    //@@viewOn:private
    const { children } = props;

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, GenerateRecipeView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <Uu5Elements.Button onClick={props.onGenerate}>Generuj</Uu5Elements.Button>
        <Uu5Elements.Grid templateColumns="repeat(5, 1fr)">{gridContent}</Uu5Elements.Grid>
        <UU5.Imaging.Image
          width="50%"
          src={
            "https://img.aktuality.sk/foto/Zml0LWluLzE2MDB4MC9pbWc=/9GkfsLqZvKfNJFPE5TMx.jpg?st=93fmd2inThreiuOTUdDL8T6LWQPvTsbLK36uyltq1Kg&ts=1675311512&e=0"
          }
        />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { GenerateRecipeView };
export default GenerateRecipeView;
//@@viewOff:exports
