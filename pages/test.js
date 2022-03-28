import { useState } from 'react'

let Test = () => {
	console.log('render')
	let [count, setCount] = useState(0)

	return (
		<main>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</main>
	)
}

export default Test
