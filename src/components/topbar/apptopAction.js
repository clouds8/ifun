const SelectNavAction = 'selectNav'
const SelectNavSuccessAction = 'selectNavSuccess'
const SelectNavFailAction = 'selectNavFail'

function createSelectNavAction(payload) {
    return {
        type: SelectNavAction,
        payload
    }
}

function createSelectNavSuccessAction(payload) {
    return {
        type: SelectNavSuccessAction,
        payload
    }
}

function createSelectNavFailAction(payload) {
    return {
        type: SelectNavFailAction,
        payload,
        error: true
    }
}



export {
    SelectNavAction,
    SelectNavSuccessAction,
    SelectNavFailAction,
    createSelectNavAction,
    createSelectNavSuccessAction,
    createSelectNavFailAction
}