import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CommentBox from './CommentBox.vue'
import HubArticles from './HubArticles.vue'
import BackgroundFX from './BackgroundFX.vue'
import ArticleMetaBar from './ArticleMetaBar.vue'
import RelatedArticles from './RelatedArticles.vue'
import SmartSearch from './SmartSearch.vue'
import NavEnhancer from './NavEnhancer.vue'
import SiteFooter from './SiteFooter.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => [h(BackgroundFX), h(NavEnhancer), h(SmartSearch)],
      'doc-before': () => h(ArticleMetaBar),
      'doc-after': () => [h(RelatedArticles), h(CommentBox)],
      'layout-bottom': () => h(SiteFooter)
    })
  },
  enhanceApp({ app }) {
    app.component('HubArticles', HubArticles)
    app.component('SmartSearch', SmartSearch)
  }
}
