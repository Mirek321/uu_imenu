import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI =
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri;

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  recipeUpdate(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/update");
    return Calls.call("post", commandUri, dtoInData);
  },
  recipeDelete(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/delete");
    return Calls.call("post", commandUri, dtoInData);
  },
  ingredienceCreate(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredience/create");
    return Calls.call("post", commandUri, dtoInData);
  },
  ingredienceDelete(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredience/delete");
    return Calls.call("post", commandUri, dtoInData);
  },
  ingredienceList() {
    const commandUri = Calls.getCommandUri("ingredience/list");
    return Calls.call("get", commandUri);
  },
  ingredienceUpdateMany(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredience/updateMany");
    return Calls.call("post", commandUri, dtoInData);
  },
  ingredienceUpdate(dtoInData) {
    const commandUri = Calls.getCommandUri("ingredience/update");
    return Calls.call("post", commandUri, dtoInData);
  },
  recipeLoad(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/load");
    return Calls.call("get", commandUri, dtoInData);
  },
  recipeGet(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/get");
    return Calls.call("get", commandUri, dtoInData);
  },
  recipeGenerate(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/generate");
    return Calls.call("get", commandUri, dtoInData);
  },
  recipeCreate(dtoInData) {
    const commandUri = Calls.getCommandUri("recipe/create");
    return Calls.call("post", commandUri, dtoInData);
  },
  recipeList() {
    const commandUri = Calls.getCommandUri("recipe/list");
    return Calls.call("get", commandUri);
  },
  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = CALLS_BASE_URI) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
