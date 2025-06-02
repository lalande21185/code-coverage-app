
function success() {
    return {outputKey: 'status-ok'};
}

function badRequest() {
    return {outputKey: 'status-error-bad-request'};
}

function unknownError() {
    return {outputKey: 'status-error-unknown'};
}

export {success, badRequest, unknownError};