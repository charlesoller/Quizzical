import React, { useState, useEffect } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import he from 'he'
import { nanoid } from 'nanoid'
import Question from './Question.jsx'
import Welcome from './Welcome.jsx'
import Header from './Header.jsx'
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion';

export default function Trivia() {
    const [triviaItems, setTriviaItems] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [numCorrect, setNumCorrect] = useState(0);
    const [toggleScreen, setToggleScreen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [confetti, setConfetti] = useState(false);
    const [fetchURL, setFetchURL] = useState('https://opentdb.com/api.php?amount=5&type=multiple');
    const { width, height } = useWindowSize();

    // console.log(fetchURL)
    // console.log(toggleScreen)

    useEffect(() => {
        if(toggleScreen === false){
            fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                setTriviaItems(data.results.map(item => {
                    return {
                        id: nanoid(),
                        question: he.decode(item.question),
                        answers: generateAnswers(item),
                        correctAnswer: he.decode(item.correct_answer)
                    }
                }))
            })
            .catch((err) => {
                console.log(err.message);
             });
        }
    }, [fetchURL])

    //Sets selected answers based off of triviaItems answers with isSelected = true
    useEffect(() => {
        let answersArr = triviaItems.map(item => {
            return item.answers;
        })
        setSelectedAnswers(answersArr.flat().filter(answer => answer.isSelected))
    }, [triviaItems])

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

    function changeCategory(){
        setFetchURL(prevURL => prevURL.concat(`&category=${event.target.value}`));
    }

    function changeDifficulty(){
        setFetchURL(prevURL => prevURL.concat(`&difficulty=${event.target.value}`));
    }

    function decodeArr(arr){
        return arr.map(ele => he.decode(ele))
    }

    function makeAnswerObjects(arr){
        return arr.map(answer => {
            return {
                id: nanoid(),
                answer: answer,
                isSelected: false
            }
        })
    }

    function generateCorrectAnswers(){
        return triviaItems.map(item => item.correctAnswer);
    }

    function generateSelectedAnswers(){
        return selectedAnswers.map(answer => answer.answer);
    }

    function generateAnswers(item){
        const randIndex = Math.floor(Math.random() * 4)
        let arr = [...decodeArr(item.incorrect_answers)];
        arr.splice(randIndex, 0, he.decode(item.correct_answer));
        return makeAnswerObjects(arr)
    }

    //deselects the target within triviaItems
    function deselectAnswer(target){
        setTriviaItems(prevItems => {
            return prevItems.map(item => {
                let answers = item.answers;
                answers = answers.map(answer => {
                    if(answer === target){
                        return {
                            ...answer,
                            isSelected: false
                        }
                    } else {
                        return answer;
                    }
                })
                return {...item, answers: answers};
            })
        })
    }

    function selectAnswer(){
        if (submitted === false){
            let target = event.target.id;
            setTriviaItems(prevItems => {
                //---------------- This maps through the initial state array, then separately through the array of objects held at triviaItems.answers,
                //---------------- if the id property of this matches the event.target.id, then it switches the isSelected property, and return rest as is
                return prevItems.map(item => {
                    let answers = item.answers;
                    answers = answers.map(answer => {
                        if(answer.id === target) {
                            answers.forEach(ele => {
                            //deselects if an answer is already selected
                                if(ele.isSelected === true && ele.id != target){
                                    deselectAnswer(ele);
                                }
                            })
                            return {
                                ...answer,
                                isSelected: !answer.isSelected
                            }
                        } else {
                            return answer;
                        }
                    })
                    return {...item, answers: answers}
                })
            })
        }
    }

    //return the amount of correct answers
    function checkAnswers(){
        const correct = generateCorrectAnswers();
        const selected = generateSelectedAnswers();
        const amtCorrect = selected.filter(answer => correct.includes(answer)).length;
        setSubmitted(true);
        setNumCorrect(amtCorrect);
        if (amtCorrect === 5) setConfetti(true);
    }

    function startGame(){
        setToggleScreen(prevScreen => !prevScreen)
    }

    function resetGame(){
        setSubmitted(false);
        setNumCorrect(0);
        setTriviaItems([]);
        setFetchURL('https://opentdb.com/api.php?amount=5&type=multiple');
        setConfetti(false);
        setToggleScreen(prevScreen => !prevScreen)
    }

    function goHome(){
        toggleScreen === true ? setToggleScreen(prevScreen => !prevScreen) : window.location.reload();
    }

    const triviaItemsElements = triviaItems.map(item => {
        return (
            <Question
                key={nanoid()}
                question={item.question}
                answers={item.answers}
                correctAnswer={item.correctAnswer}
                selectAnswer={selectAnswer}
                submitted={submitted}
                darkMode={darkMode}
            />
        )
    })

    return (
        toggleScreen ?
        (
            <div className={darkMode ? "trivia--dark trivia" : "trivia"}>
                {confetti && <Confetti className='confetti' />}
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} goHome={goHome}/>
                <div className="question__container">
                    {triviaItemsElements}
                </div>
                <div className="footer__container">
                    {submitted && <p className={darkMode ? 'footer__text footer__text--dark' : 'footer__text'}>You scored {numCorrect} / 5 answers correct.</p>}
                    <button className={darkMode ? 'button button--alt button--alt--dark button--submit' : 'button button--alt button--submit'} onClick={submitted ? resetGame : checkAnswers}>
                        {submitted ? 'New Game' : 'Check Answers'}
                        {confetti && <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600}/>}
                    </button>
                </div>
            </div>
        )
        :
        <div>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} goHome={goHome}/>
            <Welcome darkMode={darkMode} startGame={startGame} changeCategory={changeCategory} changeDifficulty={changeDifficulty}/>
        </div>
    )
}
