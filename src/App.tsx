import './styles/global.css';
import KeywordInput from './components/KeywordInput';
import KeywordsBoard from './components/KeywordsBoard';
import { useCallback, useEffect, useState } from 'react';
import { allKeywords } from './data';

const App = () => {
	const [currentWord, setCurrentWord] = useState<string>('');
	const [correctWords, setCorrectWords] = useState<string[]>([]);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(10);

	const checkForCorrectWord = useCallback(() => {
		if (
			allKeywords.includes(currentWord) &&
			!correctWords.includes(currentWord)
		) {
			setCorrectWords([...correctWords, currentWord]);
			setCurrentWord('');
		}
	}, [correctWords, currentWord]);

	const updateGameState = useCallback(() => {
		if (!isPaused) {
			if (timeLeft > 0) {
				setTimeLeft(timeLeft - 1);
			}
		}
	}, [isPaused, timeLeft]);

	useEffect(() => {
		checkForCorrectWord();
		updateGameState();
	}, [checkForCorrectWord, updateGameState]);

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
			<button onClick={() => setIsPaused(!isPaused)}>
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
