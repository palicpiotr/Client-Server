import React, {Component} from "react"
import {Link} from "react-router-dom";
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load, removeAll, search} from '../actions/todo_actions';
import alertify from 'alertify.js';

class TodoList extends Component {
    state = {query: ''};

    changeText = evt => {
        this.setState({query: evt.target.value}, () => {
            const query = this.state.query;
            if (query) {
                this.props.search(query);
            } else {
                this.props.load();
            }
        });
    };

    handleRemove = () => {
        alertify
            .okBtn("Remove it")
            .cancelBtn("I changed my mind")
            .confirm("Are you sure you want to delete all tasks?", () => {
                this.props.removeAll();
            });
    };

    componentDidMount = () => {
        this.props.load();
    };

    render() {
        let list = !this.props.isLoading && !this.props.isError ? (
            <ul id="todos" className='list-group mb-3'>
                {
                    this.props.todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo}/>)
                    )
                }
            </ul>
        ) : this.props.isError ? (
            <div className="alert alert-danger" role="alert">
                Todos not loaded. Try again.
            </div>
        ) : (
            <div>
                <p>Loading...</p>
            </div>
        );
        return (
            <div>
                <div className="mb-3">
                    <input id="searchInput"
                           type="text"
                           className="form-control"
                           placeholder="Search todo..."
                           aria-label="Search todo..."
                           aria-describedby="basic-addon2"
                           value={this.state.query}
                           disabled={this.props.isLoading}
                           onChange={this.changeText}/>
                </div>
                {list}
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Link className='btn btn-dark'
                          role='button'
                          to="/add"
                          disabled={this.props.isLoading}>
                        Add new todo
                    </Link>
                    <button
                        type="button"
                        className='btn btn-outline-danger'
                        disabled={this.props.todos.length === 0 || this.props.isLoading}
                        onClick={this.handleRemove}>Remove all
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading,
    isError: state.isError
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, removeAll, search},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
