---
title: Setup a localhost Server
date: 2022-12-02
nav: main
categories: []
tags: [Setup, Localhost, Server, XHR]
---
## Overview

X_ITE uses the `fetch` API to load files and there's no way around it. However, this means that files loaded using the **file://** scheme protocol are subject to the same origin policy and are treated as cross-origin requests (CORS), and cross-origin requests are only supported for protocol schemes: https, http and data. **This means that X_ITE cannot access these files.**

To work around this problem, you will need to set up a localhost server, then you will be able to access your local files at the web address http://**localhost**/...

## Using a Browser Extension

You can use this [browser extension for Chrome and Edge](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/) to create a web server and serve your local files via HTTP. Very easy to use.

## Using an Application

There are various applications available online for setting up a localhost server. Among them, I would like to highlight here some options:

MacOS users have the options to utilize the [Personal Web Server](https://apps.apple.com/de/app/personal-web-server/id1486323797) (for Intel-based Macs) or the [Simple Web Server](https://apps.apple.com/us/app/simple-web-server/id1625925255) (for Apple Silicon-based Macs). These servers facilitate file serving via a web server and boast user-friendly interfaces. Alternatively, users can employ the provided [Node or Python script below in conjunction with Automator](https://www.macstadium.com/blog/automating-login-and-startup-events-in-macos) for additional flexibility and customization.

Another notable application is [XAMPP](https://www.apachefriends.org/index.html), renowned for its versatility across multiple operating systems and widespread popularity among users. It provides a comprehensive suite of web development tools, making it a favored choice for many developers and enthusiasts alike.

## Using Node

The npm [http-server](https://www.npmjs.com/package/http-server) is a straightforward yet powerful tool for serving static resources over HTTP. It's a command-line program that allows quick and easy access to local file directories via a local web server. With npm http-server, developers can swiftly set up a local development environment to test web applications or host static websites. Thanks to its user-friendly interface and configuration options, npm http-server is a popular choice for developers seeking a fast and uncomplicated way to serve local files over the HTTP protocol.

Follow the instructions on their [website](https://www.npmjs.com/package/http-server) to get it up and running.

## Using Python

If you have [Python](https://www.python.org) installed, then it is quite easy to start a **localhost** server.

Just open a Terminal and go to the directory you want to make available.

```console
$ # Let's make the Desktop directory available.
$ cd Desktop
```

Type in the following command to start the server.

```console
$ python3 -m http.server 80
```

By default, this will run the contents of the directory on a local web server, on port 80. You can go to this server by going to the URL http://**localhost** in your web browser. Here you'll see the contents of the directory listed — click the HTML file you want to run.

>**Tip:** If you already have something running on port 80, you can choose another port by running the server command followed by an alternative port number, e.g. python3 -m http.server 7800. You can then access your content at http://**localhost**:7800.
{: .prompt-tip }
