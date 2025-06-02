import {kvs} from '@forge/kvs';
import {success, badRequest, unknownError} from '../domain/web-trigger-response';
import {isBranchNameValid, isCoverageValid} from '../domain/validation';

export async function storeCoverage(request) {
    try {
        const { body } = request;

        const data = JSON.parse(body);

        if (isBranchNameValid(data.branch) === false) {
            return badRequest()
        }

        if (isCoverageValid(data.coverage) === false) {
            return badRequest()
        }

        await kvs.set(data.branch, String(data.coverage));

        return success()
    } catch (error) {
        return unknownError()
    }
}