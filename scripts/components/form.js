class Form extends DOM.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: props.fields
    }
  }

  onSubmit() {
    console.log("onSubmit", this.props.onSubmit)
    this.props.onSubmit && this.props.onSubmit(this.state.fields)
  }

  render() {
    return {
      tag: "form",
      children: this.props.fields.map((field)=> {
        return {
          tag: "label",
          styles: {
            display: "block",
            margin: "5px 0",
          },
          value: field.label,
          for: field.name,
          children: [{
            tag: "input",
            styles: {
              marginLeft: "5px"
            },
            type: field.type,
            id: field.name,
          }]
        }
      }).concat([
        {
          tag: "button",
          type: "submit",
          value: "Save",
          onClick: (e)=> {
            e.preventDefault()
            e.stopPropagation()
            console.log("clicking form button")
            this.onSubmit()
          }
        }
      ])
    }
  }
}