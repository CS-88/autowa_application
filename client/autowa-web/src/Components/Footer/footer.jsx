import React from 'react'
import "./Footer.css";

const Footer = () => {
const year = new Date();

    return (
        <footer className="copy">Copyright &copy; {year.getFullYear()}</footer>
    )

}

export default Footer