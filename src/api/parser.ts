import { ApiData, MealInfo } from "./apiType";
import { MealType, MonthlyMealInfo, ParsedMealInfo } from "./parsedType";

export function parseMealInfo(data:ApiData):MonthlyMealInfo {
  const mealInfo = data.mealServiceDietInfo[1].row;
  if(mealInfo === undefined) throw new Error('mealInfo is undefined');
  const parsedMealInfo:ParsedMealInfo[] = mealInfo.map((meal:MealInfo) => {
    return {
      mealTypeCode: parseInt(meal.MMEAL_SC_CODE) as MealType,
      date: meal.MLSV_YMD,
      menu: meal.DDISH_NM.split('<br/>'),
      calorie: parseInt(meal.CAL_INFO),
      nutritionInfo: meal.NTR_INFO
    }
  });
  return {
    year: parseInt(parsedMealInfo[0].date.substring(0,4)),
    month: parseInt(parsedMealInfo[0].date.substring(4,6)),
    mealInfo: parsedMealInfo
  }
}