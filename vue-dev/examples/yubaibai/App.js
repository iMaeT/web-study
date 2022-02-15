import HelloWorld from './HelloWorld.js'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  template: `<div>
    我是{{ name }}组件
    <hello-world ></hello-world>
  </div>`,
  data() {
    return {
      name: 'App'
    }
  }
}
