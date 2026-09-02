import DefaultTheme from 'vitepress/theme'
import OrderStateStepper from './components/OrderStateStepper.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Globally available so it can be used directly in .md pages
    app.component('OrderStateStepper', OrderStateStepper)
  }
}
