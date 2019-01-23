# redpoints task

1.- Clone git repository

	git clone https://github.com/spd2492/redpointstask/

2.- Go to the directory where you have cloned the repository

3.- Install dependencies
	
	npm install
	bower install

4.- Creating your own API Key

	Go to https://developers.themoviedb.org/3/getting-started/introduction and follow the instructions
	
5.- Save the API key

	Modify the file app/assets/api_key.json with your API key. It has to be like:
	
			{ 
				"key": "<your_key>"
			}
  
6.- Launch the app and test

	grunt dev
	
7.- Visit the website 

	Go to http://localhost:9000
