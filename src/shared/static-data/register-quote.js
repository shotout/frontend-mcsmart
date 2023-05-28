const economyIcon = require('../../assets/images/category/economy_business.png');
const celebrityIcon = require('../../assets/images/category/celebrities.png');
const foodDrinkCategory = require('../../assets/images/category/food_drink.png');
const sportCategory = require('../../assets/images/category/sport.png');

const objEconomy = {
  label:
    '[Example: Fact about “Economy & business” the background icon also “Economy & business”]',
  icon: economyIcon,
};

const objCelebrity = {
  label:
    '[Example: Fact about\n“Celebrities” the background\nicon also “Celebrities”]',
  icon: celebrityIcon,
};

const objFood = {
  label:
    '[Example: Fact about “Food & drink” the background icon also “Food & drink”]',
  icon: foodDrinkCategory,
};

const objSports = {
  label: '[Example: Fact about “Sports” the background icon also “Sports”]',
  icon: sportCategory,
};

export const firstStepQuote = [objCelebrity, objEconomy, objFood, objSports];
export const secondStepQuote = [objEconomy, objFood, objSports, objCelebrity];
export const thirdStepQuote = [objFood, objSports, objCelebrity, objEconomy];
export const fourthStepQuote = [objSports, objCelebrity, objEconomy, objFood];
