import { API_KEY, AllMeals } from "..";
import { SimpleDate } from "../date";
import { FailedToFetchData } from "../exceptions";
import { ApiData, MealInfo } from "./apiType";
import { MonthlyMealInfo, ParsedMealInfo } from "./parsedType";
import { parseMealInfo } from "./parser";

const SC_Code = 'F10';
const SCHOOL_CODE = '7380292';
const baseUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo';

export class MealDataFetcher {
  cachedData: AllMeals;

  static emptyMonthlyInfo(): MonthlyMealInfo {
    return {
      year: 0,
      month: 0,
      mealInfo: []
    }
  }

  constructor(cache: AllMeals) {
    this.cachedData = cache;
  }
  async getMealInfo(date: string): Promise<ParsedMealInfo | undefined> {
    //try to find the mealInfo in the cache
    const cachedMealInfo = this.findMealInfo(date);
    if(cachedMealInfo !== undefined) return cachedMealInfo;


    //if the mealInfo is not in the cache, fetch the data from the server
    await this.cacheMealInfo(date.substring(0, 6));
    return this.findMealInfo(date);

  }

  findMealInfo(date: string): ParsedMealInfo | undefined {
    const month = date.substring(0, 6);
    if (month in this.cachedData) {
      return this.cachedData[month].mealInfo.find((mealInfo) => {
        return mealInfo.date === date;
      });
    }
  }
  
  async cacheMealInfo(month: string) {
    const mealInfo = await this.fetchMealInfo(month);
    if(mealInfo.mealInfo.length === 0) return;
    this.cachedData[month] = mealInfo;
  }

  async fetchMealInfo(month: string): Promise<MonthlyMealInfo> {
    const apiUrl = `${baseUrl}?ATPT_OFCDC_SC_CODE=${SC_Code}&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=${month}&Type=json&KEY=${API_KEY}`;

    console.log("call api");

    const fetchData = await fetch(apiUrl);
    const response = await fetchData.json();
    if (!MealDataFetcher.isDataValid(response)) {
      // throw new FailedToFetchData(response, apiUrl);
      return MealDataFetcher.emptyMonthlyInfo();
    }
    const parsedData = parseMealInfo(response);
    return parsedData;
  }

  static isDataValid(object:any):object is ApiData{
    return 'mealServiceDietInfo' in object;
  }

}