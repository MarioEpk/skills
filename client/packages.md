This file contains additional info about updating of dependencies, possible update problems etc.

Packages
========

## test-package@2.6.9
Storybook uses `core-js@3.1.4`, however, some library used in tests,
presumably `@babel/register` needs `core-js@2.0.0`. Excepting tests,
everything works.
