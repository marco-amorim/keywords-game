import './styles/global.css';
import KeywordInput from './components/KeywordInput';
import KeywordsBoard from './components/KeywordsBoard';
import { useCallback, useEffect, useState } from 'react';
import { allKeywords } from './data';

const App = () => {
	const [currentWord, setCurrentWord] = useState<string>('');
	const [correctWords, setCorrectWords] = useState<string[]>([]);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(300);

	const checkForCorrectWord = useCallback(() => {
		if (
			allKeywords.includes(currentWord) &&
			!correctWords.includes(currentWord)
		) {
			setCorrectWords([...correctWords, currentWord]);
			setCurrentWord('');
		}
	}, [correctWords, currentWord]);

	const controlGameState = useCallback(() => {
		if (!isPaused && timeLeft > 0 && correctWords.length < allKeywords.length) {
			setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		}

		if (correctWords.length === allKeywords.length) {
			alert('Congratulations, you won the game!');
		}

		if (timeLeft === 0) {
			alert('Sorry, you lost the game!');
		}
	}, [correctWords, isPaused, timeLeft]);

	useEffect(() => {
		controlGameState();
		checkForCorrectWord();
	}, [checkForCorrectWord, controlGameState]);

	interface PercentageCalculation {
		keywordsAmount: number;
		correctKeywords: number;
	}

	const calculatePercentage = (numbersForPercentage: PercentageCalculation) => {
		return (
			(numbersForPercentage.correctKeywords /
				numbersForPercentage.keywordsAmount) *
			100
		).toFixed();
	};

	const calculateTimeLeft = (timeLeft: number) => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft - minutes * 60;

		return `${minutes < 10 ? '0' + minutes : minutes}:${
			seconds < 10 ? '0' + seconds : seconds
		}`;
	};

	return (
		<div className="game">
			<div className="current-time">{calculateTimeLeft(timeLeft)}</div>
			<button
				style={{ backgroundColor: isPaused ? 'green' : 'red' }}
				onClick={() => setIsPaused(!isPaused)}
			>
				{isPaused ? 'START' : 'STOP'}
			</button>
			<h2>{`Correct keywords so far: ${correctWords.length}/${
				allKeywords.length
			}, Percentage: ${calculatePercentage({
				keywordsAmount: allKeywords.length,
				correctKeywords: correctWords.length,
			})}%`}</h2>
			<KeywordInput
				typingState={currentWord}
				setTypingState={(word) => setCurrentWord(word)}
			/>
			<KeywordsBoard correctKeywords={correctWords} />
		</div>
	);
};

export default App;
