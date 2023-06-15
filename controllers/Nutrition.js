const Model = require("../model/Nutrition");
const DB = require("../models");
const controllerFunctions = require("./controllerFunctions");

const cookieOption = {
  httpOnly: true,
  secure: true,
};

exports.commomPageController = async (req, res) => {
  const NutritionTotal = await controllerFunctions.getTotalNutrition();

  DB.Nutrition.findAll().then((result) => {
    if (req.cookies.goalsValueCookie) {
      res.render("Nutrition", {
        DBdata: result,
        goalsValue: req.cookies.goalsValueCookie,
        NutritionTotal: NutritionTotal,
      });
    } else {
      res.render("Nutrition", { DBdata: result, goalsValue: null });
    }
  });
};

exports.searchResultController = (req, res) => {
  Model.useFoodAPI(req.body, (searchResult) => {
    DB.Nutrition.create({
      foodName: searchResult.foodName,
      HowManyEat: searchResult.HowManyEat,
      HowManyKcal: searchResult.Kcal,
      HowManyProtein: searchResult.Protein,
    }).then((result) => {
      res.send({
        id: result.dataValues.id,
        searchResult,
      });
    });
  });
};

exports.modifyGoals = async (req, res) => {
  const goalsValue = {
    Kcal: req.body.targetKcal,
    Protein: req.body.targetProtein,
  };

  res.cookie("goalsValueCookie", goalsValue, cookieOption);
  res.send(req.cookies.goalsValueCookie);
};

exports.modifyEats = (req, res) => {
  Model.useFoodAPI(req.body, (searchResult) => {
    DB.Nutrition.update(
      {
        foodName: searchResult.foodName,
        HowManyEat: searchResult.HowManyEat,
        HowManyKcal: searchResult.Kcal,
        HowManyProtein: searchResult.Protein,
      },
      {
        where: { id: req.body.id },
      }
    ).then(res.send(searchResult));
  });
};

exports.delGoals = (req, res) => {
  DB.Nutrition.destroy({ where: { id: req.body.id } }).then(
    res.send({ result: true })
  );
};

exports.reactiveModifyTodayGoals = async (req, res) => {
  if (!req.cookies.goalsValueCookie) {
    return null;
  }

  const getTotalNutrition = await controllerFunctions.getTotalNutrition();

  const cookieKcal = req.cookies.goalsValueCookie.Kcal;
  const cookieProtein = req.cookies.goalsValueCookie.Protein;

  const NutritionResult = {
    toTargetKcal: 0,
    toTargetProtein: 0,
  };

  NutritionResult.toTargetKcal = cookieKcal - getTotalNutrition.KcalResult;
  NutritionResult.toTargetProtein =
    cookieProtein - getTotalNutrition.ProteinResult;

  res.send(NutritionResult);
};
