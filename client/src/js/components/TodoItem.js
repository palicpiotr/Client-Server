import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changePriority} from '../actions/todo_actions';
import {Link} from 'react-router-dom'

class TodoItem extends Component {
    handleChange = () => this.props.changePriority(this.props.todo.id);

    isPrioritized = () => this.props.todo.done;

    render() {
        return (
            <li className={"list-group-item mb-2 " + (this.isPrioritized() ? 'prioritized-task' : '')}>
                <div className='container'>
                    <div className="row">
                        <div className="col-10">
                            <h4 className={this.isPrioritized() ? 'prioritized-task' : ''}>
                                {this.props.todo.text}
                            </h4>
                        </div>
                        <div>
                            <button className='btn btn-outline-danger' onClick={this.handleChange}>Make Priority</button>
                        </div>                      
                    </div>
                </div>
            </li>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {changePriority},
    dispatch
);

export default connect(null, mapDispatchToProps)(TodoItem);
