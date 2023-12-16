
'use client';
import React, { Suspense, useState } from 'react';
import HealthTestQuizAndResultLogic from "./healthTestQuizAndResultLogic";

import { scrollToElement } from '../../../utils/utils';
import { SELECTORS } from '../../../constants/selectors';
import { HealthTestAdviceType, HealthTestQuestionsType, HealthTestType } from '../../../ts/types';
import HealthTestQuiz from './healthTestQuiz';
import HealthTestResult from './healthTestResult';
import { Spinner } from '@nextui-org/react';

type Props = {
    test: HealthTestType,
    testQA: HealthTestQuestionsType,
}

const HealthTestQuizAndResult = (props: Props) => {
    const [test, setTest] = useState<HealthTestType>(props?.test);
    const [testQA, setTestQA] = useState<HealthTestQuestionsType>(props?.testQA);
    const [advice, setAdvice] = useState<HealthTestAdviceType>();
    const [showResult, setShowResult] = useState<boolean>(false);

    const logic = HealthTestQuizAndResultLogic();

    /**
     * Handle test results submit
     * 
     * @param data 
     */
    const handleTestSubmit = (result: number, questions_and_answers: any[]) => {
        if (!test || !test.id) return;

        logic.saveHealthTestResult(test?.id, result, questions_and_answers).then((response: any) => {
            setAdvice(response?.advice);
            setShowResult(true);

            scrollToElement(`.${SELECTORS.anchorScroll}`);
        });
    }

    // Return 404 
    if (!test || !testQA) return (<></>);

    return (
        <Suspense fallback={<Spinner />}>
            {/* Empty element used for auto scroll on page change */}
            <div className={`${SELECTORS.anchorScroll} t-nav`}></div>

            {/* Show test view */}
            {
                !showResult && <HealthTestQuiz testID={test?.id} testQA={testQA} submitTest={handleTestSubmit}></HealthTestQuiz>
            }

            {/* Show test result */}
            {
                showResult && <HealthTestResult advice={advice}></HealthTestResult>
            }
        </Suspense>
    )
}

export default HealthTestQuizAndResult;