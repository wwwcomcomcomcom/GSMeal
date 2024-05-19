import express from 'express';
import fs from 'fs';
import { SimpleDate } from './date';
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
  if(mealInfo.length === 0){
    res.send('No data found');
    return;
  }
  console.dir(mealInfo);
  res.send(mealInfo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});