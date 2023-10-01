import React from "react";

export default function Header(props){
    return (
        <nav className={props.darkMode ? "header header--dark": "header"}>
        <h3 className="header__text" onClick={props.goHome}>Quizzical!</h3>

        <div className="toggle">
            <p className="toggle__label toggle--light">Light</p>
            <div className="toggle__slider" onClick={props.toggleDarkMode}>
                <div className="toggle__slider__circle"></div>
            </div>
            <p className="toggle__label toggle--dark">Dark</p>
        </div>
    </nav>
    )
}
