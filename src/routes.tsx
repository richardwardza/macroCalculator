import * as React from 'react'
import { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import { CalculatorStore } from './calculator/stores/CalculatorStore'

import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';


export type CalculatorProps = {
    calculatorStore: CalculatorStore
}

const PageContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    background-color: #dcdcdc;
    height: 100vh;
    padding: 0;
`;

const Intro = styled.div`
    padding: 30px 0;
    text-align: center;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`
const Inputs = styled.div`
    display: flex;
    flex-direction: column;
`
const Goal = styled.div`
    margin-top: 30px;
`

const InfoText = styled.div`

`;

const Required = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

const ResultTable = styled.table`

`


const bgColors = {
    carb: "#6a89cc",
    protein: "#82ccdd",
    fat: "#60a3bc",
    label: "#f8c291"
}

const fontColors = {
    label: "#2c2c2c"
}

const Header = styled.th`
    background-color: ${(p: { type?: string }) => (p.type ? bgColors[p.type] : "#dcdcdc")};
    color: ${(p: { type?: string }) => (p.type ? fontColors[p.type] : "#ffffff")};
    border: 0;
    padding: 25px;
    color: #fff;
`

const ResultRow = styled.tr`

`

const Cell = styled.td`
    background-color: ${(p: { type?: string }) => (p.type ? bgColors[p.type] : "#ffffff")};
    color: ${(p: { type?: string }) => (p.type ? fontColors[p.type] : "#ffffff")};
    border: 0;
    padding: 25px;
`

@observer
export class App extends Component<CalculatorProps> {

    public render() {
        const store = this.props.calculatorStore;
        return (
            <Provider calculatorStore={store}>
                <PageContainer>
                    <Intro>
                        Macro Calculator
                    </Intro>
                    <InfoContainer>
                        <Inputs>
                            <TextField label="Enter your Weight" value={store.weight} onChange={store.setWeight} />
                            <Goal>
                                <FormLabel >Select your goal</FormLabel>
                                <RadioGroup
                                    aria-label="Goal"
                                    name="goal"
                                    value={store.goal}
                                    onChange={store.setGoal}
                                >
                                    <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
                                    <FormControlLabel value="gain" control={<Radio />} label="Gain Weight" />
                                    <FormControlLabel value="lose" control={<Radio />} label="Lose Weight" />
                                </RadioGroup>
                            </Goal>
                        </Inputs>

                        <InfoText>
                            <Required>You require {store.dailyCalories} daily calories to {store.goal} weight</Required>
                            <ResultTable>
                                <ResultRow>
                                    <Header />
                                    <Header type="carb">Carb</Header>
                                    <Header type="protein">Protein</Header>
                                    <Header type="fat">Fat</Header>
                                </ResultRow>
                                <ResultRow>
                                    <Cell type="label">Percentage Required</Cell>
                                    <Cell type="carb">{store.calorieMakeup.carbLow}% to {store.calorieMakeup.carbHigh}%</Cell>
                                    <Cell type="protein">{store.calorieMakeup.proteinLow}% to {store.calorieMakeup.proteinHigh}%</Cell>
                                    <Cell type="fat">{store.calorieMakeup.fatLow}% to {store.calorieMakeup.fatHigh}%</Cell>
                                </ResultRow>
                                <ResultRow>
                                    <Cell type="label">Calories Required</Cell>
                                    <Cell type="carb">{store.makeupWeights.carbLow} to {store.makeupWeights.carbHigh}</Cell>
                                    <Cell type="protein">{store.makeupWeights.proteinLow} to {store.makeupWeights.proteinHigh}</Cell>
                                    <Cell type="fat">{store.makeupWeights.fatLow} to {store.makeupWeights.fatHigh}</Cell>
                                </ResultRow>
                                <ResultRow>
                                    <Cell type="label">Grams Required</Cell>
                                    <Cell type="carb">{store.caloriesToGrams.carbLow} to {store.caloriesToGrams.carbHigh}</Cell>
                                    <Cell type="protein">{store.caloriesToGrams.proteinLow} to {store.caloriesToGrams.proteinHigh}</Cell>
                                    <Cell type="fat">{store.caloriesToGrams.fatLow} to {store.caloriesToGrams.fatHigh}</Cell>
                                </ResultRow>
                            </ResultTable>

                        </InfoText>
                    </InfoContainer>
                </PageContainer>
            </Provider>
        )
    }
}
