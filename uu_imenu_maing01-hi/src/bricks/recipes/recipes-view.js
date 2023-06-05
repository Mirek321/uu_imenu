//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useRef, useRoute, useEffect } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Plus4u5Elements from "uu_plus4u5g02-elements";
import UU5 from "uu5g04";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5Imaging from "uu5imagingg01";
import RecipesForm from "./recipes-form";
import Config from "./config/config.js";
import RouteBar from "../../core/route-bar";
import RecipeUpdateForm from "./recipe-update-form";
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

const RecipesView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipesView",
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
    const { data } = props;

    const [route, setRoute] = useRoute();
    let [openCreate, setOpenCreate] = useState(false);
    let [openUpdate, setOpenUpdate] = useState(false);
    let [data1, setData1] = useState();

    const COLUMN_LIST = [
      { value: "name", header: "Názov receptu" },
      { value: "type_recipe", header: "Typ jedla" },
      { value: "link_photo", header: "Obrazok", type: "image" },
      { header: "Akcie", type: "actionList" },
    ];

    function closeModal() {
      setOpenCreate(false);
      setOpenUpdate(false);
    }

    function updateRecipe(data) {
      console.log(data);
      setData1(data);
      setOpenUpdate(true);
    }
    function removeRecipe(data) {
      let result = confirm("Naozaj chcete odstrániť "+data.data.name+" ?");
      if (result) {
        props.onDelete({ id: data.data.id });
      }
    }
    function addNewRecipe() {
      setOpenCreate(true);
    }
    const grid = (props) => {
      let data = props.data;

      return (
        <Uu5Elements.Grid.Item className={Config.Css.css({ padding: 8 })}>
          <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>
            <UU5.Imaging.Image src={data.data.link_photo} />
            <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
              <Uu5Elements.Grid.Item justifySelf="right">
            <p style={{ margin: 0, padding: 10 }}>{data.data.type_recipe}</p>
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item justifySelf="left">
                <p style={{ margin: 0, padding: 10 }}>{data.data.category[0]}</p>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
            <h3
              style={{ textAlign: "center", margin: 0, paddingBottom: 20 }}
              onClick={() => setRoute("recipesdetail", { id: data.data.id })}
            >
              {data.data.name}
            </h3>
            <Uu5Elements.Grid templateColumns="repeat(2, 1fr)">
              <Uu5Elements.Grid.Item justifySelf="center">
                <Uu5Elements.Button
                  colorScheme="negative"
                  significance="highlighted"
                  className={Config.Css.css({ marginRigt: "30px" })}
                  onClick={() => removeRecipe(data)}
                >
                  Odstrániť recept
                </Uu5Elements.Button>
              </Uu5Elements.Grid.Item>
              <Uu5Elements.Grid.Item justifySelf="center">
                <Uu5Elements.Button colorScheme="cyan" significance="highlighted" onClick={() => updateRecipe(data)}>
                  Upraviť recept
                </Uu5Elements.Button>
              </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
          </Uu5Elements.Box>
        </Uu5Elements.Grid.Item>
      );
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipesView);
    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />

        <div className={Config.Css.css({ padding: 20 })}>
          <Uu5Elements.Grid>
            <Uu5Elements.Grid.Item justifySelf="end">
              <Uu5Elements.Button icon="mdi-plus" tooltip={"Pridať recept"} onClick={addNewRecipe} />
            </Uu5Elements.Grid.Item>
          </Uu5Elements.Grid>
          <Uu5Tiles.ControllerProvider data={props.data}>
            <Uu5TilesElements.Grid tileMaxWidth={480} tileMinWidth={310}>
              {grid}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
          <Uu5Elements.Modal
            width={"full"}
            header={"Vytvorenie nového receptu"}
            open={openCreate}
            closeOnButtonClick={true}
          >
            <RecipesForm data={props.getIngredience} onSave={props.onCreate} onClose={closeModal} />
          </Uu5Elements.Modal>
          <Uu5Elements.Modal width={"full"} header={"Upravenie receptu"} open={openUpdate}>
            <RecipeUpdateForm
              onLoadIngredience={props.getIngredience}
              data={data1}
              onUpdate={props.onUpdate}
              onClose={closeModal}
            />
          </Uu5Elements.Modal>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipesView };
export default RecipesView;
//@@viewOff:exports
