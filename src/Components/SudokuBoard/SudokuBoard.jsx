import SudokuCell from "../SudokuCell/SudokuCell";
import { useSudoku } from "../../context/SudokuContext";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

export default function SudokuBoard({ activeButtonIndex }) {

    const { state, setSudoku, cancelSudoku } = useSudoku();
    const [showAlert, setShowAlert] = useState(false);
    const { sudokuArr, sudokuCopy } = state;

    useEffect(() => {
        if (state.isvalid === true) {
            setShowAlert(true);
        } else setShowAlert(false);
    }, [setSudoku])

    const SudokuValid = () => {
        Swal.fire({
            title: 'Congratulations!',
            text: 'The sudoku is correct ✨',
            width: 400,
            padding: '1em',
            imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/kdp/ac870073-ef79-479d-b652-9327f52f4bd5.__CR0,116,1400,700_PT0_SX350_V1___.jpg',
            color: '#a0a0a0',
            background: '#ffffff',
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
          })
        cancelSudoku();
    }


    return (

        <div className="">

            <table className="mx-auto my-auto">
                <tbody>
                    {[0, 1, 2].map((blockRow) => (
                        <tr key={blockRow}>
                            {[0, 1, 2].map((blockCol) => (
                                <td key={blockCol}>
                                    <table className="mr-1 mb-2">
                                        <tbody>
                                            {[0, 1, 2].map((row) => (
                                                <tr key={row}>
                                                    {[0, 1, 2].map((col) => {
                                                        const rowIndex = blockRow * 3 + row;
                                                        const colIndex = blockCol * 3 + col;
                                                        return (
                                                            <td key={col} className="p-0">
                                                                <SudokuCell
                                                                    value={sudokuCopy[rowIndex][colIndex] == 0 ? '' : sudokuCopy[rowIndex][colIndex]}
                                                                    pos={{ rowIndex, colIndex }}
                                                                    information={activeButtonIndex}
                                                                    isModificable={sudokuArr[rowIndex][colIndex] === 0 ? true : false}
                                                                    setSudoku={setSudoku}
                                                                />
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAlert === true ? <div>
                <SudokuValid />
            </div> : null
            }
        </div>
    );
}

