const DB = require("../models");

exports.getTotalNutrition = async () => {
  let KcalCal = 0;
  let ProteinCal = 0;

  const NutritionTotal = {
    KcalResult: 0,
    ProteinResult: 0,
  };

  await DB.Nutrition.findAll({
    attributes: ["HowManyKcal"],
  }).then((result) => {
    for (let i = 0; i < result.length; i++) {
      KcalCal += Number(result[i].dataValues.HowManyKcal);
    }
    NutritionTotal.KcalResult = KcalCal;
  });

  await DB.Nutrition.findAll({
    attributes: ["HowManyProtein"],
  }).then((result) => {
    for (let i = 0; i < result.length; i++) {
      ProteinCal += Number(result[i].dataValues.HowManyProtein);
    }
    NutritionTotal.ProteinResult = ProteinCal;
  });

  return NutritionTotal;
};
