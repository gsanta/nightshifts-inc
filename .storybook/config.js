import { configure } from '@storybook/react';
const req = require.context('../build/client', true, /.stories.jsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);