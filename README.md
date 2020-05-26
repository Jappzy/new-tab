# New Tab or Home page for web browsers
- Todo list, common links, gsuite links, ionic components
- Only plain web technologies - a single file for html, css, & js
- Responsive with cool effects

## Todo List

The Todo List has 3 types of todo items: Today, Short Term, & Long Term. The todos are saved in **LocalStorage** and can be re-ordered & removed.

## Links

The Links are objects with **Title**, **URL**, & **Icon** properties. These are displayed on the right side of the page and help navigate to pages quickly.

#### Frequent

This section of links is for commonly used websites like the Firebase Console and Github. I downloaded & manually modified SVG images to display & color the icons.

#### GSuite

GMail, Google Calendar, Google Drive, & YouTube are contained in a smaller grid-like box. I enjoy the default google menu-popover with all of the google apps, and this is a way to keep the G-suite icons contained while also fitting well with the other icon links.

### Ionic Components

When building Ionic Apps, I often need to review the documentation for a particular component being used. The icon & documentation links for most Ionic components can be generated from a base-url and the name of the component. This made it simple to scrape Ionic for all of the images & links for the components that I specified. I implemented a string validator to handle edge cases for components where the component name (datetime) does not exactly match the icon name (datetime-picker).
