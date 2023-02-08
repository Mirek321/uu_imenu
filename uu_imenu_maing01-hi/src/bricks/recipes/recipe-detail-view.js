//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar";
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

const RecipeDetailView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeDetailView",
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
    let gridContent = [];
    const [route, setRoute] = useRoute();

    const { children } = props;
    const modalRef = useRef();

    function comprassion(portion) {
      let recipe;
      recipe = props.data;

      let ingrediences = [];

      for (let i = 0; i < recipe.ingredience.itemList.length; i++) {
        ingrediences.push({
          name: recipe.ingredience.itemList[i].name,
          id: JSON.parse(JSON.stringify(recipe.ingredience.itemList[i].id)),
          amount_need: recipe.ingredience.itemList[i].amount_recipe * portion,
          difference: recipe.ingredience.itemList[i].amount - recipe.ingredience.itemList[i].amount_recipe * portion,
        });

        if (ingrediences[i].difference > 0) {
          ingrediences[i].suit = true;

          gridContent.push(
            <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
              {ingrediences[i].name}
              <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
            </Uu5Elements.Box>
          );
        } else if (ingrediences[i].difference == 0) {
          ingrediences[i].suit = true;
          gridContent.push(
            <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
              {ingrediences[i].name}
              <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
            </Uu5Elements.Box>
          );
        } else if (ingrediences[i].difference < 0) {
          ingrediences[i].suit = false;
          gridContent.push(
            <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
              {ingrediences[i].name}
              <Uu5Elements.Icon icon="uubmlstates27;" margin={{ left: 4 }} />
            </Uu5Elements.Box>
          );
        } else {
          ingrediences[i].suit = "error";
        }
      }
      // const check = ingrediences.every(({ suit }) => suit);
      // if (check) {
      // } else {
      //   // pass;
      // }

      // return ingrediences;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    // props.data.ingredience.itemList.forEach((element) =>
    //   gridContent.push(
    //     <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
    //       {element.name}
    //       <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
    //     </Uu5Elements.Box>
    //   )
    // );
    console.log(gridContent);
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeDetailView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <h1>{props.data.name}</h1>
        <h2>Ingrediencie</h2>
        <p>Počet porcií:</p>

        <Uu5Elements.Input type={"number"} onChange={(e) => comprassion(e.data.value)} />

        <Uu5Elements.Grid>{gridContent}</Uu5Elements.Grid>
        <Uu5Elements.Button>Potvrdiť</Uu5Elements.Button>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeDetailView };
export default RecipeDetailView;
//@@viewOff:exports
