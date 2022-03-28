import KeyboardKey from '../keyboardKey/keyboardKey'
import { keyboard, keyboardRow } from './keyboard.module.css'

let Keyboard = ({ guessedLetters, onKeyPress }) => {
	return (
		<div className={keyboard}>
			<div className={keyboardRow}>
				<KeyboardKey value="Q" onKeyPress={onKeyPress} accuracy={guessedLetters['Q']} />
				<KeyboardKey value="W" onKeyPress={onKeyPress} accuracy={guessedLetters['W']} />
				<KeyboardKey value="E" onKeyPress={onKeyPress} accuracy={guessedLetters['E']} />
				<KeyboardKey value="R" onKeyPress={onKeyPress} accuracy={guessedLetters['R']} />
				<KeyboardKey value="T" onKeyPress={onKeyPress} accuracy={guessedLetters['T']} />
				<KeyboardKey value="Y" onKeyPress={onKeyPress} accuracy={guessedLetters['Y']} />
				<KeyboardKey value="U" onKeyPress={onKeyPress} accuracy={guessedLetters['U']} />
				<KeyboardKey value="I" onKeyPress={onKeyPress} accuracy={guessedLetters['I']} />
				<KeyboardKey value="O" onKeyPress={onKeyPress} accuracy={guessedLetters['O']} />
				<KeyboardKey value="P" onKeyPress={onKeyPress} accuracy={guessedLetters['P']} />
			</div>

			<div className={keyboardRow}>
				<KeyboardKey value="A" onKeyPress={onKeyPress} accuracy={guessedLetters['A']} />
				<KeyboardKey value="S" onKeyPress={onKeyPress} accuracy={guessedLetters['S']} />
				<KeyboardKey value="D" onKeyPress={onKeyPress} accuracy={guessedLetters['D']} />
				<KeyboardKey value="F" onKeyPress={onKeyPress} accuracy={guessedLetters['F']} />
				<KeyboardKey value="G" onKeyPress={onKeyPress} accuracy={guessedLetters['G']} />
				<KeyboardKey value="H" onKeyPress={onKeyPress} accuracy={guessedLetters['H']} />
				<KeyboardKey value="J" onKeyPress={onKeyPress} accuracy={guessedLetters['J']} />
				<KeyboardKey value="K" onKeyPress={onKeyPress} accuracy={guessedLetters['K']} />
				<KeyboardKey value="L" onKeyPress={onKeyPress} accuracy={guessedLetters['L']} />
			</div>

			<div className={keyboardRow}>
				<KeyboardKey value="ENTER" command onKeyPress={onKeyPress} />
				<KeyboardKey value="Z" onKeyPress={onKeyPress} accuracy={guessedLetters['Z']} />
				<KeyboardKey value="X" onKeyPress={onKeyPress} accuracy={guessedLetters['X']} />
				<KeyboardKey value="C" onKeyPress={onKeyPress} accuracy={guessedLetters['C']} />
				<KeyboardKey value="V" onKeyPress={onKeyPress} accuracy={guessedLetters['V']} />
				<KeyboardKey value="B" onKeyPress={onKeyPress} accuracy={guessedLetters['B']} />
				<KeyboardKey value="N" onKeyPress={onKeyPress} accuracy={guessedLetters['N']} />
				<KeyboardKey value="M" onKeyPress={onKeyPress} accuracy={guessedLetters['M']} />
				<KeyboardKey value="DEL" command onKeyPress={onKeyPress} />
			</div>
		</div>
	)
}

export default Keyboard
