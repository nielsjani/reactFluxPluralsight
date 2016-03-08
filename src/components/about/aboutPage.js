'use strict';

var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            if (!confirm('Are you sure you want to read this page?')) {
                //transition.about();
            } else {
                callback();
            }
        },
        willTransitionFrom: function (transition, component) {
            if (!confirm('Are you sure you want to leave this page?')) {
                transition.about();
            }
        }
    },
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>We are using the following:</p>
                <ul>
                    <li>Teddybears</li>
                    <li>Lollypops</li>
                    <li>Unicorns</li>
                    <li>Rainbows</li>
                </ul>
            </div>
        );
    }
});

module.exports = About;