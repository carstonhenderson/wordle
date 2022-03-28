import { cell, correct, almost, incorrect } from './boardCell.module.css'

let BoardCell = ({ value, accuracy = 'incomplete' }) => {
	let accuracyClasses = {
		correct: correct,
		almost: almost,
		incorrect: incorrect,
		incomplete: ''
	}
	return <div className={`${cell} ${accuracyClasses[accuracy]}`}>{value}</div>
}

export default BoardCell
