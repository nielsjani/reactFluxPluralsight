'use strict';

var React = require('react');
var Router = require('react-router');
var Toastr = require('toastr');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function () {
        var authorid = this.props.params.authorid;
        if (authorid) {
            this.setState({author: AuthorStore.getAuthorById(authorid)});
        }
    },
    setAuthorState: function (event) {
        this.state.dirty = true;
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    formValid: function () {
        var valid = true;
        this.state.errors = {};
        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name length >3';
            valid = false;
        }
        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name length >3';
            valid = false;
        }
        this.setState({errors: this.state.errors});
        return valid;
    },
    saveAuthor: function (event) {
        event.preventDefault();
        if (this.formValid()) {
            this.setState({dirty: false});
            if (this.state.author.id) {
                AuthorActions.updateAuthor(this.state.author);
            } else {
                AuthorActions.createAuthor(this.state.author);
            }
            Toastr.success('Author saved');
            this.transitionTo('authors');
        }
    },
    render: function () {
        return (
            <div>
                <h1>Manage Author</h1>
                <AuthorForm author={this.state.author}
                            onChange={this.setAuthorState}
                            onSave={this.saveAuthor}
                            errors={this.state.errors}
                />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;