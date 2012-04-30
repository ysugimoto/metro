#!/usr/bin/env python
# coding utf-8
import sys
import base64

argv = sys.argv
file = open(argv[1], 'r').read()
encoded = base64.b64encode(file)
print encoded
