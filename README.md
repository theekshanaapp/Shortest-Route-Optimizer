# Shortest Route Optimizer (Vue 3 + Vite)

A Vue.js application designed to calculate the shortest path between nodes using Dijkstra's Algorithm.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)

## Overview

The Shortest Route Optimizer calculates the shortest path from one location to another within connected nodes. Users can input nodes directly or generate random selections using an external API.

## Features

- Input modes for selecting "FROM" and "TO" nodes.
- Random node generation using an external API.
- Dijkstra's Algorithm to find the shortest path.
- Displays the list of traversed nodes and the total distance traveled.
- Demonstrates API calls to an HTTP echoing service.

## Requirements

- Vue 3
- TypeScript
- Tailwind CSS
- Axios for API calls
- Vite for the development server

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:theekshanaapp/Shortest-Route-Optimizer.git
   cd shortest-route-optimizer

3. **Install Dependencies:** `npm install`
4. **Run the Project:** `npm run dev`

## Tests
- in a different terminal, `npm run test` runs all the tests
