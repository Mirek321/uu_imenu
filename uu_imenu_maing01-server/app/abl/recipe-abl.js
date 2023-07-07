"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/recipe-error.js");
const Ingredience = require("../abl/ingredience-abl.js");
const WARNINGS = {};
const puppeteer = require("puppeteer");
//aa
class RecipeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("recipe");
    this.ing = DaoFactory.getDao("ingredience");
  }
  async scrapeProduct(url, category) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    let ingredience = [];
    let recipe = {};
    let process = [];
    const [el] = await page.$x('//*[@id="content-body"]/article/a/picture/img');
    const src = await el.getProperty("src");
    const srcTxt = await src.jsonValue();

    const [el3] = await page.$x('//*[@id="content-body"]/article/h1');
    const name = await el3.getProperty("textContent");
    const rawName = await name.jsonValue();

    const [el4] = await page.$x('//*[@id="content-body"]/article/div[2]/p');
    const description = await el4.getProperty("textContent");
    const rawDescription = await description.jsonValue();

    const [el5] = await page.$x('//*[@id="content-body"]/article/div[1]/a[2]/span');
    const type = await el5.getProperty("textContent");
    const rawType = await type.jsonValue();

    const [el6] = await page.$x('//*[@id="content-body"]/article/div[3]/div[2]/div[3]/div[2]');
    const portion = await el6.getProperty("textContent");
    const rawPortion = await portion.jsonValue();

    let ide = true;
    let i = 1;
    while (ide) {
      const [el1] = await page.$x('//*[@id="content-body"]/article/div[6]/ul/li[' + i + "]/div[2]");
      const [el2] = await page.$x('//*[@id="content-body"]/article/div[6]/ul/li[' + i + "]/div[1]");

      try {
        const txt = await el1.getProperty("textContent");
        const txt1 = await el2.getProperty("textContent");

        const rawTxt = await txt.jsonValue();
        const rawTxt1 = await txt1.jsonValue();

        let mergedStr = rawTxt1.replaceAll(" ", "");
        let final = mergedStr.replaceAll("\n", " ");

        let mnozstvo = final.split(" ");
        let nazov = rawTxt.split(", ");
        if (nazov.length > 1 || mnozstvo[1] === "podľachuti") {
          nazov.map((value) => ingredience.push({ name: value, amount: 1, unit: "g" }));
        }
        if (nazov.length == 1) {
          ingredience.push({ name: rawTxt, amount: mnozstvo[1], unit: mnozstvo[2] });
        }
      } catch {
        ide = false;
      }
      i += 1;
    }
    i = 1;
    ide = true;
    while (ide) {
      try {
        const [el3] = await page.$x('//*[@id="content-body"]/article/div[8]/div/ul/li[' + i + "]/div[2]/p");

        const txtProcess = await el3.getProperty("textContent");
        const rawProcces = await txtProcess.jsonValue();
        process.push(rawProcces);
      } catch {
        ide = false;
      }
      i += 1;
    }

    recipe.name = rawName;
    recipe.description = rawDescription;
    if (rawType == "Polievky") {
      recipe.type_recipe = "polievka";
    } else {
      recipe.type_recipe = "hlavné jedlo";
    }
    recipe.portion = parseInt(rawPortion);
    recipe.process = process;
    recipe.ingredience = ingredience;
    recipe.link_photo = srcTxt;
    recipe.category = category;
    browser.close();
    return recipe;
  }
  async find(awid, dtoIn) {
    let recipe = await this.scrapeProduct(dtoIn.link, dtoIn.category);
    if (!recipe) {
      throw new Errors.Find.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    for (let i = 0; i < recipe.ingredience.length; i++) {
      let ingredience = await this.ing.get(awid, {
        name: recipe.ingredience[i].name.charAt(0).toUpperCase() + recipe.ingredience[i].name.slice(1),
      });
      if (ingredience.itemList.length !== 0) {
        recipe.ingredience[i].id = JSON.parse(JSON.stringify(ingredience.itemList[0].id));
      } else {
        let createIng = await this.ing.create(awid, {
          name: recipe.ingredience[i].name.charAt(0).toUpperCase() + recipe.ingredience[i].name.slice(1),
          amount: 0,
          unit: recipe.ingredience[i].unit,
          unitPl: 0,
          unitKl: 0,
        });
        recipe.ingredience[i].id = JSON.parse(JSON.stringify(createIng.id));
      }
    }
    recipe = await this.dao.create(awid, recipe);
    // return updated joke
    return {
      ...recipe,
    };
  }

  async load(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeLoadDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Load.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);
    let ing = recipe.ingredience;
    recipe.ingredience = await this.ing.load(awid, recipe.ingredience);
    for (let j = 0; j < recipe.ingredience.itemList.length; j++) {
      for (let i = 0; i < recipe.ingredience.itemList.length; i++) {
        let id = JSON.parse(JSON.stringify(recipe.ingredience.itemList[i].id));
        if (ing[j].id === id) {
          recipe.ingredience.itemList[i].amount_recipe = ing[j].amount;
          recipe.ingredience.itemList[i].recipe_unit = ing[j].unit;
        }
      }
    }

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Load.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
  }
  async comprassion(awid, recipe, portion) {
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
      } else if (ingrediences[i].difference == 0) {
        ingrediences[i].suit = true;
      } else if (ingrediences[i].difference < 0) {
        ingrediences[i].suit = false;
      } else {
        ingrediences[i].suit = "error";
      }
    }
    const check = ingrediences.every(({ suit }) => suit);
    if (check) {
      for (let i = 0; i < ingrediences.length; i++) {
        await Ingredience.update(awid, { id: ingrediences[i].id, amount: ingrediences[i].difference });
      }
    } else {
      // pass;
    }

    return ingrediences;
  }
  async generate(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeGenerateDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Generate.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipes = [];
    let recipes_days = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] };

    for (let k = 0; k < dtoIn.days.length; k++) {
      recipes = [];
      for (let j = 0; j < dtoIn.count_meals.length; j++) {
        dtoIn.type_recipe = dtoIn.count_meals[j].name;
        let recipe = await this.dao.generate(dtoIn, dtoIn.count_meals[j].count);
        for (let i = 0; i < dtoIn.count_meals[j].count; i++) {
          let id = JSON.parse(JSON.stringify(recipe[i]._id));
          let recipe_load = await this.load(awid, { id: id });

          recipes.push({
            id: id,
            name: recipe_load.name,
            category: recipe_load.category,
            type_recipe: recipe_load.type_recipe,
          });
        }
      }
      if (dtoIn.days[k] == "Pondelok") {
        recipes_days.monday.push(...recipes);
      } else if (dtoIn.days[k] == "Utorok") {
        recipes_days.tuesday.push(...recipes);
      } else if (dtoIn.days[k] == "Streda") {
        recipes_days.wednesday.push(...recipes);
      } else if (dtoIn.days[k] == "Štvrtok") {
        recipes_days.thursday.push(...recipes);
      } else if (dtoIn.days[k] == "Piatok") {
        recipes_days.friday.push(...recipes);
      }
    }

    /* for (let i = 0; i < update_ingrediences.length; i++) {

    }*/
    // if joke does not exist (was not found in database)
    if (!recipes_days) {
      throw new Errors.Generate.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    //comprassion(recipe, dtoIn.portion);
    // return updated joke
    return {
      ...recipes_days,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeListDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.List.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.list(awid);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.List.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeUpdateDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Update.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Update.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    let recipeDtoOut;
    try {
      // call dao method remove to delete your joke from database

      recipeDtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Update.RecipeDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      ...recipeDtoOut,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeDeleteDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Delete.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Delete.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }
    try {
      // call dao method remove to delete your joke from database
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // throw an error if something goes wrong during removing joke from database
      throw new Errors.Delete.RecipeDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // return updated joke
    return {
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("recipeGetDtoInType", dtoIn);

    // write to uuAppErrorMap result of validation
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, Errors.Get.InvalidDtoIn);

    // load joke from database by id from dtoIn
    let recipe = await this.dao.get(awid, dtoIn.id);

    // if joke does not exist (was not found in database)
    if (!recipe) {
      throw new Errors.Get.RecipeDoesNotExist({ uuAppErrorMap }, { recipeId: dtoIn.id });
    }

    // return updated joke
    return {
      ...recipe,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};
    // hds 2, 2.1
    const validationResult = this.validator.validate("recipeCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Errors.Create.InvalidDtoIn
    );
    //a
    let recipe;
    try {
      for (let i = 0; i < dtoIn.ingredience.length; i++) {
        dtoIn.ingredience[i].amount = (dtoIn.ingredience[i].amount / dtoIn.portion).toFixed(2);
      }
      recipe = await this.dao.create(awid, dtoIn);
    } catch (e) {
      throw new Errors.Create.RecipeDaoCreateFailed({ uuAppErrorMap }, e);
    }
    const dtoOut = {
      ...recipe,
      uuAppErrorMap,
    };
    return dtoOut;
  }
}

module.exports = new RecipeAbl();
