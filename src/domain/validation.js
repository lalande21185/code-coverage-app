
function isBranchNameValid(branchName) {
    if (! branchName) {
        return false;
    }

    return typeof branchName === 'string';
}

function isCoverageValid(coverage) {
    if (! coverage) {
        return false;
    }

    if (typeof coverage === 'number' === false) {
        return false;
    }

    if (isFinite(coverage) === false) {
        return false;
    }

    if (coverage < 0) {
        return false;
    }

    if (coverage > 100) {
        return false;
    }

    coverage = String(coverage);

    if (coverage.includes('.')) {
        const decimalPart = coverage.split('.')[1];
        if (decimalPart.length > 2) {
            return false;
        }
    }

    return true;
}

export {isBranchNameValid, isCoverageValid};