# List of Twitch Bots to showcase


## Contributing

We’re happy to feature other nice-looking weird twitch  in the list. They should:

- Must be fun.
- Must be easy to run locally.
- Must have a guide to set up.
-
- Have a service worker (making sure that the `start_url` functions offline).

## How to Suggest an App

- Fork this repository.
- Create a branch, name it after your app.
- Add an icon (preferably SVG) to the `apps` folder.
- Add an entry to the [apps/index.html](apps/index.html) file:

```html
<a class="list__item app js-app"
		href="URL"
		data-app="ID"
		data-tags="TAGS">
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
