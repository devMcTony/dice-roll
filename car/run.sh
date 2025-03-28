#!/bin/bash

# Compile the typescript file
tsc vehicles.ts --outDir ./js

# Run the compiled javascript file
live-server .