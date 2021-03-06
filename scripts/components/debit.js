class Debit extends DOM.Component {

  constructor(props) {
    super(props)
    this.state = {
      showForm: false
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
      onClick: this.state.showForm ? null : function (e) {
        console.log("debit onClick")
        this.props.handleClick(e)
        this.setState({
          showForm: true
        })
      },
      children: [{
        tag: "span",
        value: this.props.item.name
      }, {
        tag: "strong",
        children: [{
          tag: "span",
          value: this.props.item.amount
        }]
      }].concat(this.state.showForm ? [{
        component: Form,
        fields: [{
          name: "name",
          label: "Name",
          // tag: "input"
          type: "text"
        }, {
          name: "amount",
          label: "Amount",
          type: "number"
        }, {
          name: "recurring",
          label: "Recurring",
          type: "checkbox"
        }],
        onSubmit: (data)=> {
          data.category = this.props.category.id
          data.date = this.props.date
          console.log("submit that mess", data)
          
        }}, {
          tag: "button",
          value: "Cancel",
          onClick: ()=> {
            this.setState({
              showForm: false
            })
          }
      }] : null)
    }
  }
}

    // ["name", exists, isString],
    // ["amount", exists, isNumber],
    // ["category", exists, isNumber],
    // ["date", exists, isString],
    // ["recurring", conditonallyValidate(null, isOneOf(RECURRING_INTERVALS))]