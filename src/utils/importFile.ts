import { readFileSync } from 'fs';
// This function imports a csv file and returns the graph along with the start and end nodes.
/**
 * Example of a valid graph
 * 

from;to;weight
A;B;12
A;C;17
A;D;3
B;D;14
B;E;9
C;F;1
D;F;46
D;G;132
F;G;128
F;H;19
G;I;5
G;J;12
H;I;94
H;K;67
I;J;45
I;K;53
I;L;34
J;L;23
K;L;78
 */
/** 
* @param filepath 
* @returns graph
*/
const importCsvFile = (filePath: string) => {
    try {
        
        const fileContent = readFileSync(filePath, 'utf-8');
        // checking if the file is empty
        if (!fileContent) {
            throw new Error('File is empty');
        }
        
        const graph = fileContent.split('\n').slice(1).map((line) => {
            const [from, to, weight] = line.split(';');
            return [from, to, parseInt(weight)];
        });
        return graph;
    } catch (error) {
     throw new Error('Could not read file. Please check the file path and check if the file is of type .csv with the correct format.');   
    }
}

export default importCsvFile;