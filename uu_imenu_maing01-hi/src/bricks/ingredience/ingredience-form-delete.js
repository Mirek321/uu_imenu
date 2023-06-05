//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";


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

const IngredienceFormDelete = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "IngredienceFormDelete",
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
    console.log(props);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
      function  onSubmit(){
        props.onDelete({ id: props.data.data.id });
      }
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, IngredienceFormDelete);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Forms.Form.View>
            <Uu5Elements.Grid templateColumns="repeat(1, 1fr)">
            <Uu5Elements.Grid.Item justifySelf={"center"}>

            <h4>Chcete naozaj odstranit ingredienciu?</h4>
            </Uu5Elements.Grid.Item>
            </Uu5Elements.Grid>
            <Uu5Elements.Grid templateColumns="repeat(1, 1fr)">
            <Uu5Elements.Grid.Item justifySelf={"center"}>

            <Uu5Forms.SubmitButton> Odstraniť ingredienciu </Uu5Forms.SubmitButton>
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
export { IngredienceFormDelete };
export default IngredienceFormDelete;
//@@viewOff:exports
