'use strict';
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var App = require('./components/app');
var Homepage = require('./components/homepage');
var AuthorPage = require('./components/authors/authorPage');
var AboutPage = require('./components/about/aboutPage');
var NotFoundPage = require('./components/notFoundPage');
var ManageAuthorPage = require('./components/authors/manageAuthorPage');

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Homepage}/>
        <Route name="authors" handler={AuthorPage}/>
        <Route name="editauthor" path="authors/:authorid" handler={ManageAuthorPage}/>
        <Route name="about" handler={AboutPage}/>
        <Route name="addAuthor" handler={ManageAuthorPage}/>
        <NotFoundRoute handler={NotFoundPage} />
        <Redirect from="about-us" to="about"/>
        <Redirect from="about/*" to="about"/>
    </Route>
);

module.exports = routes;