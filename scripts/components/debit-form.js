class DebitForm extends DOM.Component {

  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }

  render() {
    return {
      tag: "span",
      value: "+",
      styles: {
        display: "none", // try onMouseEnter
        cursor: "pointer",
        padding: "0 5px"
      },
      onClick: this.state.showForm ? null : function (e) {
        console.log("debit onClick")
        this.props.handleClick(e)
        this.setState({
          showForm: true
        })
      },
      children: this.state.showForm ? [{
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
      }] : null
    }
  }
}

    // ["name", exists, isString],
    // ["amount", exists, isNumber],
    // ["category", exists, isNumber],
    // ["date", exists, isString],
    // ["recurring", conditonallyValidate(null, isOneOf(RECURRING_INTERVALS))]