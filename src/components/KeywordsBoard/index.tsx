import './styles.css';
import { allKeywords } from '../../data';

interface KeywordsBoardProps {
	correctKeywords: string[];
}

const KeywordsBoard: React.FC<KeywordsBoardProps> = ({ correctKeywords }) => {
	return (
		<div className="keywords-board">
			{allKeywords.map((word, index) => {
				return (
					<div key={index}>
						<p>{correctKeywords.includes(word) ? word : null}</p>
					</div>
				);
			})}
		</div>
	);
};

export default KeywordsBoard;
