# BolBill — Your expertise. Our paperwork.

A voice-first quotation workspace for independent Indian service businesses, built for Sarvam Campus '26 at IIT Bombay.

## Features
- Hindi, English and Hinglish speech/text input using Sarvam.
- Browser recordings converted to mono 16 kHz WAV; maximum 25 seconds.
- Structured service extraction using sarvam-105b with JSON output and server validation.
- Human review of missing prices and quantities; incomplete quotes cannot be exported.
- Editable items, deterministic paise-based totals, discounts and optional tax after discount.
- Business branding, quote IDs, expiry dates and manually tracked Draft/Sent/Accepted status.
- Save and reopen up to 30 quotes in this browser using localStorage.
- Dedicated print/PDF layout and clipboard export.
- Repair, freelance and tutoring example inputs. All generated outputs use live inference.

## Quick start
Requires Node.js 22.13 or newer.

```sh
npm ci
```
Copy `.env.example` to `.env`, then set `SARVAM_API_KEY` locally. Never commit this file.

```sh
npm run first-call
npm start
```
Open http://127.0.0.1:3187. Windows users can also run START-BOLBILL.cmd after configuring the key.

## Architecture
Browser microphone -> Web Audio WAV conversion -> Node HTTP backend -> Saaras v4 transcription -> editable transcript -> Sarvam-105b extraction -> validated quotation -> deterministic calculations -> human review -> print/copy.

Only runtime dependency: sarvamai. No frontend framework or build step. Secrets are read on the server. No transcripts, recordings or quotations are persisted by the server; Sarvam receives inference inputs. Saved quotes remain in the current browser and do not sync across devices.

## Tests
```sh
npm test
```
Seven passing tests cover incomplete totals, decimal prices, zero/negative amounts, discount ordering, full discount and invalid percentages.

Verified live: chat authentication; spoken synthetic test transcription; extraction into quotation items; browser quotation generation; INR 14,000 with 10% discount and 18% tax = INR 14,868; saving and reopening a quote with fields preserved. Original print preview was visually checked. Revised print layout is implemented; final revised PDF preview and real-microphone retest remain manual checks.

## Deployment
A Render blueprint is included in render.yaml. Connect this repository to Render, set SARVAM_API_KEY in the hosting environment and deploy a Node web service. The app respects PORT and HOST; local default is loopback. npm start reads .env only if it exists.

For public usage, add authentication and per-user usage controls before sharing broadly. Current app is a local workshop build. No live deployment is claimed.

## Scope
Quotation only, not a tax invoice or tax advice. Optional tax is a user-entered percentage. No automatic sending, payment processing, customer acceptance verification or cloud accounts. Status labels are manually maintained.

## Official API references
- https://docs.sarvam.ai/api/getting-started/welcome
- https://docs.sarvam.ai/api-reference/speech-to-text/transcribe
- https://docs.sarvam.ai/api-reference/chat/chat-completions-v2
