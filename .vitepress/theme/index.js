import DefaultTheme from 'vitepress/theme';
import Comment from "./Comment.vue";
  
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component("Comment", Comment);
  }
};