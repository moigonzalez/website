# Progressive Web App Awards  [![Build Status](https://travis-ci.org/RobertJGabriel/Website.svg?branch=master)](https://travis-ci.org/RobertJGabriel/Website) <span class="badge-patreon"><a href="https://www.patreon.com/robertjgabriel" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
> Showcase the world of progressive Web App Awards and a panel of judges will select the best in class for different categories.


## Contributing/Submitting

We’re happy to feature other nice-looking pwasin the list. They should:

- Must be fun.
- Must be easy to run locally.
- Must have a guide to set up.
- Have a service worker (making sure that the `start_url` functions offline).
- Meet the minium PWA setup

## How to Suggest an App

- Fork this repository.
- Create a branch, name it after your app.
- Add an icon (preferably SVG) to the `apps` folder.
- Add an entry to the [apps/index.html](apps/index.html) file:

```html
		<a class="list__item app js-app" href="URL" data-app="ID" data-tags="TAGS">
			<div class="app__wrapper">
				<h2 class="app__title">
				TITLE
				</h2>
			</div>
			<style>
				[data-app='ID'] {
				color: COLOR;
				background: currentColor url(apps/ID.svg) 50% 50% / 50% auto no-repeat;
				}
			</style>
		</a>
```

- Test it locally by opening the [apps/index.html](apps/index.html) file in your browser.
- Commit all changes to your app branch and create a pull request.

## Development

- Fork this repository.
- Create a branch, name it after the feature you’re implementing.
- Clone it locally and start making changes.
- Test it locally by opening the [`apps/index.html`](apps/index.html) file in your browser.
- Commit all changes to your feature branch and create a pull request.

For full-scaled development and testing you can use the build system:

- `npm run server` for the dev server and light build.
- `npm run build` for the full build with caching.
