import express from 'express';
import fs from 'fs';
import path from 'path';
import { SimpleDate } from './date';
import { ApiData } from './api/apiType';
import { MonthlyMealInfo } from './api/parsedType';
import { MealDataFetcher } from './api/api';

export const API_KEY = fs.readFileSync('key/api.txt', 'utf-8');

const app = express();
const port = 3000;

export type AllMeals = {[keyof:string]:MonthlyMealInfo};
const data:AllMeals = JSON.parse(fs.readFileSync('cache/cacheData.json', 'utf-8'));

const dataFetcher = new MealDataFetcher(data);

app.get('/', async (req, res) => {

  let date =  req.query.date !== undefined ? req.query.date.toString() : new SimpleDate().formatDate();
  const mealInfo = await dataFetcher.getMealInfo(date);
  if(mealInfo === undefined){
    res.send('No data found');
    return;
  }
  console.dir(mealInfo);
  res.send(mealInfo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.addListener('close', () => {
  fs.writeFileSync('cache/cacheData.json', JSON.stringify(dataFetcher.cachedData));
});