# Design plan: Lab Name

Lab Name is a standalone lab on kylepace.dev (kp-design's `LabLayout`). This is the plan for
its own look. The tokens live in `src/styles/theme.css`. Write this before styling anything,
and take the ideas from the subject's own world, not from other websites.

## Subject and audience

What is it, and who is it for? One or two sentences.

## Concept

The real-world thing the page borrows its look from (the skill tree is a character sheet on
graph paper; the transit map is a transit line). What does it look like in dark mode?

## The one bold element

The single place this lab spends its boldness. Everything else stays quiet.

## Color

4 to 6 named colors, light and dark. Every text pair is at least 4.5:1 in both modes; borders
and icons at least 3:1.

| Name | Light | Dark | Use |
| --- | --- | --- | --- |
| | | | Page |
| | | | Text |
| | | | Secondary text |
| | | | The bold color |

## Type

Atkinson Hyperlegible Next for everything (Mono only for code). Sizes and weights, and where
the biggest type goes.

## Layout

A sketch of the main view on a phone and on a wide screen. The app comes first: one line of
title, then the thing itself.

```
phone                      wide
+-----------------+        +---------------------------------+
| < kylepace.dev  |        | < kylepace.dev            About |
| Title           |        | Title                           |
| [ the app ]     |        | [ the app, using the width ]    |
+-----------------+        +---------------------------------+
```

## Checked against the generated defaults

Go through the list in the principles ("Look and feel") and note what you changed: no big
headline over a muted sentence with a pill button, no grid of identical cards, no small labels
above headings, no decorative dots, no monospace labels, no one-radius-everywhere.
