import './styles.css';

interface KeywordsBoardProps {
	keywords: string[];
}

const KeywordsBoard: React.FC<KeywordsBoardProps> = ({ keywords }) => {
	return (
		<div className="keywords-board">
			{keywords.map((word, index) => {
				return <div key={index}>{word}</div>;
			})}
		</div>
	);
};

export default KeywordsBoard;
