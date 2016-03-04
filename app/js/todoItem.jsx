import React from "react";
import classNames from "classnames";
import todoItemLess from "./todoItem.less";
var Radium = require('radium');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

let styles = {
  toggle: {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    position: 'absolute',
    top: '0',
    bottom: '0',
    margin: '0',
    border: 'none',
    appearance: 'none'
  },
  toggleUnchecked: {
    position: 'absolute',
    content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>\')'
  },
  toggleChecked: {
    position: 'absolute',
    content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>\')'
  }
};

let TodoItem = React.createClass({
  handleSubmit: function (event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  },

  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value});
    }
  },

  getInitialState: function () {
    return {editText: this.props.todo.title};
  },

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  },

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  },

  render: function () {
    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing,
        "todo-item": true
      })}>
        <div className="view">
          <input
            className="toggle"
            style={[styles.toggle]}
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <span style={!this.props.todo.completed ? [styles.toggleUnchecked]: []}
            onClick={this.props.onToggle}
          ></span>
          <span style={this.props.todo.completed ? [styles.toggleChecked]: []}
            onClick={this.props.onToggle}
          ></span>

          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
});

export default Radium(TodoItem);
