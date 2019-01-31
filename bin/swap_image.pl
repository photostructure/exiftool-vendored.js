#!/usr/bin/perl -w

# From http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,1846.msg8031.html#msg8031

my $help = <<_END_;
#
# File:         swap_image
#
# Description:  Swap image in JPEG file, preserving meta information
#
# Syntax:       swap_image [OPTIONS] FILE/DIR [...]
#
# Options:      -d     - dummy mode (doesn't actually change the file)
#               -r     - recursively process sub-directories
#               -i DIR - ignore specified directory
#               -f     - fix truncated jpg
#               -v     - verbose
#
# Revisions:    01/25/06 - PH Created from clean_jpg
#               01/31/07 - PH Send warnings to stderr
#
_END_
#
# Legal:        Copyright (c) 2004-2005 Phil Harvey
#               You are free to use/modify this script for non-profit
#               purposes.  Not responsible for loss or damages.
#
#               Mail problems/comments to phil at owl.phy.queensu.ca
#
use strict;
use warnings;

require 5.002; 

use Cwd;
use File::Basename;

sub SwapDir($);
sub SwapJpg($);

my $bindir = Cwd::abs_path(File::Basename::dirname($0));
open FILE, "$bindir/empty.jpg" or die "error opening $bindir/empty.jpg\n";
seek FILE, 2, 0 or die "Error seeking\n";
my $newData;
read FILE, $newData, 65536 or die "Error reading from file\n";
close FILE;
my @files;
my $recurse = 0;
my $verbose;
my $dummy;
my @ignore;
my $count = 0;
my $count_ok = 0;
my $count_dir = 0;
my $cleaned_bytes = 0;
my $fix_truncated_jpg;
my %jpegMarker = (
    0x01 => 'TEM',
    0xc0 => 'SOF0', # to SOF15, with a few exceptions below
    0xc4 => 'DHT',
    0xc8 => 'JPGA',
    0xcc => 'DAC',
    0xd0 => 'RST0',
    0xd8 => 'SOI',
    0xd9 => 'EOI',
    0xda => 'SOS',
    0xdb => 'DQT',
    0xdc => 'DNL',
    0xdd => 'DRI',
    0xde => 'DHP',
    0xdf => 'EXP',
    0xe0 => 'APP0', # to APP15
    0xf0 => 'JPG0',
    0xfe => 'COM',
);

my $arg;
while ($arg = shift)
{
    if ($arg =~ /^-/) {
        for (my $i=1; ($_=substr $arg, $i, 1); ++$i) {
            /d/  and $dummy = 1, next;
            /f/  and $fix_truncated_jpg = 1, next;
            /i/  and push(@ignore,shift), next;
            /r/  and $recurse = 1, next;
            /v/  and $verbose = 1, next;
            print "Unknown option $_\n";
            exit 1;
        }
    } else {
        push @files, $arg;
    }
}

unless (@files) {
    print $help;
    exit 1;
}

my $filename;
foreach $filename (@files) {
    if (-d $filename) {
        SwapDir($filename);
    } elsif (-e $filename) {
        my $result = SwapJpg($filename);
        if ($result > 1) {
            ++$count;
        } elsif ($result > 0) {
            ++$count_ok;
        }
    } else {
        die "Can't open $filename\n";
    }
}

if ($count or $count_ok or $count_dir>1) {
    printf("%5d directories scanned\n", $count_dir) if $count_dir > 1;
    printf("%5d JPG image swapped\n", $count) if $count;
    printf("%5d JPG files already swapped\n", $count_ok) if $count_ok;
    if ($cleaned_bytes >= 102400000) {
        printf("%5d MB saved\n", $cleaned_bytes / (1024*1024));
    } elsif ($cleaned_bytes >= 100000) {
        printf("%5d KB saved\n", $cleaned_bytes / 1024);
    } else {
        printf("%5d bytes saved\n", $cleaned_bytes);
    }
    print "But this was dummy mode, so nothing was changed\n" if $dummy;
} else {
    print "Nothing to do.\n";
}

exit($count ? 0 : 1);

#------------------------------------------------------------------------------

# Get JPEG marker name
# Inputs: 0) Jpeg number
# Returns: marker name
sub JpegMarkerName($)
{
    my $marker = shift;
    my $markerName = $jpegMarker{$marker};
    unless ($markerName) {
        $markerName = $jpegMarker{$marker & 0xf0};
        if ($markerName and $markerName =~ /^([A-Z]+)\d+$/) {
            $markerName = $1 . ($marker & 0x0f);
        } else {
            $markerName = sprintf("0x%.2x", $marker);
        }
    }
    return $markerName;
}

sub SwapDir($)
{
    my $dir = shift;
    opendir(DIR_HANDLE, $dir) or die "Error opening directory $dir\n";
    my @file_list = readdir(DIR_HANDLE);
    closedir(DIR_HANDLE);
    
    ++$count_dir;
    
    my $file;
    foreach $file (@file_list) {
        my $path = "$dir/$file";
        if (-d $path) {
            next if $file =~ /^\./; # ignore dirs starting with "."
            next if grep /^$file$/, @ignore;
            $recurse and SwapDir($path);
            next;
        }
        if ($file =~ /\.jpg$/i) {
            my $result = SwapJpg($path);
            if ($result > 1) {
                ++$count;
            } elsif ($result > 0) {
                ++$count_ok;
            }
        }
    }
}

# rewrite a jpg file, swapping image while preserving all meta information
# Inputs: 0) file name
# - returns 0 on error, 1 if nothing done, 2 if any junk was removed
sub SwapJpg($)
{
  my $infile = shift;
  my $outfile = '';
  my $success = 0;
  my $saved = 0;
  my ($s,$length,$buff);
  my ($ch,$data,$ord_ch,$done_meta);
  
  $verbose and print "File: $infile\n";
  
  open(JPG_IN,$infile) or return $success;
  binmode( JPG_IN );

  # create name of temporary file in same directory
  if ($infile =~ /(.*\/)/) {
    $outfile = $1;
  }
  $outfile .= "icat_CleanJpg.tmp";
  
  unless (open(JPG_OUT,">$outfile")) {
    close(JPG_IN);
    return $success;
  }
  binmode( JPG_OUT );
  
  # set input record separator to 0xff (the JPEG marker) to make reading quicker
  my $oldsep = $/;
  $/ = "\xff";

  if (read(JPG_IN,$s,2)==2 and $s eq "\xff\xd8" and print JPG_OUT $s) {
    # read file until we reach an end of image (EOI)
    Marker: for (;;) {
      # Find next marker (JPEG markers begin with 0xff)
      $data = <JPG_IN>;
      defined($data) or last;
      chomp $data;  # remove 0xff
      $saved += length($data);
#      print JPG_OUT $data or last;
      # JPEG markers can be padded with unlimited 0xff's
      for (;;) {
        read(JPG_IN, $ch, 1) or last Marker;
        $ord_ch = ord($ch);
        last if $ord_ch != 0xff; # exit loop before printing marker
        ++$saved;
      }
      my $hdr = "\xff" . $ch;   # segment header
      # Now, $ord_ch is the value of the marker.
      if (($ord_ch >= 0xc0) && ($ord_ch <= 0xc3)) {
        # this is an image block
        read(JPG_IN, $buff, 7) == 7 or last;
#        print JPG_OUT $hdr,$buff or last;
        $saved += 9;
      # handle stand-alone markers 0x01 and 0xd0-0xd7
      # (and the non-marker 0x00, which follows an 0xff if it exists in data)
      } elsif ($ord_ch==0x00 or $ord_ch==0x01 or ($ord_ch>=0xd0 and $ord_ch<=0xd7)) {
#        print JPG_OUT $hdr or last;
        $saved += 2;
      } elsif ($ord_ch==0xd9) { # end of image (EOI)
        $success = 1;
        # write our substitute image
        print JPG_OUT $newData or $success = 0;
        $saved += 2 - length $newData;
        # copy over anything after EOI
        my $preview_size = 0;
        while (read(JPG_IN, $buff, 65536)) {
            print JPG_OUT $buff or $success = 0;
            $preview_size += length $buff;
        }
        if ($verbose and $preview_size) {
            printf("  Preview image     : %6d bytes -- Kept\n", $preview_size);
        }
        last;
      } else {
        # We **MUST** skip variables, since FF's within variable names are
        # NOT valid JPEG markers
        read(JPG_IN, $s, 2) == 2 or last;
        $length = unpack("n",$s);
        last if $length < 2;
        read(JPG_IN, $buff, $length-2) == $length-2 or last;
        # is this meta information (APP or COM segment)?
        my $is_meta;
        if (($ord_ch >= 0xe0 and $ord_ch <= 0xef) or $ord_ch == 0xfe) {
          my $mrkr = JpegMarkerName($ord_ch);
          $done_meta and warn " >>>> Segments out of order! - $infile\n";
          $is_meta = 1;
        } else {
          $done_meta = 1;
        }
        my $mrkr;
        if ($verbose) {
            $mrkr = '(' . JpegMarkerName($ord_ch) . ')';
            $mrkr .= ' ' if length($mrkr) < 6;
        }
        if ($is_meta) {
          $verbose and printf("  Marker 0x%x $mrkr: %6d bytes -- Kept\n", $ord_ch, $length);
          print JPG_OUT $hdr,$s,$buff or last;
        } else {
          if ($fix_truncated_jpg) {
            $success = 1;
            print JPG_OUT $newData;
            my $pos = tell JPG_IN;
            seek JPG_IN, 0, 2;
            $saved += 2 + tell(JPG_IN) - $pos - length $newData;
            $saved = 1 if $saved < 0;
            last;
          }
          $verbose and printf("  Marker 0x%x $mrkr: %6d bytes -- Cleaned\n", $ord_ch, $length);
          $saved += $length + 2;
        }
      }
    }
  }
  $/ = $oldsep;     # return separator to original value
  close(JPG_IN);
  close(JPG_OUT) or $success = 0;
  
  if ($success and $saved > 0 and not $dummy) {
    unless (rename($outfile,$infile)) {
      $success = 0;
      unlink($outfile);
    }
  } else {
    unlink($outfile);
    warn " >>>>>>>>>> Error in $infile\n" unless $success;
  }
  $success and $verbose and printf("  Total saved       :%7d bytes\n", $saved);
  if ($success and $saved > 0) {
    $cleaned_bytes += $saved;
    $saved = 1;
  } else {
    $saved = 0;
  }
  return $success + $saved;
}

# end