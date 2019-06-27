import * as React from 'react';
import { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import styled from 'styled-components';
import { CalculatorStore } from './calculator/stores/CalculatorStore';
import { Calculator } from './calculator/components/Calculator';

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
                    {store && <Calculator />}
                </PageContainer>
            </Provider>
        )
    }
}
