#!/bin/bash

npm version patch -m "Bump version to %s"  --tag-version-prefix=''
NEW_VERSION=$(node -p "require('./package.json').version")
git push origin $NEW_VERSION
gh release create $NEW_VERSION --generate-notes
