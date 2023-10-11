import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSudoku } from "../../context/SudokuContext";

export default function Information({ activeButtonIndex, setActiveButtonIndex, juegoIniciado, setJuegoIniciado }) {

  const [totalSegundos, setTotalSegundos] = useState(0);
  const [cronometroActivo, setCronometroActivo] = useState(true);

  const { state, clearSudoku, setSudoku, resolveSudoku } = useSudoku();

  useEffect(() => {
    const cronometroInterval = setInterval(() => {
      if (cronometroActivo) {
        setTotalSegundos((prevTotalSegundos) => prevTotalSegundos + 1);
      }
    }, 1000);

    // Limpieza del intervalo cuando se desmonta el componente
    return () => clearInterval(cronometroInterval);
  }, [cronometroActivo]);

  useEffect(() => {

    console.log(state.isvalid);
    
    if (state.isvalid === true) {
      setCronometroActivo(false);
    }
  }, [setSudoku, resolveSudoku])


  // Función para cambiar el botón activo
  const cambiarColor = (index) => {

    if (index === 'B') {
      setActiveButtonIndex('B');
      return 0;
    }

    setActiveButtonIndex(index);
  };

  // Genera los botones numéricos con sus respectivas clases de color
  const buttons = Array.from({ length: 10 }, (_, index) => (
    <button
      key={index}
      className={`border rounded-lg border-black px-4 py-1 text-lg bg-${activeButtonIndex === index + 1 ? 'gray-300' : 'white'}`}
      onClick={() => cambiarColor(index + 1)}
    >
      {index + 1}
    </button>
  ));

  const botonBorrar = (
    <button
      key="borrar"
      className={`border rounded-lg border-black px-3 py-1 text-lg bg-${activeButtonIndex === 'B' ? 'gray-300' : 'white'}`}
      onClick={() => cambiarColor('B')}
    >
      <AiFillDelete />
    </button>
  );

  const ClearSudoku = () => {
    clearSudoku();
  }

  const ResolveSudoku = () => {
    resolveSudoku();
  }

  const ResetGame = () => {
    setJuegoIniciado(!juegoIniciado);
  }

  // Dividir los botones en dos filas
  const primeraFila = buttons.slice(0, 5);
  const segundaFila = buttons.slice(5, 9);
  const segundos = totalSegundos % 60;
  const minutos = Math.floor((totalSegundos / 60) % 60);
  const horas = Math.floor(totalSegundos / 3600);

  return (
    <div className="flex flex-col gap-y-2">

      <div className="flex mx-auto w-80 justify-center gap-x-4 mt-2">
        <button onClick={() => ClearSudoku()} className="flex rounded bg-yellow-300 px-2 py-1 font-Lato hover:bg-yellow-400 transition-transform transform hover:-translate-y-1"> Clear </button>
        <button onClick={() => ResolveSudoku()}className="flex rounded bg-purple-300 px-2 py-1 font-Lato hover:bg-purple-400 transition-transform transform hover:-translate-y-1"> Resolve </button>
        <button onClick={() => ResetGame()} className="flex rounded bg-blue-300 px-2 py-1 font-Lato hover:bg-blue-400 transition-transform transform hover:-translate-y-1"> New Game </button>
      </div>

      <button className="flex mx-auto w-72 justify-center items-center bg-gray-300 rounded p-1 font-Lato hover:bg-gray-400">
        {`${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`}
      </button>

      <div className="flex flex-col mx-auto w-72 justify-center items-center mt-2">

        <div className="flex flex-col mt-1">
          <div className="flex flex-row gap-x-4"> {primeraFila} </div>
          <div className="flex flex-row gap-x-4 mt-3">
            {segundaFila}
            {botonBorrar}
          </div>
        </div>

      </div>
    </div>
  );
}
