import React from 'react';

class Menu extends React.Component {
    render() {
        console.log(this.props.links);
        let linksMarkup = this.props.links.map((link, index) => {
            return (
                <li className="active"><a href={link.link}>{link.label}</a></li>
            )
        });
        return (
            <nav className="navbar">
                <ul >
                    {linksMarkup}
                </ul>
            </nav>
        );
    }
}

export default Menu;