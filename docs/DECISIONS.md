# Architectural Decision Records (ADR)

This document tracks key technical decisions made for Campus Minutes.

---

## ADR Template

### Decision ID

<!-- Format: ADR-000 -->

### Date

<!-- YYYY-MM-DD -->

### Problem

<!-- Describe the problem context and technical motivation -->

### Options

<!-- Option 1: ... -->
<!-- Option 2: ... -->

### Decision

<!-- Selected option and decision statement -->

### Reason

<!-- Why this decision was made over other options -->

### Tradeoffs

<!-- Pros and Cons / Risks of the decision -->

---

## Record Log

### ADR-001: Feature-Based Project Structure & src/ Migration

- **Decision ID**: ADR-001
- **Date**: 2026-07-24
- **Problem**: Root directory clutter and monolithic global component folder making code isolation difficult.
- **Options**:
  - Keep existing flat structure.
  - Migrate to feature-based architecture inside `src/`.
- **Decision**: Adopt `src/` layout with isolated `features/<name>` modules.
- **Reason**: Enhances domain encapsulation, code ownership, developer velocity, and maintainability.
- **Tradeoffs**: Requires path aliases (`@/*`) and initial import re-exports.
