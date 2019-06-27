import { observable, action, computed } from 'mobx'

type TGoal = "maintain" | "gain" | "lose";

const calorieOffset: { [k: string]: number } = {
    maintain: 0,
    gain: 500,
    lose: -500
}

const caloriePercentages: {[k:string]: {[k:string]: number[]}} = {
    "maintain": {
        carb: [30, 50],
        protein: [25, 35],
        fat: [25, 35]
    },
    "gain": {
        carb: [40, 60],
        protein: [25, 35],
        fat: [15, 25]
    },
    "lose": {
        carb: [10, 30],
        protein: [40, 50],
        fat: [30, 40]
    }
}


export class CalculatorStore {
    private kgToPound: number = 2.20462;
    private calorieFactor: number = 16;
    private carbsToGrams: number = 4;
    private proteinToGrams: number = 4;
    private fatToGrams: number = 9;

    @observable public weight: number = 90;
    @observable public goal: TGoal = "maintain"

    @action
    public setWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.weight = parseInt(event.target.value);
    }

    @action
    public setGoal = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.goal = event.target.value as TGoal;
    }

    @computed
    get dailyCalories(): number {
        return Math.round(this.weight * this.kgToPound * this.calorieFactor) + calorieOffset[this.goal];
    }

    @computed
    get calorieMakeup(): {[k: string]: number} {
        const makeup = caloriePercentages[this.goal];
        return {
            carbLow: makeup.carb[0],
            carbHigh: makeup.carb[1],
            proteinLow: makeup.protein[0],
            proteinHigh: makeup.protein[1],
            fatLow: makeup.fat[0],
            fatHigh: makeup.fat[1],
        }
    }

    @computed
    get makeupWeights() {
        const makeup = caloriePercentages[this.goal];
        const dailyCalories: number = this.dailyCalories;

        return{
            carbLow: Math.round(dailyCalories * makeup.carb[0] / 100),
            carbHigh: Math.round(dailyCalories * makeup.carb[1] /100),
            proteinLow: Math.round(dailyCalories * makeup.protein[0] /100),
            proteinHigh: Math.round(dailyCalories * makeup.protein[1] /100),
            fatLow: Math.round(dailyCalories * makeup.fat[0] /100),
            fatHigh: Math.round(dailyCalories * makeup.fat[1] /100),
        }
    }

    @computed
    get caloriesToGrams() {
        const makeup = this.makeupWeights;

        return {
            carbLow: Math.round(makeup.carbLow / this.carbsToGrams),
            carbHigh: Math.round(makeup.carbHigh / this.carbsToGrams),
            proteinLow: Math.round(makeup.proteinLow / this.proteinToGrams),
            proteinHigh: Math.round(makeup.proteinHigh / this.proteinToGrams),
            fatLow: Math.round(makeup.fatLow / this.fatToGrams  ),
            fatHigh: Math.round(makeup.fatHigh / this.fatToGrams),
        }
    }
}