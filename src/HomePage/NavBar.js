import HomePage from "./HomePage";
import Post from "../AnotherPages/Posts";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import ErrorPage from "../AnotherPages/ErrorPage"
import PostDetail from "../AnotherPages/PostDetail";
import login from "../AnotherPages/Login";

function Navbar() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/posts"} className="nav-link">
                                        Posts
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/posts" component={Post} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/"><Redirect to="/home" /></Route>
                    <Route exact path="/posts/:postId" component={PostDetail} />
                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default Navbar;