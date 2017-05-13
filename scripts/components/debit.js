function debit(item) {
  return {
    tag: "div",
    styles: {
      fontSize: "25px",
      backgroundColor: "green",
      color: "red"
    },
    state: {
      
    },
    onClick: function (e) {
      console.log("onClick yo", e)
      this.unMount()
    },
    unMount: function () {
      this.el.removeEventListener("click", this.onClick)
    },
    children: [{
      tag: "span",
      value: item.name
    }, {
      tag: "strong",
      children: [{
        tag: "span",
        value: item.amount
      }]
    }]
  }
}