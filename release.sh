#!/bin/bash

npm version patch -m "Bump version to %s"
NEW_VERSION=$(node -p "require('./package.json').version")
git push origin v$NEW_VERSION
gh release create v$NEW_VERSION --generate-notes
