import React from "react";
//import CSSModules from 'react-css-modules';
import classNames from "classnames";
import styles from "./todoItem.less";

console.log(styles);

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

export default class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editText: props.todo.title
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value});
    }
  }

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    return (
      <li className={styles["todo-item"] + " " +
      (this.props.todo.completed ? styles.completed: "") + " " +
      (this.props.editing ? styles.editing: "") + " "
      }>
        <div className={styles.view}>
          <input
            className={styles.toggle}
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <input
            className={styles["toggle-smaller"]}
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className={styles.destroy} onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className={styles.edit}
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
