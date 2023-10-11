import { useState } from "react";
import Header from "./Components/Header/Header"
import SudokuScreen from "./Components/SudokuScreen/SudokuScreen";
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs'

export default function App() {

	const [nombre, setNombre] = useState('');
	const [errorNombre, setErrorNombre] = useState('');

	// Estado para iniciar el juego o desactivarlo.
	const [juegoIniciado, setJuegoIniciado] = useState(false);

	// Estado para mantener el nivel de dificultad actual.
	const [difficulty, setDifficulty] = useState('Easy');

	const handleClick = (option) => {

		if (option === 'right') {
			if (difficulty === 'Easy') {
				setDifficulty('Medium');
			} else if (difficulty === 'Medium') {
				setDifficulty('Hard');
			} else {
				setDifficulty('Easy');
			}
		}

		if (option === 'left'){
			if (difficulty === 'Easy') {
				setDifficulty('Hard')
			} else if (difficulty === 'Hard') {
				setDifficulty('Medium');
			} else {
				setDifficulty('Easy')
			}
		}
	};

	const handleNombreChange = (event) => {

		const nuevoNombre = event.target.value;
		setNombre(nuevoNombre);

		if (nuevoNombre.length > 0) {
			setErrorNombre(false);
		}
	};

	const handleIniciarJuego = () => {

		if (nombre.length === 0) {
			setErrorNombre('You must enter a valid name');
			return 0;
		} setJuegoIniciado(true);
	}

	return (
		<div className="flex flex-col h-screen">

			<div>
				<Header />
			</div>

			<div className="flex w-full h-full">

				{!juegoIniciado ?

					<div className="w-full max-w-sm mx-8 sm:mx-auto my-auto p-4 border border-green-300 bg-white shadow-lg">

						<div className="flex flex-col">

							<div className="relative">

								<div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
									<div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
										<svg viewBox="0 0 24 24"
											width="24"
											height="24"
											stroke="currentColor"
											strokeWidth="2"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-5 w-5">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
											<circle cx="12"
												cy="7"
												r="4"></circle>
										</svg>
									</div>
								</div>

								<input id="name"
									name="name"
									type="text"
									placeholder="Name"
									value={nombre}

									onChange={handleNombreChange}
									className="text-sm text-sm relative w-full border rounded placeholder-gray-400
								           focus:border-green-400 focus:outline-none py-2 pr-2 pl-12 font-Lato"
								/>

							</div> {errorNombre && <p style={{ color: 'red' }}>{errorNombre}</p>}

							<div className="relative">
								<input
									type="text"
									value={difficulty}
									className="text-sm font-Lato text-slate-600 sm:text-base relative w-full border rounded py-2 mt-4 text-center cursor-pointer focus:outline-none bg-gray-300"
									readOnly
								/>

								<div onClick={() => handleClick('left')} className="absolute left-3 top-7 text-md sm:text-lg cursor-pointer">
									<BsArrowLeftCircle />
								</div>

								<div onClick={() => handleClick('right')} className="absolute right-3 top-7 text-md sm:text-lg cursor-pointer">
									<BsArrowRightCircle />
								</div>
							</div>

							<button onClick={handleIniciarJuego}>
								<h1 className="bg-green-300 py-2 mt-2 font-Lato text-slate-600 hover:bg-green-400">New Game</h1>
							</button>
						</div>

					</div> :

					<div className="flex flex-col w-full justify-center mx-auto">
						<SudokuScreen difficulty={difficulty} juegoIniciado={juegoIniciado} setJuegoIniciado={setJuegoIniciado} />
					</div>
				}
			</div>
		</div>
	)
}


