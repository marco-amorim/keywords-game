import './styles.css';

interface KeywordsBoardProps {
	keywords: string[];
}

const KeywordsBoard: React.FC<KeywordsBoardProps> = ({ keywords }) => {
	return (
		<div className="keywords-board">
			{keywords.map((word) => {
				return <div>{word}</div>;
			})}
		</div>
	);
};

export default KeywordsBoard;
