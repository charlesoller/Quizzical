import React from 'react'

export default function Welcome(props){
    return (
        <div className={props.darkMode ? 'welcome--dark welcome' : 'welcome'}>
            <div className='welcome__container'>
                <h1 className={props.darkMode ? 'welcome__title welcome__title--dark' : 'welcome__title'}>Quizzical!</h1>
                <p className='welcome__subtext'>Score 5/5 for a surprise!</p>
                <div className="dropdown__container">
                    <label className="dropdown__label">
                        <select name='category' onChange={props.changeCategory} className={props.darkMode ? 'dropdown dropdown--category dropdown--dark' : 'dropdown dropdown--category'}>
                            <option value="any">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>
                    </label>
                    <label className="dropdown__label">
                        <select name="trivia_difficulty" onChange={props.changeDifficulty} className={props.darkMode ? 'dropdown dropdown--difficulty dropdown--dark' : 'dropdown dropdown--difficulty'}>
                            <option value="any">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>

                <button className={props.darkMode ? 'button button--alt button--alt--dark welcome__button' : 'button button--alt welcome__button'} onClick={props.startGame}>
                    Start Quiz
                </button>
            </div>
        </div>
    )
}
