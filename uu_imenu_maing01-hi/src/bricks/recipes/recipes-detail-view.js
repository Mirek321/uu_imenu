//@@viewOn:imports
import { createVisualComponent, Utils, Content, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import UU5 from "uu5g04";
import Uu5Forms from "uu5g05-forms";
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

const RecipesDetailView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesDetailView",
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
    let gridContent1 = [];
    let process = [];
    const [route, setRoute] = useRoute();
    props.data.ingredience.itemList.forEach((element) =>
      gridContent1.push(
        <Uu5Elements.Box width="30%" height="80%" className={Config.Css.css({ padding: 16 })}>
          <strong>{element.name}</strong>

          <div style={{ textAlign: "right", paddingBottom: "10px" }}>
            {element.amount_recipe} {element.unit}
          </div>
        </Uu5Elements.Box>
      )
    );
    props.data.process.forEach((element, index) =>
      process.push(
        <Uu5Elements.Box width="50%" height="100%" className={Config.Css.css({ padding: 16 })}>
          <Uu5Elements.InfoItem iconText={index + 1} />

          <p className={Config.Css.css({ marginLeft: "5%" })}> {element}</p>
        </Uu5Elements.Box>
      )
    );
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipesDetailView);

    return currentNestingLevel ? (
      <div {...attrs}>
        {" "}
        <RouteBar />
        <div>
          <Uu5Elements.Grid rowGap={16} columnGap={32}>
            <h1>{props.data.name}</h1>
            <p>{props.data.description}</p>

            <UU5.Imaging.Image width="500px" src={props.data.link_photo} />
            <h2>Ingrediencie:</h2>
            <Uu5Elements.Grid>{gridContent1}</Uu5Elements.Grid>

            {/*<Uu5Elements.Button onClick={onUpdate}>Potvrdiť</Uu5Elements.Button>*/}
            <h2>Postup:</h2>
            {process}
          </Uu5Elements.Grid>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesDetailView };
export default RecipesDetailView;
//@@viewOff:exports
