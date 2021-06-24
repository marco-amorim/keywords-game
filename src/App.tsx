import './styles/global.css';
import KeywordInput from './components/KeywordInput';
import KeywordsBoard from './components/KeywordsBoard';
import { useEffect, useState } from 'react';
import { allKeywords } from './data';

const App = () => {
	const [currentWord, setCurrentWord] = useState<string>('');
	const [correctWords, setCorrectWords] = useState<string[]>([]);

	useEffect(() => {
		if (
			allKeywords.includes(currentWord) &&
			!correctWords.includes(currentWord)
		) {
			setCorrectWords([...correctWords, currentWord]);
			setCurrentWord('');
		}
	}, [correctWords, currentWord]);

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

	return (
		<div className="game">
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
