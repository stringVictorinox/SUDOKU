import { createContext, useContext, useReducer } from "react";
import { getSudoku } from 'sudoku-gen';
const SudokuContext = createContext();
import { checkColumns, checkRows, checkSubgrids } from "./sudokuUtils";

const CREATE_SUDOKU = "CREATE_SUDOKU";
const CLEAR_SUDOKU = "CLEAR_SUDOKU";
const SET_SUDOKU = "SET_SUDOKU";
const CANCEL_SUDOKU = "CANCEL_SUDOKU";
const RESOLVE_SUDOKU = "RESOLVE_SUDOKU";
const CHECK_SUDOKU = "CHECK_SUDOKU";

const sudokuReducer = (state, action) => {
    switch (action.type) {

        case CREATE_SUDOKU: {

            const { difficulty } = action.payload;
            state.solution = getSudoku(difficulty);

            let puzzle = state.solution.puzzle;

            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {

                    if (puzzle[0] === "-") {
                        state.sudokuArr[i][j] = 0;
                        puzzle = puzzle.substring(1);
                    } else {
                        state.sudokuArr[i][j] = puzzle.charAt(0);
                        puzzle = puzzle.substring(1);
                    }
                }
            }

            return { ...state, sudokuCopy: [...state.sudokuArr] }
        }

        case CLEAR_SUDOKU: {
            return { ...state, sudokuCopy: [...state.sudokuArr] };
        }

        case SET_SUDOKU: {

            const { pos, information, isModificable } = action.payload;

            if (isModificable) {
                if (information === 'B') {
                    state.sudokuCopy[pos.rowIndex][pos.colIndex] = 0;
                    return { ...state };
                } else {

                    // PRIMERO COMPROBAMOS SI LA CASILLA ES VÁLIDA PARA COLOCAR EL NÚMERO.

                    const updatedSudokuCopy = JSON.parse(JSON.stringify(state.sudokuCopy)); // Realizar una copia profunda
                    updatedSudokuCopy[pos.rowIndex][pos.colIndex] = information.toString();
                    return { ...state, sudokuCopy: updatedSudokuCopy };
                }
            }

            return { ...state }
        }

        case RESOLVE_SUDOKU: {
            var solution = state.solution.solution;
            
            // Crear una copia profunda de state
            const newState = { ...state, sudokuCopy: [], isvalid: true };
        
            for (let i = 0; i < 9; i++) {
                newState.sudokuCopy[i] = []; // Inicializar cada fila
        
                for (let j = 0; j < 9; j++) {
                    newState.sudokuCopy[i][j] = solution.charAt(0);
                    solution = solution.substring(1);
                }
            }
            
            return newState;
        }

        case CANCEL_SUDOKU: {
            return { ...state, isvalid: false };
        }

        case CHECK_SUDOKU: {

            if (checkColumns(state.sudokuCopy) && checkRows(state.sudokuCopy) && checkSubgrids(state.sudokuCopy)) {
                return { ...state, isvalid: true };
            }

            else {
                return { ...state, isvalid: false };
            }
        }

        default:
            return state;
    }
};

export const SudokuProvider = ({ children }) => {

    const initialSudoku = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0],
    ];

    const [state, dispatch] = useReducer(sudokuReducer, {
        sudokuArr: initialSudoku,
        sudokuCopy: initialSudoku,
        isvalid: false,
        solution: {}
    });

    const createSudoku = (difficulty) => {
        dispatch({ type: CREATE_SUDOKU, payload: { difficulty } });
    }

    const clearSudoku = () => {
        dispatch({ type: CLEAR_SUDOKU, payload: {} });
    };

    const setSudoku = (value, pos, information, isModificable) => {
        dispatch({ type: SET_SUDOKU, payload: { value, pos, information, isModificable } });
    }

    const checkSudoku = () => {
        dispatch({ type: CHECK_SUDOKU, payload: {} });
    }

    const resolveSudoku = () => {
        dispatch({ type: RESOLVE_SUDOKU, payload: {} });
    }

    const cancelSudoku = () => {
        dispatch({ type: CANCEL_SUDOKU, payload: {} });
    }

    return (
        <SudokuContext.Provider value={{ state, createSudoku, clearSudoku, setSudoku, checkSudoku, resolveSudoku, cancelSudoku }}>
            {children}
        </SudokuContext.Provider>
    );
};

export const useSudoku = () => {
    const context = useContext(SudokuContext);
    if (!context) {
        throw new Error("useSudoku debe usarse dentro de SudokuProvider");
    }
    return context;
};

