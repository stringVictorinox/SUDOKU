import { useEffect, useState } from "react";
import SudokuBoard from "../SudokuBoard/SudokuBoard";
import Information from "../Information/Information";
import { useSudoku } from "../../context/SudokuContext";

export default function SudokuScreen({ difficulty, juegoIniciado, setJuegoIniciado }) {
    
    const { createSudoku } = useSudoku();

    useEffect(() => {
        if(difficulty === 'Easy') createSudoku('easy');
        else if(difficulty === 'Medium') createSudoku('medium');
        else createSudoku('hard');
    }, []);
    

    // Estado para rastrear el índice del botón activo.
    const [activeButtonIndex, setActiveButtonIndex] = useState(1);

    return (
        <div>
            <SudokuBoard activeButtonIndex={activeButtonIndex} />
            <Information
                activeButtonIndex={activeButtonIndex}
                setActiveButtonIndex={setActiveButtonIndex}
                juegoIniciado={juegoIniciado}
                setJuegoIniciado={setJuegoIniciado}
            />
            
        </div>
    )
}
