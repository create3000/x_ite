---
title: Setup a localhost Server
date: 2022-12-02
nav: main
categories: []
tags: [Setup, Localhost, Server, XHR]
---
## Overview

X_ITE makes use of the XMLHttpRequest object to load files and there's no way round that. But that means files loading using the file:// scheme protocol are subject to the same origin policy and are handled as cross origin requests (CORS) and cross origin requests are only supported for protocol schemes: https, http and data. **That means X_ITE cannot have access to this files.**

To work around this problem you must set up a localhost server, then you can access your local files under the web address http://**localhost**/...

### Using a Browser Extension

You can use this [browser extension for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/) to create a web server, and serve your files using HTTP. Very easy to use.

## Using an Application

There are several applications on the Internet which can make a localhost server. Here I would like to recommend you two of them:

MacOS users can use [Personal Web Server](https://apps.apple.com/de/app/personal-web-server/id1486323797?mt=12), which can serves files through a web server, and is very easy to use.

Another application is [XAMPP](https://www.apachefriends.org/index.html), which runs on several operating systems and is very popular.

## Using Python

If you have [Python](https://www.python.org){:target="_blank"} installed, then it is quite easy to start a **localhost** server.

Just open a Terminal and go to the directory you want to make available.

```console
# Let's make the Desktop directory available.
$ cd Desktop
```

Type in the following command to start the server.

```console
$ python3 -m http.server
```

By default, this will run the contents of the directory on a local web server, on port 8000. You can go to this server by going to the URL http://**localhost**:8000 in your web browser. Here you'll see the contents of the directory listed — click the HTML file you want to run.

>**Tip:** If you already have something running on port 8000, you can choose another port by running the server command followed by an alternative port number, e.g. python3 -m http.server 7800. You can then access your content at http://**localhost**:7800.
{: .prompt-tip }
