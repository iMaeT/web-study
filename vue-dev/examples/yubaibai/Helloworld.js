export default {
  name: 'HelloWorld',
  template: `<div>
    I am HelloWorld
  </div>`,
  data() {
    return {
      name: 'HelloWorld 子组件',
      state: {
        count: 0
      }
    }
  },
  methods: {
    count() {
      this.state.count++
    }
  }
}
