import React, {useEffect, useState, useRef} from 'react'

const useFetch = (url, callback) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const [data, setData] = useState()
	
	useEffect(()=>{
		(async () => {
			const response = await fetch(url)
			setLoading(false)

			if (!response.ok) {
				setError(true)
			}
			
			const newData = await response.json()
			setData(newData)
			callback(newData)
		})()
	}, [url, callback])
	
	return [data, loading, error]
}

export default useFetch