<?php
//-----------------------------------------------------
// GetCount($file,$increment)
// - - - - - - - - - - - -
// Increments the count by 1 in the file $counter
//                      unless $increment is false.
// Returns the counter value.
//
// PHP Example:
//
//       $count = Count("counter.txt");
//       if( $count < 50 )
//           print "You are a visiting a new page.";
//       else
//           print "You are visitor #$count.";
//-----------------------------------------------------
function GetCount( $file, $increment = true )
{
if( !($fp = fopen( $file, "r" )) )
{
print "\nError reading counter file: $file.\n";
$count = 0;
}
else
{
$count = strtok(fgets($fp,80), " ");
$time = strtok(" ");
fclose($fp);
}

if( !$increment )
return $count;

$count++;

if( !$time )
$time = time();

if( !($fp = fopen( $file, "w" )) )
{
print "\nError writing counter file: $file.\n";
}
else
{
fwrite($fp, sprintf( "%d %d", $count, $time ));
fclose($fp);
}
return $count;
}

//-----------------------------------------------------
// InsertCount($file,$increment)
// - - - - - - - - - - - - - - -
// Increments the count by 1 in the file $counter
//                      unless $increment is false.
// Prints the counter value.
//
// PHP Example:
//
//       echo 'The page has been accessed ';
//       InsertCount("counter.txt");
//       echo ' times.';
//
// See: GetCount()
//-----------------------------------------------------
function InsertCount( $file, $increment = true )
{
print GetCount( $file, $increment );
}


//-----------------------------------------------------
// ShowCount($lowvalue,$highvalue,$file)
// - - - - - - - - - - - - - - - - - - - -
// Returns true if the counter value is between
//   $lowvalue and $highvalue.
//
// See: GetCount()
//-----------------------------------------------------
function ShowCount($lowvalue,$highvalue,$file)
{
$count = GetCount($file,false);
return ($lowvalue <= $count && $count <= $highvalue);
}

$date = date("Ymd");
echo GetCount("counter".$date.".txt");
?>