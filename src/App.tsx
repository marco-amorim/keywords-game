import { useCallback, useEffect, useState } from 'react';
import KeywordInput from './components/KeywordInput';
import KeywordsBoard from './components/KeywordsBoard';
import { allKeywords } from './data';
import './styles/global.css';

const GAME_TIME = 300;

const App = () => {
	const [currentWord, setCurrentWord] = useState<string>('');
	const [correctWords, setCorrectWords] = useState<string[]>([]);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(GAME_TIME);

	const checkForCorrectWord = useCallback(() => {
		if (
			allKeywords.includes(currentWord.toLowerCase()) &&
			!correctWords.includes(currentWord)
		) {
			setCorrectWords([...correctWords, currentWord.toLowerCase()]);
			setCurrentWord('');
		}
	}, [correctWords, currentWord]);

	const controlGameState = useCallback(() => {
		if (!isPaused && timeLeft > 0 && correctWords.length < allKeywords.length) {
			setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		}

		if (correctWords.length === allKeywords.length && !isPaused) {
			alert('Congratulations, you won the game!');
			setIsPaused(true);
			setTimeout(() => setTimeLeft(GAME_TIME), 1000);
			setCorrectWords([]);
		}

		if (timeLeft === 0 && !isPaused) {
			alert('Sorry, you lost the game!');
			setIsPaused(true);
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

	const handleStartStop = () => {
		if (timeLeft === 0) {
			setTimeLeft(GAME_TIME);
		}
		setIsPaused(!isPaused);
	};

	return (
		<div className="game">
			<h1>Java Keywords Game</h1>
			<div className="current-time">{calculateTimeLeft(timeLeft)}</div>
			<button
				style={{ backgroundColor: isPaused ? 'green' : 'red' }}
				onClick={handleStartStop}
			>
				{isPaused ? 'START' : 'STOP'}
			</button>
			<h2>{`SCORE: ${correctWords.length}/${
				allKeywords.length
			} - ${calculatePercentage({
				keywordsAmount: allKeywords.length,
				correctKeywords: correctWords.length,
			})}%`}</h2>
			<KeywordInput
				typingState={currentWord}
				setTypingState={(word) => setCurrentWord(word)}
				paused={isPaused}
			/>
			<KeywordsBoard correctKeywords={correctWords} />
		</div>
	);
};

export default App;
