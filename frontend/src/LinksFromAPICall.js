import { React, useState, useEffect } from 'react'
import token from './token'
function LinksFromAPICall() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch('https://api.github.com/search/topics?q=a11y', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.mercy-preview+json',
                Authorization: `${token}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result.items)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <ol>
                <li> {items.name}</li>
            </ol>
        )
    }
}
export default LinksFromAPICall
