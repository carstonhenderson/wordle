/**
 * ----------------------------------------------------------------------------
 * TODO
 * ----------------------------------------------------------------------------
 * - save game state in local storage to prevent cheating via hard refresh
 * - animate key presses
 * - animate guess checking
 * - add keyboard support
 * - add share functionality
 */

import { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import BoardCell from '../components/boardCell/boardCell'
import styles from '../styles/Home.module.css'
import Keyboard from '../components/keyboard/keyboard'
import dailyWords from '../dailyWords'

let getTodaysWord = () => {
	let baseDay = new Date('03/01/2022')
	let today = new Date()
	let dayInMilliseconds = 1000 * 60 * 60 * 24
	let difference = today - baseDay
	let index = Math.round(difference / dayInMilliseconds)

	return dailyWords[index]
}

let storeStats = (status, guesses) => {
	let stats = JSON.parse(window.localStorage.getItem('stats')) || []

	window.localStorage.setItem(
		'stats',
		JSON.stringify([
			...stats,
			{
				date: new Date().toDateString(),
				result: status,
				guesses: guesses
			}
		])
	)
}

let checkTodayPlayed = () => {
	let stats = JSON.parse(window.localStorage.getItem('stats')) || []
	let today = new Date().toDateString()

	for (let i = 0; i < stats.length; i++) {
		if (stats[i].date === today) {
			return true
		}
	}

	return false
}

let Home = () => {
	// let todaysWord = useMemo(() => getTodaysWord().toUpperCase(), [])
	let todaysWord = 'GREAT'

	let [todayPlayed, setTodayPlayed] = useState(false)
	let [stats, setStats] = useState([])
	let [status, setStatus] = useState('playing')
	let [guesses, setGuesses] = useState(['', '', '', '', '', ''])
	let [cellAccuracy, setCellAccuracy] = useState([
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', '']
	])
	let [guessNumber, setGuessNumber] = useState(0)
	let [currentGuess, setCurrentGuess] = useState('')
	let [guessedLetters, setGuessedLetters] = useState({
		A: '',
		B: '',
		C: '',
		D: '',
		E: '',
		F: '',
		G: '',
		H: '',
		I: '',
		J: '',
		K: '',
		L: '',
		M: '',
		N: '',
		O: '',
		P: '',
		Q: '',
		R: '',
		S: '',
		T: '',
		U: '',
		V: '',
		W: '',
		X: '',
		Y: '',
		Z: ''
	})

	useEffect(() => {
		setTodayPlayed(checkTodayPlayed())
		setStats(JSON.parse(window.localStorage.getItem('stats')))
	}, [])

	let handleKeyPress = value => {
		if (!todayPlayed) {
			if (value === 'DEL') {
				if (currentGuess.length > 0) {
					setCurrentGuess(current => current.slice(0, -1))
				}
			} else if (value === 'ENTER') {
				if (currentGuess.length === 5) {
					setGuesses(current => {
						return current.map((original, i) => {
							return i === guessNumber ? currentGuess : original
						})
					})

					setCurrentGuess('')
					setGuessNumber(current => current + 1)

					checkGuess(currentGuess)
				}
			} else if (currentGuess.length <= 5) {
				setCurrentGuess(current => current + value)
			}
		}
	}

	let checkGuess = guess => {
		let copy = { ...guessedLetters }

		for (let letter in copy) {
			if (guess.includes(letter)) {
				if (copy[letter] !== 'correct' && copy[letter] !== 'incorrect') {
					if (todaysWord.includes(letter)) {
						if (guess.indexOf(letter) === todaysWord.indexOf(letter) || todaysWord[guess.indexOf(letter)] === letter) {
							copy[letter] = 'correct'
						} else {
							copy[letter] = 'almost'
						}
					} else {
						copy[letter] = 'incorrect'
					}
				}
			}
		}

		setGuessedLetters(copy)

		let cellAccuracyCopy = [...cellAccuracy]
		let updatedRow = checkRowAccuracy(currentGuess)
		cellAccuracyCopy[guessNumber] = updatedRow

		setCellAccuracy(cellAccuracyCopy)

		if (guess === todaysWord) {
			storeStats('win', guessNumber)
			setStatus('win')
		} else if (guessNumber === 5) {
			setStatus('lose')
			storeStats('lose', guessNumber)
		}
	}

	let checkRowAccuracy = row => {
		return [...row].map((letter, i) => {
			// If the letter guessed is in the correct spot
			if (todaysWord[i] === letter) {
				return 'correct'
			}

			// If the letter guessed is in today's word but not in the correct spot
			else if (todaysWord.includes(letter)) {
				// If the letter guessed is in the
				if (todaysWord.slice(0, i).includes(letter)) {
					if (todaysWord.slice(0, i + 1).match(new RegExp(letter, 'g')).length >= currentGuess.slice(0, i + 1).match(new RegExp(letter, 'g'))?.length) {
						return 'almost'
					}
				}

				if (todaysWord.slice(i - 1).includes(letter)) {
					if (todaysWord.match(new RegExp(letter, 'g')).length >= currentGuess.match(new RegExp(letter, 'g')).length) {
						return 'almost'
					}
				}

				return 'incorrect'
			} else {
				return 'incorrect'
			}
		})
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Wordle</title>
				<meta name="description" content="Guess today's word" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Wordle</h1>

				{status === 'win' && <p>You guessed it</p>}

				{status === 'lose' && <p>{todaysWord}</p>}

				<div className={styles.board}>
					{[0, 1, 2, 3, 4, 5].map(i => (
						<div className={styles.boardRow} key={i}>
							{[0, 1, 2, 3, 4].map(k => (
								<BoardCell value={guessNumber === i ? currentGuess[k] : guesses[i][k]} accuracy={cellAccuracy[i][k]} key={k} />
							))}
						</div>
					))}
				</div>

				<Keyboard guessedLetters={guessedLetters} onKeyPress={handleKeyPress} />

				{(todayPlayed || status !== 'playing') && (
					<div className={styles.cover}>
						<div className={styles.modal}>
							<p className={styles.modalHeading}>STATS</p>

							<div className={styles.stats}>
								<div className={styles.statContainer}>
									<p className={styles.stat}>{stats.length}</p>
									<p className={styles.label}>Played</p>
								</div>

								<div className={styles.statContainer}>
									<p className={styles.stat}>?%</p>
									<p className={styles.label}>Win %</p>
								</div>

								<div className={styles.statContainer}>
									<p className={styles.stat}>?</p>
									<p className={styles.label}>Current streak</p>
								</div>

								<div className={styles.statContainer}>
									<p className={styles.stat}>?</p>
									<p className={styles.label}>Max streak</p>
								</div>
							</div>

							<p className={styles.modalHeading}>GUESS DISTRIBUTION</p>
						</div>
					</div>
				)}
			</main>
		</div>
	)
}

export default Home
