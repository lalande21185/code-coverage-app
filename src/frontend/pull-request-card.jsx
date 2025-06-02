import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';

const CoverageDiff = ({ mainCoverage, prCoverage }) => {
    const diff = prCoverage - mainCoverage;
    const sign = diff >= 0 ? '+' : '-';

    return (
        <Text>
            {sign}{diff.toFixed(2)}%pt
        </Text>
    );
};

const App = () => {
    const [fromCoverage, setFromCoverage] = useState(null);
    const [toCoverage, setToCoverage] = useState(null);

    useEffect(async () => {
        const data = await invoke('fetchPullRequestCoverage');
        setFromCoverage(data.fromCoverage);
        setToCoverage(data.toCoverage);
    }, []);

    return (
        <>
            <Text>Source branch coverage: {fromCoverage ? `${fromCoverage}%` : 'Loading...'}</Text>
            <Text>Destination branch coverage: {toCoverage ? `${toCoverage}%` : 'Loading...'}</Text>
            {fromCoverage && toCoverage && (
                <>
                    <Text>
                        Coverage difference: <CoverageDiff mainCoverage={fromCoverage} prCoverage={toCoverage} />
                    </Text>
                </>
            )}
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);