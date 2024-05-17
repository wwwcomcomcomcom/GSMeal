
export interface MonthlyMealInfo {
  year: number
  month: number
  mealInfo: ParsedMealInfo[]
}

export enum MealType {
  BREAKFAST = 1,
  LUNCH = 2,
  DINNER = 3
}

export interface ParsedMealInfo {
  //조식 중식 석식 => 1,2,3
  mealTypeCode: MealType
  //날짜 YYYYMMDD
  date: string
  //메뉴
  menu: string[]
  // //원산지
  // ORPLC_INFO: string
  //칼로리
  calorie: number
  //영양정보
  nutritionInfo: string
}