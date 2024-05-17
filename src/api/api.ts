import { API_KEY, AllMeals } from "..";
import { SimpleDate } from "../date";
import { FailedToFetchData } from "../exceptions";
import { ApiData, MealInfo } from "./apiType";
import { MonthlyMealInfo, ParsedMealInfo } from "./parsedType";
import { parseMealInfo } from "./parser";

const SC_Code = 'F10';
const SCHOOL_CODE = '7380292';
const baseUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo';

class MealDataFetcher {
  cachedData: AllMeals;
  constructor(cache: AllMeals) {
    this.cachedData = cache;
  }
  getMealInfo(date: string): ParsedMealInfo | undefined {
    const month = date.substring(0, 6);
    if (month in this.cachedData) {
      return this.cachedData[month].mealInfo.find((mealInfo) => {
        return mealInfo.date === date;
      });
    }
  }
  getMealInfoByMonth(month: string): ParsedMealInfo[] | undefined {
    if (month in this.cachedData) {
      return this.cachedData[month].mealInfo;
    }
    
  }
  
  async cacheMealInfo(month: string): Promise<MonthlyMealInfo> {
    const mealInfo = await this.fetchMealInfo(month);
    this.cachedData[month] = mealInfo;
    return mealInfo;
  }

  async fetchMealInfo(month: string): Promise<MonthlyMealInfo> {
    const apiUrl = `${baseUrl}?ATPT_OFCDC_SC_CODE=${SC_Code}&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=${month}&Type=json&KEY=${API_KEY}`;
    const fetchData = await fetch(apiUrl);
    const response = await fetchData.json();
    if (!isDataValid(response)) {
      throw new FailedToFetchData(response, apiUrl);
    }
    const parsedData = parseMealInfo(response);
    return parsedData;
  }
}

function findMealInfo(mealInfo:ParsedMealInfo[], date:string):ParsedMealInfo|undefined{
  for (const meal of mealInfo) {
    if (meal.date === date) {
      return meal;
    }
  }
}

function isDataValid(object:any):object is ApiData{
  return 'mealServiceDietInfo' in object;
}