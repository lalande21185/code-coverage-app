import api, {route, webTrigger} from '@forge/api';
import Resolver from '@forge/resolver';
import {kvs} from '@forge/kvs';

const resolver = new Resolver();

resolver.define('fetchRepository', async ({ context }) => {
    const workspaceId = context.workspaceId;
    const repositoryId = context.extension.repository.uuid;

    const res = await api
        .asApp()
        .requestBitbucket(route`/2.0/repositories/${workspaceId}/${repositoryId}`);

    const repoData = await res.json();
    const mainBranchName = repoData.mainbranch.name;

    const coverage = await kvs.get(mainBranchName);

    const url = await webTrigger.getUrl('store-coverage-web-trigger');

    return {
      mainBranchName: mainBranchName,
      coverage: coverage,
      url: url,
    };
});

resolver.define('fetchPullRequestCoverage', async ({ context }) => {
    const workspaceId = context.workspaceId;
    const repositoryId = context.extension.repository.uuid;
    const pullRequestId = context.extension.pullRequest.id;

    const prResponse = await api
        .asApp()
        .requestBitbucket(
            route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${pullRequestId}`
        );

    const prData = await prResponse.json();
    const fromCoverage = await kvs.get(prData.source.branch.name);
    const toCoverage = await kvs.get(prData.destination.branch.name);

    return {
      fromCoverage: fromCoverage,
      toCoverage: toCoverage,
    };
});

export const handler = resolver.getDefinitions();