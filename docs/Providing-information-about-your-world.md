Motivation
==========

- After you've created a great world, sign it!
- You can provide a title and a description embedded within the file

Syntax: WorldInfo
=================

A [WorldInfo](https://www.web3d.org/documents/specifications/19775-1/V3.3/Part01/components/core.html#WorldInfo) node provides title and description information for your world:

- *title* - the name for your world
- *info* - any additional information

XML Encoding
------------

```xml
<WorldInfo
    title='Our Masterpiece'
    info='"License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html"'/>
```

Classic Encoding
----------------

```js
WorldInfo {
  title "Our Masterpiece"
  info  [ "License GPLv3, https://www.gnu.org/licenses/gpl-3.0.en.html" ]
}
```
