//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import UU5 from "uu5g04";
import Uu5Imaging from "uu5imagingg01";
import Uu5Forms from "uu5g05-forms";
import Config from "../recipes/config/config.js";
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

  render: function (props) {
    //@@viewOn:private
    const { children } = props;
    let gridContent1 = [];
    const [gridContent, setGridContent] = useState([gridContent1]);
    let process = [];
    let ingrediences = [];
    const [ingredience, setIngredience] = useState([]);
    const [route, setRoute] = useRoute();
    console.log(route);

    function comprassion(portion) {
      if (portion > 0 && !(portion < 0)) {
        let recipe;
        recipe = props.data;

        setGridContent([]);
        ingrediences = [];
        let jednotka;
        let preklad = true;
        for (let i = 0; i < recipe.ingredience.itemList.length; i++) {
          if (
            (recipe.ingredience.itemList[i].unitPl && recipe.ingredience.itemList[i].unitKl) ||
            (recipe.ingredience.itemList[i].unitPl !== 0 && recipe.ingredience.itemList[i].unitKl !== 0)
          ) {
            if (recipe.ingredience.itemList[i].recipe_unit === "KL") {
              jednotka = recipe.ingredience.itemList[i].unitKl;
            }
            if (recipe.ingredience.itemList[i].recipe_unit === "PL") {
              jednotka = recipe.ingredience.itemList[i].unitPl;
            }
            if (
              recipe.ingredience.itemList[i].recipe_unit !== "KL" &&
              recipe.ingredience.itemList[i].recipe_unit !== "PL"
            ) {
              jednotka = 1;
              preklad = false;
            }
            if (recipe.ingredience.itemList[i].recipe_unit === recipe.ingredience.itemList[i].unit) {
              jednotka = 1;
            }
          }
          if (
            (!recipe.ingredience.itemList[i].unitPl && !recipe.ingredience.itemList[i].unitKl) ||
            (recipe.ingredience.itemList[i].unitPl === 0 && recipe.ingredience.itemList[i].unitKl === 0)
          ) {
            jednotka = 1;
            preklad = false;
          }

          ingrediences.push({
            name: recipe.ingredience.itemList[i].name,
            id: JSON.parse(JSON.stringify(recipe.ingredience.itemList[i].id)),
            amount_need: parseFloat((jednotka * recipe.ingredience.itemList[i].amount_recipe * portion).toFixed(2)),
            amount_recipe: recipe.ingredience.itemList[i].amount_recipe,
            amount_stock: recipe.ingredience.itemList[i].amount,
            unit: recipe.ingredience.itemList[i].unit,
            recipe_unit: (function () {
              if (preklad) return recipe.ingredience.itemList[i].unit;
              if (!preklad) return recipe.ingredience.itemList[i].recipe_unit;
            })(),
            difference: parseFloat(
              recipe.ingredience.itemList[i].amount -
                parseFloat((jednotka * recipe.ingredience.itemList[i].amount_recipe * portion).toFixed(2)).toFixed(2)
            ),
          });

          if (ingrediences[i].difference > 0) {
            ingrediences[i].suit = true;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box size="m" aspectRatio="10x1" className={Config.Css.css({ padding: 16 })}>
                <div style={{ textAlign: "left" }}>
                  <strong style={{ margin: 0 }}>{ingrediences[i].name}</strong>
                </div>

                <div style={{ textAlign: "right", paddingBottom: "10px" }}>
                  {ingrediences[i].amount_need}
                  {"  "}
                  {ingrediences[i].recipe_unit}
                  {" z "}
                  {ingrediences[i].amount_stock}
                  {"  "}
                  {ingrediences[i].unit}
                  {"  "}
                  <Uu5Elements.Icon icon="fa-check" />
                </div>

                {"  "}
              </Uu5Elements.Box>,
            ]);
          }
          if (ingrediences[i].difference === 0) {
            ingrediences[i].suit = true;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box size="m" aspectRatio="10x1" className={Config.Css.css({ padding: 16 })}>
                <div style={{ textAlign: "left" }}>
                  <strong>{ingrediences[i].name}</strong>
                </div>

                <div style={{ textAlign: "right" }}>
                  {ingrediences[i].amount_need}
                  {"  "}
                  {ingrediences[i].recipe_unit}
                  {" z "}
                  {ingrediences[i].amount_stock}
                  {"  "}
                  {ingrediences[i].unit}
                  {"  "}
                  <Uu5Elements.Icon icon="fa-check" />
                </div>
              </Uu5Elements.Box>,
            ]);
          }
          if (ingrediences[i].difference < 0) {
            ingrediences[i].suit = false;
            setGridContent((gridContet) => [
              ...gridContet,
              <Uu5Elements.Box size="m" aspectRatio="10x1" className={Config.Css.css({ padding: 16 })}>
                <div style={{ textAlign: "left" }}>
                  {" "}
                  <strong style={{ margin: 0, paddingBottom: "10px" }}>{ingrediences[i].name}</strong>
                </div>

                <div style={{ textAlign: "right" }}>
                  {ingrediences[i].amount_need}
                  {"  "}
                  {ingrediences[i].recipe_unit}
                  {" z "}
                  {ingrediences[i].amount_stock}
                  {"  "}
                  {ingrediences[i].unit}
                  {"  "}
                  <Uu5Elements.Icon icon="mdi-close-circle" />
                </div>
              </Uu5Elements.Box>,
            ]);
          }
        }

        setIngredience(ingrediences);

        return gridContent;
      }
    }

    function onUpdate() {
      if (ingredience.every((element) => element.suit === true)) {
        props.onUpdate(ingredience);
        window.location.reload(false);
      } else {
        alert("Pre aktualizovanie skladu musia byť všetky ingrediencie dostupné");
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    if (props.data && props.data.ingredience && props.data.ingredience.itemList) {
      props.data.ingredience.itemList.forEach((element) =>
        gridContent1.push(
          <Uu5Elements.Box size="m" aspectRatio="10x1" className={Config.Css.css({ padding: 16 })}>
            <strong>{element.name}</strong>

            <div style={{ textAlign: "right", paddingBottom: "10px" }}>
              {element.amount_recipe} {element.recipe_unit}
            </div>
          </Uu5Elements.Box>
        )
      );
    }
    if (props.data && props.data.ingredience && props.data.ingredience.itemList) {
      props.data.process.forEach((element, index) =>
        process.push(
          <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>
            <Uu5Elements.InfoItem iconText={index + 1} />

            <p className={Config.Css.css({ marginLeft: "5%" })}> {element}</p>
          </Uu5Elements.Box>
        )
      );
    }

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeDetailView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <div>
          <Uu5Elements.Grid
            templateColumns="repeat(2, 1fr)"
            columnGap={"0"}
            className={Config.Css.css({ paddingBottom: "5%" })}
          >
            <Uu5Elements.Grid.Item colSpan={10} alignSelf="center">
              <h1 style={{ textAlign: "center" }}>{props.data.name}</h1>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item className={Config.Css.css({ marginLeft: "20%", width: "80%" })}>
              <h2>Popis:</h2>
              <p style={{ fontSize: "medium" }}>{props.data.description}</p>
              <UU5.Imaging.Image width="500px" src={props.data.link_photo} />
              <h2>Ingrediencie:</h2>

              <Uu5Forms.Form.Provider onSubmit={onUpdate}>
                <Uu5Forms.Form.View>
                  <Uu5Forms.FormNumber
                    className={Config.Css.css({ width: "20%", paddingBottom: 16 })}
                    label="Počet porcií:"
                    type={"number"}
                    id="message"
                    name="message"
                    onChange={(e) => comprassion(e.data.value)}
                    required
                  />
                  <Uu5Elements.Grid display="inline">{gridContent}</Uu5Elements.Grid>
                  <br></br>
                  <br></br>
                  <Uu5Forms.SubmitButton className={Config.Css.css({ width: "20%" })}> Potvrdiť</Uu5Forms.SubmitButton>
                </Uu5Forms.Form.View>
              </Uu5Forms.Form.Provider>
            </Uu5Elements.Grid.Item>
            <Uu5Elements.Grid.Item className={Config.Css.css({ width: "70%", marginLeft: "10%" })}>
              <h2>Postup:</h2>
              <div></div>
              <Uu5Elements.Grid display="inline"> {process}</Uu5Elements.Grid>
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeDetailView };
export default RecipeDetailView;
//@@viewOff:exports
