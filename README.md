# Design, Automation and Compilation (DAC) Lab website

A fast, dependency-free academic lab website for Dr. Md Rubel Ahmed's research group at Louisiana Tech University. It is designed for GitHub Pages and uses plain HTML, CSS, and JavaScript—there is no build step.

## Local preview

You can open `index.html` directly in a browser. For the most accurate preview, start a local server from the repository root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Updating content

### Add a news item

Edit `data/news.js`. Add the newest entry at the beginning:

```js
{
  date: 'Mar 2026',
  machineDate: '2026-03',
  status: 'Paper accepted',
  venue: 'Verified conference name'
},
```

Keep announcements factual and verify them against an authoritative source before publishing.

### Add a publication

Edit `data/publications.js` and copy an existing object. Supported `type` values are `journal`, `conference`, and `workshop`.

```js
{
  title: 'Verified paper title',
  authors: 'Verified author list',
  venue: 'Verified venue and pages',
  year: 2026,
  type: 'conference',
  links: [{ label: 'DOI', url: 'https://doi.org/...' }]
},
```

Omit `links` that do not exist. Never add a guessed DOI, status, award, or venue.

### Add a lab member

Edit `people.html`. Copy the PI card or replace an empty-state card with verified information. A member card can contain a name, role, research interests, approved photograph, personal website, and email. Do not display empty social links.

### Add images

Place approved, web-optimized images in:

- `assets/images/professor/` for the PI headshot
- `assets/images/people/` for member photos
- `assets/images/research/` for diagrams
- `assets/images/news/` for announcement imagery

Use lowercase descriptive filenames, preferably WebP or optimized JPEG. Add meaningful `alt` text for informative images and `alt=""` for decorative images. When an approved PI photo is available, replace the `.portrait-placeholder` element in `people.html` with an `<img>` pointing to `assets/images/professor/rubel-ahmed.jpg`.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for the published URL to appear.
7. Open the generated URL and verify navigation, mobile layout, and external links.

All asset and page links are relative, so the site works both at `USERNAME.github.io` and `USERNAME.github.io/REPOSITORY/`.

## Optional custom domain

Add a custom domain later in the repository's Pages settings after DNS is configured. Do not add a `CNAME` file until the domain has been approved and is ready to use.

## Site structure

```text
index.html             Homepage
research.html          Research themes
publications.html      Filterable verified publication list
people.html            PI and member structure
outreach.html          Mentoring and outreach structure
contact.html           Contact and prospective-student guidance
css/styles.css         Centralized visual system and responsive rules
js/main.js             Mobile navigation and small content interactions
data/news.js           News content
data/publications.js   Publication content
assets/                Approved images and icons
```

## Content policy

Accuracy is more important than completeness. Verify member names, funding, publications, awards, projects, and openings before adding them. Use a clear “updates coming soon” state when information is unavailable.
