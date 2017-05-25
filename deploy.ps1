$tizen = "c:\tizen-studio\tools\ide\bin\tizen.bat"
$widget = "ReactTizenWatch"
$package = "aLjg04YpZ8"
$folder = "C:\src\react-tizen-watch\"
$buildFolder = "$($folder)build\"
$buildResultFolder = "$($buildFolder).buildResult"

Set-Location $folder
npm run build
Remove-Item "$($buildFolder)\static\js\*.map"

Write-Host "-- Clean"
&$tizen clean -- $buildFolder
Write-Host "-- Build"
Copy-Item "$($folder)\icon.png" $buildFolder
Copy-Item "$($folder)\config.xml" $buildFolder

&$tizen build-web -- $buildFolder
Write-Host "-- Package"
&$tizen package --type wgt --sign develop -- $buildResultFolder
Write-Host "-- Install"
&$tizen install -- $buildResultFolder -n "$($widget).wgt"
Write-Host "-- Run"
&$tizen run -p $package