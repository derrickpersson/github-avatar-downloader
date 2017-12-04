# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

Where the first jquery is the repo-owner, and the second jquery is the repo.

## Given

- Node is installed
- Within shell
- I have the file within the current folder

## When

- I execute your file using node (with arguments)

## Then

- I should find a folder called 'avatars' in my current directory.
- They should contain images corresponding to the avatars of the contributors of the repo.
- Name of each image should be contributor's name and file extension (i.e. johhny.png)

## Implementation Requirements
- Must use 'request' library to make the HTTP requests
- Use git for version control
