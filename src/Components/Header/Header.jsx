import image from '../img.png';
import { AiFillGithub, AiOutlineWhatsApp, AiFillLinkedin } from 'react-icons/ai'

export default function Header() {

	const redirectToLinkedin = () => {
		window.open('https://www.linkedin.com/in/victor-pestana/', '_blank');
	}

	const redirectToGitHub = () => {
		window.open('https://github.com/stringVictorinox', '_blank');
	}

	const redirectToWhatsApp = () => {
		window.open('https://api.whatsapp.com/send?phone=5804264611890', '_blank');
	}

	return (
		<header className="p-3 bg-slate-100 shadow-lg">
			<div className="flex justify-between h-12 mx-auto">

				<img src={image} alt="image" className='flex justify-center items-center cursor-pointer transform hover:-translate-y-1 duration-300' />

				<div className="flex flex-row space-x-4 text-xl justify-center items-center">
					<AiFillGithub
						onClick={() => redirectToGitHub()}  
						className='bg-slate-200 box-content px-3 py-2 rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:shadow-inner
								   hover:shadow-black/30 duration-300 hover:text-gray-900' />
					<AiOutlineWhatsApp
						onClick={() => redirectToWhatsApp()} 
						className='bg-slate-200 box-content px-3 py-2 rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:shadow-inner
								   :shadow-black/30 duration-300 hover:text-green-500'/>
					<AiFillLinkedin 
						onClick={() => redirectToLinkedin()}
						className='bg-slate-200 box-content px-3 py-2 rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:shadow-inner
								   hover:shadow-black/30 duration-300 hover:text-blue-500' />
				</div>

			</div>
		</header>
	)
}
