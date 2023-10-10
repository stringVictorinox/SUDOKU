export function checkRows(grid) {
    for (let row = 0; row < 9; row++) {
        const rowSet = new Set();
        for (let col = 0; col < 9; col++) {
            const value = grid[row][col];
            if (value === 0 || rowSet.has(value)) {
                return false; // Hay un valor repetido o un valor no válido en la fila
            }
            rowSet.add(value);
        }
    }
    return true; // Todas las filas son válidas
}

export function checkColumns(grid) {
    for (let col = 0; col < 9; col++) {
        const colSet = new Set();
        for (let row = 0; row < 9; row++) {
            const value = grid[row][col];
            if (value === 0 || colSet.has(value)) {
                return false; // Hay un valor repetido o un valor no válido en la columna
            }
            colSet.add(value);
        }
    }
    return true; // Todas las columnas son válidas
}

export function checkSubgrids(grid) {
    for (let startRow = 0; startRow < 9; startRow += 3) {
        for (let startCol = 0; startCol < 9; startCol += 3) {
            const subgridSet = new Set();
            for (let row = startRow; row < startRow + 3; row++) {
                for (let col = startCol; col < startCol + 3; col++) {
                    const value = grid[row][col];
                    if (value === 0 || subgridSet.has(value)) {
                        return false; // Hay un valor repetido o un valor no válido en la subgrilla
                    }
                    subgridSet.add(value);
                }
            }
        }
    }
    return true; // Todas las subgrillas son válidas
}


export function isValidMove(sudokuCopy, rowIndex, colIndex, information) {

    // HAREMOS LA COMPROBACIÓN CON LA FILA.

    for (let i = 0; i < 9; i++) {
        if (sudokuCopy[rowIndex][i] === information) {
            return 0;
        }
    }

    // HAREMOS LA COMPROBACIÓN DE LA COLUMNA.

    for (let i = 0; i < 9; i++) {
        if (sudokuCopy[i][colIndex] === information) {
            return 0;
        }
    }

    // VERIFICAMOS EL BLOQUE 3 X 3.

    const blockStartRow = Math.floor(rowIndex / 3) * 3;
    const blockStartCol = Math.floor(colIndex / 3) * 3;

    for (let i = blockStartRow; i < blockStartRow + 3; i++) {
        for (let j = blockStartCol; j < blockStartCol + 3; j++) {
            if (sudokuCopy[i][j] === information) {
                return 0;
            }
        }
    }

    return 1;
}