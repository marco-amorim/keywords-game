import './styles.css';
import { allKeywords } from '../../data';

interface KeywordsBoardProps {
	keywords: string[];
}

const KeywordsBoard: React.FC<KeywordsBoardProps> = ({ keywords }) => {
	return (
		<div className="keywords-board">
			{allKeywords.map((word, index) => {
				return (
					<div key={index}>
						<p>{keywords.includes(word) ? word : null}</p>
					</div>
				);
			})}
		</div>
	);
};

export default KeywordsBoard;
