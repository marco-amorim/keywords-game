import { Dispatch, SetStateAction } from 'react';
import './styles.css';

interface KeywordInputProps {
	typingState: string;
	paused: boolean;
	setTypingState: Dispatch<SetStateAction<string>>;
}

const KeywordInput: React.FC<KeywordInputProps> = ({
	typingState,
	setTypingState,
	paused,
}) => {
	return (
		<div className="word-input">
			<label htmlFor="word">Enter the keywords here</label>
			<input
				type="text"
				name="word"
				id="word"
				value={typingState}
				onChange={(e) => setTypingState(e.target.value)}
				disabled={paused}
			/>
		</div>
	);
};

export default KeywordInput;
