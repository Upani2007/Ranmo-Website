<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# The menu sheet and `CATEGORY_CONFIG` must change together

Live menu content comes from a published Google Sheet, not from this repo
(`src/data/menu-source.ts`). The sheet's **Category** column is a join key:
`CATEGORY_CONFIG` is keyed by the exact category string, and that mapping is
what puts a category under a tab.

**Renaming a category in the sheet without shipping the matching
`CATEGORY_CONFIG` rename silently breaks tab grouping in production**, and vice
versa. There is no error — an unmatched category falls through to
`FALLBACK_TAB_GROUP` ("Set Menu & Sides"), so items quietly appear under the
wrong tab with only a `console.warn` on the server. The sheet is read live with
`revalidate: 0`, so a sheet-side rename hits production on the very next page
load, whether or not the code half has been deployed.

This has already happened once: three categories were renamed in the sheet
while deployment was blocked, and Beverages and Short Eats emptied into
"Set Menu & Sides" on the live site until the sheet was reverted.

So:

- Category renames are a **two-sided change**. Land the code first, confirm the
  deploy is live, then rename in the sheet — never the other way round, and
  never the sheet alone while a deploy is blocked.
- Item names, descriptions and prices are **not** join keys. Those are free to
  change in the sheet at any time.
- Check what is actually deployed before touching the Category column. The
  deployed `CATEGORY_CONFIG`, not the working tree, is what production uses.

`SPELLING_FIXES` (same file) is the guard for the common case: restaurant staff
edit this sheet by hand and the printed menus use the older spellings
("Omlette"), so a retyped old spelling is expected. Each rule maps a known-wrong
spelling onto the corrected one *before* the `CATEGORY_CONFIG` lookup, which
lets the sheet and the code disagree without breaking grouping. Keep it, and
keep the rules keyed to the wrong spelling — a rule stops firing on its own once
a cell is corrected.
