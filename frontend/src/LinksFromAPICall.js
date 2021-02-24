import { React, useState, useEffect } from 'react'
import { useContext } from 'react'
import token from './token'
import { useSelector, useDispatch } from 'react-redux'
import UserContext from './UserContext'
import Link from './Link'

function LinksFromAPICall() {
    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)
        const dispatch = useDispatch()
        const list_items = useSelector((st) => st.list_items)

        const [error, setError] = useState(null)
        const [isLoaded, setIsLoaded] = useState(false)
        const [items, setItems] = useState([])

        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        useEffect(() => {
            fetch('https://api.github.com/search/repositories?q=a11y', {
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
            return <>Error: {error.message}</>
        } else if (!isLoaded) {
            return <>Loading...</>
        } else {
            function loggedInUser() {
                function addItem(newItem) {
                    debugger
                    dispatch({ type: 'ADD_TO_LIST', list_item: newItem })
                }

                function deleteItem(itemToDelete) {
                    dispatch({
                        type: 'REMOVE_FROM_LIST',
                        list_item: itemToDelete,
                    })
                }

                return (
                    <ol>
                        {' '}
                        {items.map((i) => (
                            <Link
                                key={i.id}
                                url={i.html_url}
                                full_name={i.full_name}
                                addItem={addItem}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </ol>
                )
            }
            function loggedOutUser() {
                return (
                    <ol>
                        {items.map((i) => (
                            <li class=" shadow text-red-700 text-2xl p-2 m-4 font-bold">
                                <a href={i.html_url}>{i.full_name} </a>
                            </li>
                        ))}
                    </ol>
                )
            }
            return <>{currentUser ? loggedInUser() : loggedOutUser()}</>
        }
    }
}
export default LinksFromAPICall
