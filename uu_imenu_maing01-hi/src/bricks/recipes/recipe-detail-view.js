//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import UU5 from "uu5g04";
import Uu5Imaging from "uu5imagingg01";
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
    let gridContent1 = [];
    const [route, setRoute] = useRoute();
    const [gridContent, setGridContent] = useState([gridContent1]);
    let process = [];

    const { children } = props;
    const modalRef = useRef();
    const test = {};
    function comprassion(portion) {
      if (portion > 0) {
        let recipe;
        recipe = props.data;
        // eslint-disable-next-line uu5/hooks-rules
        setGridContent([]);
        let ingrediences = [];

        for (let i = 0; i < recipe.ingredience.itemList.length; i++) {
          ingrediences.push({
            name: recipe.ingredience.itemList[i].name,
            id: JSON.parse(JSON.stringify(recipe.ingredience.itemList[i].id)),
            amount_need: recipe.ingredience.itemList[i].amount_recipe * portion,
            amount: recipe.ingredience.itemList[i].amount_recipe,
            unit: recipe.ingredience.itemList[i].unit,
            difference: recipe.ingredience.itemList[i].amount - recipe.ingredience.itemList[i].amount_recipe * portion,
          });

          if (ingrediences[i].difference > 0) {
            ingrediences[i].suit = true;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
                {ingrediences[i].name}
                <Uu5Elements.Text className={Config.Css.css({ marginLeft: "65%" })}>
                  {ingrediences[i].amount_need}{" "}
                </Uu5Elements.Text>
                {ingrediences[i].unit}
                {"  "}
                <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
              </Uu5Elements.Box>,
            ]);
            // gridContent.push(
            //   <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
            //     {ingrediences[i].name}
            //     <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
            //   </Uu5Elements.Box>
            //);
          } else if (ingrediences[i].difference == 0) {
            ingrediences[i].suit = true;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
                {ingrediences[i].amount}
                <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
              </Uu5Elements.Box>,
            ]);
            // gridContent.push(
            //   <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
            //     {ingrediences[i].name}
            //     <Uu5Elements.Icon icon="fa-check" margin={{ left: 4 }} />
            //   </Uu5Elements.Box>
            // );
          } else if (ingrediences[i].difference < 0) {
            ingrediences[i].suit = false;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
                {ingrediences[i].amount}

                <Uu5Elements.Icon icon="mdi-close-circle" margin={{ left: 4 }} />
              </Uu5Elements.Box>,
            ]);
            // gridContent.push(
            //   <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
            //     {ingrediences[i].name}
            //     <Uu5Elements.Icon icon="uubmlstates27;" margin={{ left: 4 }} />
            //   </Uu5Elements.Box>
            // );
          } else {
            ingrediences[i].suit = "error";
          }
        }
        // const check = ingrediences.every(({ suit }) => suit);
        // if (check) {
        // } else {
        //   // pass;
        // }
        return gridContent;
        // return ingrediences;
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    props.data.ingredience.itemList.forEach((element) =>
      gridContent1.push(
        <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
          {element.name}
        </Uu5Elements.Box>
      )
    );
    props.data.process.forEach((element) =>
      process.push(
        <Uu5Elements.Box width="50%" height="100%" className={Config.Css.css({ padding: 16 })}>
          {element}
        </Uu5Elements.Box>
      )
    );

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeDetailView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <h1>{props.data.name}</h1>
        <p>{props.data.description}</p>
        <UU5.Imaging.Image width="50%" src={props.data.link_photo} />
        <h2>Ingrediencie:</h2>
        <p>Počet porcií:</p>

        <Uu5Elements.Input type={"number"} onChange={(e) => comprassion(e.data.value)} />

        <Uu5Elements.Grid>{gridContent}</Uu5Elements.Grid>
        <Uu5Elements.Button onClick={onUpdate(gridContent)}>Potvrdiť</Uu5Elements.Button>
        <h2>Postup:</h2>
        <Uu5Elements.Grid>{process}</Uu5Elements.Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeDetailView };
export default RecipeDetailView;
//@@viewOff:exports
