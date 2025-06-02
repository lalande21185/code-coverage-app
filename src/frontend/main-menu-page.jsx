import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        const repo = await invoke('fetchRepository');
        setData(repo);
    }, []);

    return (
        <>
            <Text>PHP test code coverage</Text>
            <Text>
                {data ? `Main branch: ${data.mainBranchName}` : 'Loading main branch...'}
            </Text>
            <Text>
                {data ? `Coverage: ${data.coverage}%` : 'Loading coverage...'}
            </Text>
            <Text>
                {data ? `Url: ${data.url}` : 'Loading url...'}
            </Text>
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);