class Debit extends DOM.Component {

  init() {
    this.state = {
      name: "haha",
      color: "orange",
    }
  }

  render() {
    return {
      tag: "div",
      styles: {
        fontSize: "18px",
        // backgroundColor: "green",
        color: this.state.color,
        cursor: "pointer",
      },
      onClick: function (e) {
        this.props.handleClick(e)
        console.log(this.state.color == "orange")
        this.setState({
          name: "hehe",
          color: this.state.color == "orange" ? "green" : "orange"
        })
      },
      children: [{
        tag: "span",
        value: this.props.item.name + " " + this.state.name
      }, {
        tag: "strong",
        children: [{
          tag: "span",
          value: this.props.item.amount
        }]
      }]
    }
  }
}