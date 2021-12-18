const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../config/credentials');

const getSheet = async (spreadsheetId) => {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    return sheet;
}

module.exports = getSheet