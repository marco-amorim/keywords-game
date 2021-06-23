import './styles/global.css';
import KeywordInput from './components/KeywordInput';
import KeywordsBoard from './components/KeywordsBoard';
import { useState } from 'react';

const allKeywords = [
	'abstract',
	'assert',
	'boolean',
	'break',
	'byte',
	'case',
	'catch',
	'char',
	'class',
	'const',
	'continue',
	'default',
	'do',
	'double',
	'else',
	'enum',
	'extends',
	'final',
	'finally',
	'float',
	'for',
	'goto',
	'if',
	'implements',
	'import',
	'instanceof',
	'int',
	'interface',
	'long',
	'native',
	'new',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'short',
	'static',
	'strictfp',
	'super',
	'switch',
	'synchronized',
	'this',
	'throw',
	'throws',
	'transient',
	'try',
	'void',
	'volatile',
	'while',
];

const App = () => {
	const [currentWord, setCurrentWord] = useState<string>('');

	return (
		<>
			{console.log(currentWord)}
			<div className="game">
				<KeywordInput
					typingState={currentWord}
					setTypingState={(word) => setCurrentWord(word)}
				/>
				<KeywordsBoard keywords={allKeywords} />
			</div>
		</>
	);
};

export default App;
