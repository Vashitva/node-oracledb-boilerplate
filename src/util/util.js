const isEmptyString = (str) => {
    return !str || str === null || str === '' || str === undefined;
}

module.exports = {isEmptyString};