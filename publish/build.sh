#!/bin/bash

SOURCE_DIR=../src;
TO_SOURCE_DIR=pack_src;
DIST_DIR=dist;
ROOT_DIR=..;

install(){
    npm i
}

build() {

    echo 'Clearing /src and /package...'
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
    node_modules/.bin/rimraf "$DIST_DIR"

    echo 'Creating dist folder...'
    # create dist dir
    mkdir "$DIST_DIR"
    mkdir "$TO_SOURCE_DIR"

    # copy src
    echo 'Copying src...'
    node_modules/.bin/ncp "$SOURCE_DIR" "$TO_SOURCE_DIR"

    # copy README & LICENSE to src
    echo 'Copying files to /dist...'
    node_modules/.bin/ncp "$ROOT_DIR"/README.md "$DIST_DIR"/README.md
    node_modules/.bin/ncp "$SOURCE_DIR"/carousel.d.ts "$DIST_DIR"/carousel.d.ts
    node_modules/.bin/ncp "$SOURCE_DIR"/package.json "$DIST_DIR"/package.json
    node_modules/.bin/ncp "$SOURCE_DIR"/platforms "$DIST_DIR"/platforms

    # compile package and copy files required by npm
    echo 'Building plugin...'
    cd "$TO_SOURCE_DIR"
    ../node_modules/.bin/tsc --outDir ../"$DIST_DIR"
    cd ..

    # delete source directory used to create the package
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
    node_modules/.bin/rimraf "$DIST_DIR"/*.js.map
}

install && build