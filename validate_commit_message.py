#!/usr/bin/python
# -*- coding: utf-8 -*-
# v1.0.5-husky
import os
import re
import sys


def isCommitMessageValid(commit_message):
    pattern = r"\[....*-\d+\] [โจ,๐,๐,๐,๐,๐,๐,โ,โ๏ธ,๐ค,๐จ,๐จ,๐งน,โ,โ๏ธ,๐ฅ,๐,โฌ,โฌ๏ธ,โฌ,โฌ๏ธ,๐,โ๏ธ,๐ฆ,๐ฑ,๐,๐,๐ง,๐,๐,๐,๐,๐,๐,๐,๐ฌ,๐,๐,๐ณ,๐ฌ,๐,โฉ,โช,โฟ,โฟ๏ธ,๐,โก,โก๏ธ,๐ก,๐ง,๐,๐,๐ฅ,๐ก,๐,๐ฌ,๐]+ \([a-zA-Z\s\-,/]+\) .+"
    m = re.match(pattern, commit_message)
    return m is not None


def removeMessageComments(commit_message):
    cleaned_commit_message = ""
    for line in commit_message.splitlines():
        if line == "# ------------------------ >8 ------------------------":
            break
        if not line.startswith("#"):
            cleaned_commit_message = cleaned_commit_message + line + "\n"

    return cleaned_commit_message


def main():
    filename = os.environ["HUSKY_GIT_PARAMS"]
    commit_message = open(filename, "r", encoding="utf-8").read()
    commit_message = removeMessageComments(commit_message)

    if not isCommitMessageValid(commit_message):
        print("\n\n๐จ Commit message validation failed!")
        print("Here's what you tried:")
        print("-" * 36)
        print(commit_message)

        sys.exit(1)


if __name__ == "__main__":
    main()
