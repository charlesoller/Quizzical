import React, {useState} from 'react'
import { nanoid } from 'nanoid'
import he from 'he'

export default function Question(props){
    const answersButtons = props.answers.map(item => {
        return (
            <button
                key={nanoid()}
                id={item.id}
                className={props.darkMode ? "button--dark button" : "button"}
                onClick={props.selectAnswer}
                style={
                    {
                        background: props.darkMode ?
                        //Dark Mode
                        props.submitted ?
                        item.answer === props.correctAnswer ?
                        "#3e6842" : item.isSelected ?
                        "#572424" : "#2B283A"
                        : item.isSelected ? "#383A64" : "#2B283A"

                        //Light Mode
                        : props.submitted ?
                        item.answer === props.correctAnswer ?
                        "#94D7A2" : item.isSelected ?
                        "#F8BCBC" : "#F5F7FB"
                        : item.isSelected ? "#D6DBF5" : "#F5F7FB",

                        border: item.isSelected ? 'none'
                        : props.submitted && item.answer === props.correctAnswer && 'none',

                        cursor: !props.submitted && 'pointer'
                    }
                }
            >
                    {item.answer}
            </button>
        )
    })

    return (
        <div className="question">
            <h1 className={props.darkMode ? 'question__text question__text--dark' : 'question__text'}>{props.question}</h1>
            <div className={props.darkMode ? "answers__container answers__container--dark" : "answers__container"}>
                {answersButtons}
            </div>
        </div>
    )


}
