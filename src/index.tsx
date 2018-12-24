import * as React from 'react'
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { CalculatorStore } from './calculator/stores/CalculatorStore'

import { App } from "./routes";

const calculatorStore: CalculatorStore = new CalculatorStore()

const render = (Component:any) => {
    ReactDOM.render(
        <AppContainer>
            <Component calculatorStore={calculatorStore} />
        </AppContainer>,
        document.getElementById("root")
    );
};

render(App);

