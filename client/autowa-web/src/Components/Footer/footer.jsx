import React from 'react'
import "./Footer.css";

const Footer = () => {
const year = new Date();
// Return JSX for Footer component
    return (
        <footer className="copy">Copyright &copy; {year.getFullYear()}</footer>
    )

}

export default Footer// Export Footer component for use in other parts of the application