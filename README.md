# Christopher Hello - Digital Resume

A simple, sleek digital resume website with minimal animations and a playful landing page interaction.

## Features

- **Interactive Landing Page**: Connect-the-dots game that users must complete to enter the site
- **Hello Page**: Introduction with sections for about, currently, contact, and more
- **Work & Play Pages**: Placeholder pages for future content
- **Responsive Design**: Mobile-first approach that adapts beautifully to desktop
- **Separate Pages**: Each page is its own HTML file with real navigation
- **Clean URLs**: URLs like `/hello`, `/work`, `/play` work via GitHub Pages 404 redirect

## Design

- **Typography**: Inter font family with -8% letter spacing
- **Colors**: 
  - Red: `#BF1932`
  - White: `#F5F5F5`
  - Black: `#000000`

## Local Development

1. Clone this repository
2. Open `index.html` in a web browser
3. For better routing support, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main`) and folder (`/root`)
4. Your site will be available at `https://[username].github.io/[repository-name]/`

**Note**: For GitHub Pages clean URLs to work properly, a `404.html` file is included that redirects clean URLs (like `/hello`) to their corresponding HTML files (like `hello.html`).

### Other Hosting Options

This is a static site and can be hosted on:
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting service

## File Structure

```
helloworld/
├── index.html          # Landing page (connect the dots)
├── hello.html          # Hello page
├── work.html           # Work page
├── play.html           # Play page
├── styles.css          # All styling
├── landing.js          # Connect-the-dots interaction
├── hello.js            # Hello page menu functionality
├── work.js             # Work page menu functionality
├── play.js             # Play page menu functionality
├── 404.html            # GitHub Pages routing fallback
└── README.md           # This file
```

## Customization

- Update the email address in `hello.html` (search for `your.email@example.com`)
- Modify content in the respective HTML files (`hello.html`, `work.html`, `play.html`)
- Adjust colors in `styles.css` using CSS variables in `:root`

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ support.

