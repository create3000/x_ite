---
title: How to Configure Your Web-Server
date: 2022-11-28
nav: main
categories: []
tags: [Configure, Web-Server]
---
## X3D MIME Types and File Extensions

The MIME Type is used to indicate the media type of a file that is to be displayed over the Internet. The web server typically uses the file extension as the indicator of the media type of the file. The MIME type is the key that a web browser uses to correctly interpret the bytes in a file so it is critical that the MIME type correctly reflect the media and encoding of the file.

For X3D developers this means they need to be aware of X3D file types and be able to set MIME Types on their own web server/host.

The base MIME type for X3D files is: model/x3d. Each file format has its own modifier. XML is +xml, JSON is +json, Classic VRML is +vrml. The following table summarizes the file extension, MIME type, and X3D encoding:

| X3D Encoding | File Extension | MIME Type        |
|--------------|----------------|------------------|
| XML          | .x3d, .x3dz    | model/x3d+xml    |
| JSON         | .x3dj, .x3djz  | model/x3d+json   |
| Classic VRML | .x3dv, .x3dvz  | model/x3d+vrml   |
| Binary       | .x3db, .x3dbz  | model/x3d+binary |
| VRML         | .wrl, .wrz     | model/vrml       |

The standard mechanism for indicating gzipped files is for the web server to set a special header field called »Content-Encoding«. This field indicates if the content has been encoding beyond that present in the media. This is the field that is used to indicate that the file has been compressed with gzip. When the web browser detects this field, it is responsible for gunzipping the file prior to passing it to the X3D browser.

If the file is gzipped, then the content-encoding value is »gzip« with the appropriate Classic VRML or X3D Binary extension. So gzip .x3dvz and gzip .x3dbz.

The simplest way to set your server to correctly display X3D files is to add the following to your document root's .htaccess file:

```apache
<IfModule mod_mime.c>
  # Add X3D mime types.
  AddType model/x3d+xml .x3d
  AddType model/x3d+xml .x3dz
  AddType model/x3d+json .x3dj
  AddType model/x3d+json .x3djz
  AddType model/x3d+vrml .x3dv
  AddType model/x3d+vrml .x3dvz
  AddType model/x3d+binary .x3db
  AddType model/x3d+binary .x3dbz
  AddType model/vrml .wrl
  AddType model/vrml .wrz
  AddEncoding gzip .x3dz
  AddEncoding gzip .x3djz
  AddEncoding gzip .x3dvz
  AddEncoding gzip .x3dbz
  AddEncoding gzip .wrz
</IfModule>
```

Because X3D files are pure text you can compress them on the fly. This can reduce the file size up to a factor of ten:

```apache
<IfModule mod_deflate.c>
  # Compress X3D on the fly.
  AddOutputFilterByType DEFLATE model/x3d+xml
  AddOutputFilterByType DEFLATE model/x3d+json
  AddOutputFilterByType DEFLATE model/x3d+vrml
  AddOutputFilterByType DEFLATE model/vrml
</IfModule>

<IfModule mod_brotli.c>
  # Specifies the Brotli compression quality, which is '5' by default,
  # but '4' is faster and more efficient compared to GZIP.
  BrotliCompressionQuality 4
  AddOutputFilterByType BROTLI_COMPRESS model/x3d+xml
  AddOutputFilterByType BROTLI_COMPRESS model/x3d+json
  AddOutputFilterByType BROTLI_COMPRESS model/x3d+vrml
  AddOutputFilterByType BROTLI_COMPRESS model/vrml
</IfModule>
```
