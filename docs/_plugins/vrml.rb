# -*- coding: utf-8 -*- #
# frozen_string_literal: true

# This "hook" is executed right before the site"s pages are rendered
Jekyll::Hooks.register :site, :pre_render do |site|
  puts "Adding VRML Markdown Lexer ..."
  require "rouge"

  # This class defines the VRML lexer which is used to highlight "vrml" code snippets during render-time
  class VRMLLexer < Rouge::RegexLexer
    title "VRML"
    desc "Classic VRML Encoding"

    tag "vrml"
    aliases "vrml", "x3dv", "wrl"
    filenames "*.x3dv", "*.wrl", "*.vrml"

    mimetypes "model/x3d+vrml", "model/vrml", "x-world/x-vrml"

    def self.detect?(text)
      return true if text =~ /\A#(?:X3D|VRML)\b/
    end

    state :comments_and_whitespace do
      rule %r/[\x20\n,\t\r]+/, Text
      rule %r/#.*?$/, Comment::Single
    end

    def self.id_regex
      %r/[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/
    end

    id = self.id_regex

    state :root do
      rule %r/[,:.]/, Punctuation
      rule %r/[{}\[\]]/, Punctuation
      rule %r/PROTO|EXTERNPROTO/, Keyword, :typeName
      rule %r/DEF|ROUTE|TO|EXPORT|AS/, Keyword, :name

      rule %r/(IMPORT)(\s*)(#{id})(\s*)(.)(\s*)(#{id})/ do
        groups Keyword, Text, Str::Regex, Text, Punctuation, Text, Str::Regex
      end

      mixin :comments_and_whitespace
      mixin :keywords
      mixin :accessTypes

      # https://github.com/rouge-ruby/rouge/blob/master/lib/rouge/lexers/javascript.rb

      rule %r/TRUE|FALSE|NULL/, Keyword::Constant
      rule %r/SFBool|SFColor|SFColorRGBA|SFDouble|SFFloat|SFImage|SFInt32|SFMatrix3d|SFMatrix3f|SFMatrix4d|SFMatrix4f|VrmlMatrix|SFNode|SFRotation|SFString|SFTime|SFVec2d|SFVec2f|SFVec3d|SFVec3f|SFVec4d|SFVec4f|MFBool|MFColor|MFColorRGBA|MFDouble|MFFloat|MFImage|MFInt32|MFMatrix3d|MFMatrix3f|MFMatrix4d|MFMatrix4f|MFNode|MFRotation|MFString|MFTime|MFVec2d|MFVec2f|MFVec3d|MFVec3f|MFVec4d|MFVec4f/, Keyword::Declaration

      rule %r/#{id}(?=\s*\{)/, Name::Class # typeNames
      rule %r/#{id}/, Name::Attribute # fieldNames

      rule %r/[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/, Num::Float
      rule %r/(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/, Num::Integer

      rule %r/"/, Str::Delimiter, :dq
    end

    state :keywords do
      rule %r/PROFILE|COMPONENT|UNIT|META|DEF|USE|EXTERNPROTO|PROTO|IS|ROUTE|TO|IMPORT|EXPORT|AS/, Keyword
    end

    state :accessTypes do
      rule %r/initializeOnly|inputOnly|outputOnly|inputOutput|field|eventIn|eventOut|exposedField/, Keyword
    end

    state :typeName do
      mixin :comments_and_whitespace
      rule %r/#{id}/, Name::Class, :pop!
    end

    state :name do
      mixin :comments_and_whitespace
      rule %r/#{id}/, Str::Regex, :pop!
    end

    state :dq do
      rule %r/\\[\\nrt"]?/, Str::Escape
      rule %r/[^\\"]+/, Str::Double
      rule %r/"/, Str::Delimiter, :pop!
    end

  end
 end
