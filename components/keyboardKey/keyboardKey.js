import { key, commandKey, correct, almost, incorrect } from './keyboardKey.module.css'

let KeyboardKey = ({ value, onKeyPress, command = false, accuracy = 'none' }) => {
	let accuracyClasses = {
		correct: correct,
		almost: almost,
		incorrect: incorrect,
		none: ''
	}

	return (
		<button className={`${command ? commandKey : key} ${accuracyClasses[accuracy]}`} onClick={() => onKeyPress(value)}>
			{value}
		</button>
	)
}

export default KeyboardKey
