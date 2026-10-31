import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CommentBox from './CommentBox.vue'
import HubArticles from './HubArticles.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(CommentBox)
    })
  },
  enhanceApp({ app }) {
    app.component('HubArticles', HubArticles)
  }
}
