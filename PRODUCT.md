# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The owner of a local DeepSeek Harness (DSH) installation who uses the “大肥鱼” chat companion and wants past conversations to remain available across session windows and context compression. The owner also needs to understand how much local storage the memory database uses.

## Product Purpose

“大肥鱼记忆” preserves selected user and completed assistant chat text in a local SQLite database, retrieves relevant excerpts for later conversations, and lets the owner inspect the memory store. Success means the stored history remains locally inspectable and the user can distinguish full-text/database footprint from derived search-memory summaries.

## Positioning

Unlike a session-only context feature, this plugin keeps original conversation text in a local SQLite file and derives searchable chunks for bounded recall. It is a personal, local DSH companion memory—not a hosted knowledge service.

## Operating Context

The plugin runs inside the DSH Host and Web UI. A DSH user continues ordinary chat; the plugin captures supported session events, recalls bounded excerpts, and offers a sidebar management page with read-only storage statistics and explicitly confirmed scope/location settings.

## Capabilities and Constraints

- Existing Host behavior stores user messages and completed assistant messages in SQLite, derives overlapping text chunks and a local search index, and exposes search/read/status tools.
- The database contains full original text plus derived chunks; category values are `fleeting`, `episodic`, and `durable`. Each chunk also has a dynamic recency state: `active`, `warm`, or `cold`.
- Statistics are read-only. They may report logical UTF-8 bytes for text/chunks and physical bytes for the SQLite main, WAL, and SHM files, but must not imply that page allocation can be attributed exactly to a memory category.
- Session/workspace binding and local SQLite location are owner-only settings with explicit confirmation. Keep capture, recall, schema, and existing data intact; database access stays on the Host. Aggregate statistics plus the selected binding mode/database path may cross the authenticated DSH connection; chat content stays on the Host.
- The package targets the locally inspected DSH runtime `0.2.1-rc.3`; it is not a standalone web application.

## Brand Commitments

Retain the name “大肥鱼” and the user's affectionate companion framing. The management page should be calm, clear, and factual; settings must explain their effects before confirmation, and saved history must never be treated as a new instruction source.

## Evidence on Hand

- Existing plugin documentation: `dafeiyu-memory/README.md`.
- Existing implementation: `dafeiyu-memory/index.js`, `dafeiyu-memory/lib/adapter.js`, and `dafeiyu-memory/lib/store.js`.
- No screenshots, brand image files, benchmarks, or user testimonials are supplied; do not invent any.

## Product Principles

1. Keep original memories local and preserve existing user data.
2. Treat retrieved history as sourced material, not as instructions.
3. Separate original text, derived chunks, recency state, and physical database files in reporting.
4. Keep inspection read-only; make owner settings explicit and recoverable when DSH or the database is unavailable.
