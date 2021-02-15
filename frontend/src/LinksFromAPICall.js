import { React, useState, useEffect } from 'react'
import { useContext } from 'react'
import token from './token'
import { useSelector, useDispatch } from 'react-redux'
import UserContext from './UserContext'
function LinksFromAPICall() {
    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)
        const dispatch = useDispatch()
        const list_items = useSelector((st) => st.list_items)
        function addItem(newItem) {
            dispatch({ type: 'ADD_TO_LIST', list_item: newItem })
        }
        function deleteItem(itemToDelete) {
            dispatch({ type: 'REMOVE_FROM_LIST', list_item: itemToDelete })
        }
        function handleAdd(e) {
            e.preventDefault()
            addItem()
            console.log('LIST ITEMS FROM HANDLEADD', list_items)
        }
        function handleDelete(e) {
            e.preventDefault()
            deleteItem()
            console.log('LIST ITEMS FROM HANDLEDELETE', list_items)
        }

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
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            function loggedInUser() {
                return (
                    <ol>
                        {' '}
                        {items.map((i) => (
                            <li>
                                <a href={i.html_url}>{i.full_name} </a>
                                <button onClick={handleAdd}>
                                    Add link to your personal list
                                </button>
                                <button onClick={handleDelete}>
                                    Remove all from your list
                                </button>
                            </li>
                        ))}
                    </ol>
                )
            }
            function loggedOutUser() {
                return (
                    <ol>
                        {items.map((i) => (
                            <li>
                                <a href={i.html_url}>{i.full_name} </a>
                            </li>
                        ))}
                    </ol>
                )
            }
            return <div>{currentUser ? loggedInUser() : loggedOutUser()}</div>
        }
    }
}
export default LinksFromAPICall
