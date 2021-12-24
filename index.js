const express = require('express');
const cors = require('cors');
const { getIndexByLetter, formatData, getSheet } = require('./helpers');
const { PORT } = process.env;

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Google Api - NodeJS"));

app.post('/rows', async (req, res) => {
    try {
        const { columnLetter, spreadsheetId } = req.body
        const sheet = await getSheet(spreadsheetId);
        const rows = await sheet.getRows();
        const index = getIndexByLetter(columnLetter)
        const maxColumnNumbers = Math.max(...rows.map(row => Number(row._rawData.length)))
        if (index < maxColumnNumbers) {
            const result = rows.map(row => {
                return {
                    value: formatData(row._rawData[index]),
                    cell: `${columnLetter.toUpperCase()}${row._rowNumber}`
                }
            })
            res.status(200).json(result)
        } else {
            res.status(400).json(`Columna ${columnLetter.toUpperCase()} no cuenta con título ni datos`)
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

app.post('/cell', async (req, res) => {
    try {
        const { cell, value, spreadsheetId } = req.body
        const sheet = await getSheet(spreadsheetId);
        await sheet.loadCells(`A1:${cell}`);
        const cellReference = sheet.getCellByA1(cell);
        cellReference.value = value;
        await sheet.saveUpdatedCells()
        res.status(200).json("Posteado")
    } catch (error) {
        res.status(500).json(error)
    }
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
