import React from 'react'

function Home() {
    return (
        <>
            <h1 className="rounded shadow-lg text-red-800 text-6xl p-6 m-6">
                Welcome to a11yTweet!
            </h1>
            <p className="rounded-lg bg-blue-50 text-red-700 text-4xl p-6 m-6">
                We've collected a list of Github repos with 'a11y' in the name.
                You can retweet them directly from our list page, or sign up to
                save your own page of links.
            </p>
            <h2 className="text-gray-600 text-2xl p-6 m-6">
                Here are some of our favorites:
            </h2>
            <ul className="rounded shadow-md bg-blue-50 text-red-700 text-2xl p-6 m-6">
                <li>
                    <a
                        href="https://github.com/Khan/tota11y"
                        className="font-bold"
                    >
                        - An accessibility visualization toolkit
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/a11yproject/a11yproject.com"
                        className="font-bold"
                    >
                        - The A11Y Project
                    </a>{' '}
                    is a community-driven effort to make digital accessibility
                    easier.
                </li>
                <li>
                    <a
                        href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y"
                        className="font-bold"
                    >
                        - Static AST checker
                    </a>{' '}
                    for a11y rules on JSX elements.
                </li>
            </ul>
        </>
    )
}

export default Home
