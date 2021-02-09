import React from 'react'

function Home() {
    return (
        <div>
            <h1>Welcome to a11yTweet!</h1>
            <p>
                We've collected a list of Github repos with 'a11y' in the name.
                You can retweet them directly from our list page, or sign up to
                save your own page of links.
            </p>
            <h2>Here are some of our favorites:</h2>
            <p>
                <a href="https://github.com/Khan/tota11y">
                    An accessibility visualization toolkit
                </a>
            </p>
            <p>
                <a href="https://github.com/a11yproject/a11yproject.com">
                    The A11Y Project
                </a>
                is a community-driven effort to make digital accessibility
                easier.
            </p>
            <p>
                <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y">
                    Static AST checker
                </a>
                for a11y rules on JSX elements.
            </p>
        </div>
    )
}

export default Home
