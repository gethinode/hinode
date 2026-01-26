module github.com/gethinode/hinode-example

go 1.19

require (
	github.com/gethinode/hinode/v2 v2.0.0-beta.43 // indirect
	github.com/gethinode/mod-cookieyes/v2 v2.2.6 // indirect
)

// Use local Hinode for development
replace github.com/gethinode/hinode/v2 => ../
