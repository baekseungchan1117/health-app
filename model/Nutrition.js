const request = require("request");

exports.useFoodAPI = (res, callback) => {
  const APIkey =
    "zd1ep9HFO77Q1dVjG5wQmWu0sdD39io5XbrozAWZtQJpH21Wv5AIiWCQsvj4Ocr5oe%2FEMg9h8ppoLlUQrf1A9g%3D%3D";
  const seturl = "pageNo=1&numOfRows=1&type=json";
  const whatFoodeat = res.whatFoodeat;
  const howManyEat = Number(res.howManyEat);

  const APIurl = `https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?serviceKey=${APIkey}&desc_kor=${encodeURIComponent(
    whatFoodeat
  )}&${seturl}`;

  request(APIurl, function (err, res, body) {
    if (err) {
      console.log(err);
    }
    const result = JSON.parse(body);
    const items = result.body.items[0];
    const CalKcal = Math.round(
      (items.NUTR_CONT1 / items.SERVING_WT) * howManyEat
    );
    const CalProtein = Math.round(
      (items.NUTR_CONT3 / items.SERVING_WT) * howManyEat
    );

    const back = {
      foodName: items.DESC_KOR,
      HowManyEat: howManyEat,
      Kcal: CalKcal,
      Protein: CalProtein,
    };

    callback(back);
  });
};
