# Lab Name

Lab description.

Live at [kylepace.dev/lab-slug/](https://kylepace.dev/lab-slug/), one of the labs on [kylepace.dev](https://kylepace.dev/labs/).

<!-- template:start -->
## Starting a new lab from this template

This repo is the starting point for every new lab on kylepace.dev. It's a working lab with placeholders: an Astro site on its own Cloudflare Worker, mounted at `kylepace.dev/<slug>/`, using kp-design's `LabLayout`, analytics, the standard About page, share cards, the principles and the page check.

1. **Make the repo.** On GitHub, use [Use this template → Create a new repository](https://github.com/new?template_name=lab-template&template_owner=kyle-pace) under `kyle-pace`, named after the lab.
2. **Set it up.** Clone it, then:
   ```sh
   npm install
   npm run new-lab -- tide-clock "Tide clock" "Puget Sound tides as a clock face."
   ```
   That puts the slug, name and description everywhere, moves the page to `src/pages/tide-clock/`, removes these setup notes and deletes the setup script.
3. **Give it its own look.** Write `design/PLAN.md`, then the colors in `src/styles/theme.css`. Build the app in `src/pages/<slug>/index.astro` and fill in the About page.
4. **Share cards.** Restyle `design/og*.html` in the lab's look and run `npm run og`.
5. **Check and push.** `npm run build && npm run check`, look at `.check/`, commit, push.
6. **Deploy.** In Cloudflare, [Workers & Pages → Create → Import a repository](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create), pick the repo, build command `npm run build`, deploy command `npx wrangler deploy`. The routes in `wrangler.jsonc` claim the path on kylepace.dev.
7. **List it on kylepace.dev.** Follow the `add-lab` skill in [kyle-pace/kylepace.dev](https://github.com/kyle-pace/kylepace.dev): an entry in `src/data/projects.ts`, a card screenshot once it's live, and a ship log line.

Changes to this template only reach labs made after them. To change every lab at once, change [kp-design](https://github.com/kyle-pace/kp-design) or the [principles](https://github.com/kyle-pace/principles).
<!-- template:end -->

## Working on it

```sh
npm install
npm run dev      # local site at localhost:4321/lab-slug/
npm run build    # must pass before pushing
npm run check    # accessibility, sideways scrolling, JavaScript weight, screenshots
npm run og       # re-render the share cards from design/og*.html
```

`main` deploys to Cloudflare automatically. How it's put together, and the rules it follows, are in [AGENTS.md](AGENTS.md).
