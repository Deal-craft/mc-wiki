import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CommentBox from './CommentBox.vue'
import HubArticles from './HubArticles.vue'
import BackgroundFX from './BackgroundFX.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(BackgroundFX),
      'doc-after': () => h(CommentBox)
    })
  },
  enhanceApp({ app }) {
    app.component('HubArticles', HubArticles)
  }
}
