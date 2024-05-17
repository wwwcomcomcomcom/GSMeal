export interface ApiData {
  mealServiceDietInfo: MealServiceDietInfo[]
}

export interface MealServiceDietInfo {
  head?: Head[]
  row?: MealInfo[]
}

export interface Head {
  list_total_count?: number
  RESULT?: Result
}

export interface Result {
  CODE: string
  MESSAGE: string
}

export interface MealInfo {
  ATPT_OFCDC_SC_CODE: string
  ATPT_OFCDC_SC_NM: string
  SD_SCHUL_CODE: string
  SCHUL_NM: string
  //조식 중식 석식 => 1,2,3
  MMEAL_SC_CODE: string
  //조식, 중식, 석식
  MMEAL_SC_NM: string
  //날짜 YYYYMMDD
  MLSV_YMD: string
  MLSV_FGR: number
  //메뉴
  DDISH_NM: string
  //알러지
  ORPLC_INFO: string
  //칼로리
  CAL_INFO: string
  NTR_INFO: string
  MLSV_FROM_YMD: string
  MLSV_TO_YMD: string
  LOAD_DTM: string
}