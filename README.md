# fieldwire-playwright

[![Playwright Tests](https://github.com/endqwerty/fieldwire-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/endqwerty/fieldwire-playwright/actions/workflows/playwright.yml)

# Coding Exercise Instructions

Automate some forms and task flows for the staging fieldwire web application

## Primary Objectives

- High level test plan for the forms and tasks features
- test framework in javascript or typescript with any web autoamtion platform
- Write 2-3 tests for each of the tasks and forms features

## Documentation

- Test Plan and test selection
- How to build/execute your tests
- Any decisions or trade-offs made during the design process
- Things you would have done differently

# Tools used

NPM
Playwright
Prettier
Github (and Github Actions)
Google Gemini Code Assistant

# Instructions

## Requirements

"node": ">= 18"

## Setup

`npm install`

create a `.env` file with valid credentials. An example is located at `/.env.example`

## Run Tests

`npm run test`

If you are using a Github codespace or docker devcontainer use

`npm run test:devcontainer`

## CI/CD

Github action using the default Playwright script.

Tests run in the docker image provided by Playwright

Node in CI is pinned to 22.11.0
