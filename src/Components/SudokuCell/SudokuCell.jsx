import { useState } from "react";
import { useSudoku } from "../../context/SudokuContext";
import { useEffect } from "react";
import Swal from 'sweetalert2'

export default function SudokuCell({ value, pos, information, isModificable, setSudoku }) {

    const [isvalid, setisvalid] = useState(false);
    const [valid, setValid] = useState(true);
    const { rowIndex, colIndex } = pos;
    const { state, checkSudoku } = useSudoku();

    const handleValue = () => {
        setSudoku(value, pos, information, isModificable);
        checkSudoku();
    }

    return (
        <div>
            <button
                className={`w-8 h-8 font-semibold text-center border border-slate-700
                flex items-center justify-center ${isModificable === true ? (valid === true ? '' : 'bg-red-300') : 'bg-green-300'}`}
                onClick={() => handleValue()}>
                {value}
            </button>

        </div>
    );
}

