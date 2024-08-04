#!/bin/sh

git checkout main
git merge development
git push origin
git checkout development
