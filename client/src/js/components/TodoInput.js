import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTodo} from '../actions/todo_actions';
import alertify from "alertify.js";

class TodoInput extends Component {
    state = {value: ''};

    disabled = () => this.props.todos.length >= 10;

    changeText = evt => this.setState({value: evt.target.value});

    handleAdd = () => {
        if (this.state.value.trim() === '') {
            alertify.alert('First you need to enter the text of the task!');
            return;
        }
        this.props.addTodo(this.state.value);
        this.setState({value: ''})
    };

    handlePress = (e) => {
        if (e.key === 'Enter') {
            this.handleAdd();
        }
    };

    render() {
        return (
            <div>
                <div className="input-group input-group-lg">

                <div className="input-group-prepend">
                    <span className="input-group-text" id="input-group-sizing-lg">Add new To-Do </span>
                </div>

                    <input id="title"
                           type="text"
                           className="form-control"
                           placeholder="Enter todo title"
                           aria-label="Enter todo title"
                           aria-describedby="basic-addon2"
                           value={this.state.value}
                           disabled={this.disabled()}
                           onKeyPress={this.handlePress}
                           onChange={this.changeText}/>

<div className='input-group-append'>

    <button type="button" 
    className='btn btn-dark'  
    disabled={this.disabled()}
    onClick={this.handleAdd}>
    Add new item
    </button>

    <Link className='btn btn-outline-dark' role='button' to="/">Back to To-Do List</Link>
  </div>

                </div>
                
            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {addTodo},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
