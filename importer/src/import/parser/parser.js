import * as utils from './utils.js';
import * as formatData from './formatData.js';
import * as rawRow from './rawRow.js';

/**
 * Input a raw spreadsheet row to get the final parsed and structured objects
 * @param {Array} param0 Row columns
 * @param {Number} index Row index
 * @returns {Array<Object>}
 */
 export const parseRow = ({_rawData: rawData}, {_rawData: rawExtrasData}, index) => {
     // Structure row data according to our Hack4OpenGLAM 2021 spreadsheet template
    const row = rawRow.mapData(rawData, rawExtrasData); 

    // Data type specific structuring and pushing into data array below
    // We will push data objects extracted from current row to the following data array
    // to-do:check if this person has already been added in another row
    let data = [];
    
    for (const dataType of rawRow.findDataTypes(row)) {
        data.push(
            formatData.type[dataType](row, index)
        );
    }    

    return data;
};

export const parseTable = (rows, extrasRows) => {
    console.log(extrasRows, extrasRows[0]._rawData)

    const parsed = rows.flatMap((row, index) => {
        console.log(index, extrasRows[index])

        return parseRow(row, extrasRows[index] || ({_rawData: null}), index)
    });

    return parsed;
}