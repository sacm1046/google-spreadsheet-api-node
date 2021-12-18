const express = require('express');
const cors = require('cors');
const app = express();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./config/credentials');
const { type } = require('./config/credentials');
const { PORT } = process.env;

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Google Api - NodeJS"));

const getSheet = async () => {
    const doc = new GoogleSpreadsheet("12MEgCKSNAcO-gdXI8lBk7xd6llETDeEQ2Jahsab8q2w");
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    return sheet;
}

const getIndexByLetter = (columnLetter) => {
    const letters = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    return letters.split(",").findIndex((letter) => letter === columnLetter.toUpperCase())
}

const formatData = (value) => {
    if (value && value !== "") {
        if(!isNaN(value)) return Number(value)
        if(typeof value === 'string') return String(value)
    }
    return null
}

app.get('/rows', async (req, res) => {
    try {
        const { columnLetter } = req.body
        const sheet = await getSheet();
        const rows = await sheet.getRows();
        const index = getIndexByLetter(columnLetter)
        const maxColumnNumbers = Math.max(...rows.map(row => Number(row._rawData.length)))
        if(index < maxColumnNumbers) {
            const result = rows.map(row => {
                return {
                value: formatData(row._rawData[index]),
                cell: `${columnLetter.toUpperCase()}${row._rowNumber}`
            }})
            res.status(200).json(result)
        } else {
            res.status(400).json(`Columna ${columnLetter.toUpperCase()} no cuenta con título ni datos`)
        }
    } catch (error) {
        res.status(500).json("error")
    }
});

app.post('/cell', async (req, res) => {
    try {
        const { cell, value } = req.body
        const sheet = await getSheet();
        await sheet.loadCells(`A1:${cell}`);
        const cellReference = sheet.getCellByA1(cell);
        cellReference.value = value;
        await sheet.saveUpdatedCells()
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json("error")
    }
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
