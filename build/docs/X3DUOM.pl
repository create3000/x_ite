#!/usr/bin/perl
use strict;
use warnings;

# cat docs/_posts/components/X_ITE/*.md | perl build/docs/X3DUOM.pl

my $treeon = 0;
my $collectappinfo = 0;
my $appinfo = "";
my $parent = "ROOT";
my $current = "ROOT";
my $containerField = "";
my $first = 1;
my $description = "";
my $collectdesc = 0;

sub trail() {
	print "<containerField default=\"$containerField\" type=\"xs:NMTOKEN\"/>\n";
	print "</InterfaceDefinition>\n";
	print "</ConcreteNode>\n";
}
sub trailfield () {
   return unless $description;
   $description =~ s/{:.*?}//;
   print "\tdescription=\"$description\"\n";
	print "/>\n";
   $description = "";
}

while (<STDIN>) {
	chomp;
	chomp;
	if (/^```/) {
		if ($treeon == 1) {
			$treeon = 0;
			if (!$first) {
				trailfield();
				trail();
			} else {
				$first = 0;
			}
			print "<ConcreteNode name=\"$current\">\n";
         		print "\t<InterfaceDefinition specificationUrl=\"https://create3000.github.io/x_ite/components/x-ite/". lc $current . "\"\n";
			$appinfo =~ s/{:.*?}//;
			$appinfo =~ s/[<>]/  /g;
			$appinfo =~ s/^## //;
                        print "\t\tappinfo=\"$appinfo\">\n";
			print "\t<componentInfo name=\"X_ITE\" level=\"1\"/>\n";
			print "\t<Inheritance baseType=\"$parent\"/>\n";
		} else {
			$treeon = 1;
		}
		# print "Match2 $_\n";
	}
	if ($treeon == 1 && /\+ ([A-Za-z0-9]+)/) {
		# print "Match $_\n";
		$parent = $current;
		$current = $1;
	}
	if (/^## Overview/) {
		$containerField = "";
		$treeon = 0;
		$parent = "ROOT";
		$current = "ROOT";
		$collectappinfo = 1;
		$appinfo = "";
		$collectdesc = 0;
	}
	if (/^## Hierarchy/) {
		$collectappinfo = 0;
	}
	if (/^#/) {
		$collectdesc = 0;
	}
	if ($collectappinfo) {
		$appinfo .= $_;
	}
	if ($collectdesc) {
		$description .= $_;
	}
	if (/^### ([A-Za-z0-9]+) \[([^\]]*)\] \*\*([A-Za-z0-9]+)\*\* ([^<]*)(<small>([^<]*)<\/small>)?/) {
		trailfield();
		$description = "";
		$collectdesc = 1;
		my $enums = "";
		my $type = $1;
		my $accesstype = $2;
		my $name = $3;
		my $default = $4;
		my $inheritance = $6;
		if (defined $inheritance) {
			$inheritance =~ s/\[(X3D.*)\]/$1/;
		}
		my $minInclusive = undef;
		my $maxInclusive = undef;
		my $minExclusive = undef;
		my $maxExclusive = undef;
		if (defined $inheritance && $inheritance =~ /^\[([^,"]+),/) {
			$minInclusive = $1;
			# undef $inheritance;
		}
		if (defined $inheritance && $inheritance =~ /,([^,"]+)\]$/) {
			$maxInclusive = $1;
			# undef $inheritance;
		}
		if (defined $inheritance && $inheritance =~ /^\(([^,"]+),/) {
			$minExclusive = $1;
			# undef $inheritance;
		}
		if (defined $inheritance && $inheritance =~ /,([^,"]+)\)$/) {
			$maxExclusive = $1;
			# undef $inheritance;
		}
		if (defined $inheritance && $inheritance =~ /^\[.*\]$/) {
			if ($inheritance =~ /"/) {
				$inheritance =~ s/\[(.*)\]/$1/;
				$inheritance =~ s/"/&#34;/g;
				my @enumerations = split(/[, ]+/, $inheritance);
				$enums = "\t\t<enumeration value=\"".join("\"/>\n\t\t<enumeration value=\"", @enumerations)."\"/>";
			}
		}
		if (defined $accesstype && $accesstype eq "in, out") {
			$accesstype = "inputOutput";
		} else {
			$accesstype = "initializeOnly";
		}
		if (defined $default) {
			$default =~ s/ *$//;
			$default =~ s/^"(.*)"$/$1/;
			if ($default eq "[ ]") {
				undef $default;
			}
		}
		if (defined $name) {
			print "<field name=\"$name\"\n";
		}
		if (defined $type) {
			print "\ttype=\"$type\"\n";
		}
		if (defined $accesstype) {
			print "\taccessType=\"$accesstype\"\n";
		}
		if (defined $default) {
			print "\tdefault=\"$default\"\n";
		}
		if (defined $minInclusive) {
			print "\tminInclusive=\"$minInclusive\"\n";
		}
		if (defined $minExclusive) {
			print "\tminExclusive=\"$minExclusive\"\n";
		}
		if (defined $maxInclusive) {
			print "\tmaxInclusive=\"$maxInclusive\"\n";
		}
		if (defined $maxExclusive) {
			print "\tmaxExclusive=\"$maxExclusive\"\n";
		}
		print $enums;
		if (defined $inheritance && $inheritance =~ /^X3D/) {
			print "\tinheritedFrom=\"$inheritance\"\n";
		}
	}
	if (/container field is \*([^*]+)\.\*/) {
		$containerField = $1;
	}
}
trailfield();
trail();
