import './styles.css';

const KeywordInput = () => {
	return (
		<div className="word-input">
			<label htmlFor="word">Enter the keywords here</label>
			<input type="text" name="word" id="word" />
		</div>
	);
};

export default KeywordInput;
