This program implements Yelp API to search and display business according to user inputted keyword and location.
Developer: Xinyu Wu xwu26173
Date: Oct. 6 2022

Known limitations: 
	The style of the select options part are different from the sample. I tried to modify them with css, but the effect varies between different browsers.
	When viewed with Firefox, when input bars are focused, there are blue borders which comes with the browser setting.
	When calling Yelp API using categories = XXX, the result is significently inflenced by the category, which was different from our TA's sample. Changing 'categories' to 'alias' would yield similar result to the sample, but according to hw6 description we should use 'categories'.

Error handling
	If the address is invalid, the program will show a message 'Failed to obtain latitude and longitude of the address'.
	If ipinfo fail to obtain lat and lng, it will show 'Failed to obtain latitude and longitude with current IP address', though this have never happened.