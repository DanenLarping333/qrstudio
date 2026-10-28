# QR Studio
Link: [Buka QR Studio](https://danenlarping333.github.io/qrstudio/)

**Small code. Endless possibilities.** A free, browser-based QR creator for website links and plain text, with custom colors and PNG/SVG exports.

## Run

Extract the ZIP and open **index.html** in a modern browser. Keep `vendor/`, `core.js`, `app.js`, and `style.css` together. No installation, API key, account or build step is required. All runtime dependencies are included locally.

## Features

- Website links (HTTP/HTTPS) or plain text, including Unicode and line breaks.
- Automatic preview, four color palettes and custom foreground/background colors.
- Dark-on-light contrast check (minimum 4.5:1 as a conservative design guard, not a guarantee of scanner compatibility).
- PNG download at 512, 1024 or 2048 pixels; SVG export for scaling.
- M, Q and H error correction; a minimum four-module quiet border.
- Integer-aligned PNG modules for sharp output.
- Responsive layout, labeled controls and keyboard navigation.
- No tracking, content history, uploads or remote runtime dependencies.

## Publish on GitHub Pages

1. Create a public repository named `qr-studio`.
2. Upload the **contents** of this folder to its root on branch `main`. Keep the `vendor` folder intact. Do not upload the ZIP itself.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose **main** and **/ (root)**, then Save.
5. Wait until GitHub reports **Your site is live**. For account `DanenLarping333` and repository `qr-studio`, the expected URL is `https://danenlarping333.github.io/qr-studio/` after publication succeeds.

This project is prepared locally; no GitHub repository or live deployment has been created by this package. No `.github` workflow is needed for this publishing method. The empty `.nojekyll` file disables Jekyll processing.

## Using it

Choose Website link or Plain text. Enter your content, adjust colors and error correction, and download PNG or SVG. Blank content, unsupported URL schemes, links with embedded credentials and low-contrast/inverted color pairs cannot be exported. Content is limited to 1,200 UTF-8 bytes; an emoji can use more than one byte.

The QR preview and downloads encode the current content, without a tracking redirect. Static QR images do not expire themselves, but their destination must remain available. You cannot change the encoded destination after sharing the image. Test the exported image with a phone before printing or distributing it, particularly for long content or custom colors. Anyone who obtains the QR can read its content; avoid encoding secrets.

Inputs are not saved. Reloading clears the form. Hosting providers may have ordinary access logs, but the app does not send entered content to them. SVG output contains only the QR geometry and validated colors, not the original content as markup.

## Development

Plain HTML, CSS and JavaScript. Optional tests require Node.js:

```sh
node --check app.js
node core.test.cjs
```

Core tests cover validation, Unicode size, contrast and QR generation. During creation, 12 additional round-trip checks passed using the independent jsQR 1.4.0 decoder, covering ASCII URLs, Unicode, whitespace and a 1,200-byte payload at all three error-correction levels. That decoder is a development-only check and is not included in the deployed app.

Real-browser visual, download-dialog and physical-phone testing remain to be completed; decoder tests do not replace those checks.

## Dependencies and license

QR encoding uses [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), version **1.4.4**, vendored from its npm distribution. Its MIT license is included in `vendor/LICENSE-qrcode.txt`. UTF-8 byte conversion is set explicitly in `core.js`.

Application code: MIT, see LICENSE. Keep both license notices when redistributing. QR Code is a registered trademark of DENSO WAVE INCORPORATED.
