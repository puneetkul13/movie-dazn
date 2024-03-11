# movie-dazn

First clone the project into your local system using the git clone --ssh-key command.
Install the dependencies using the 'npm install' command
Run the project using 'npm start' command

After running the project register the user with the following request using postamn:

curl --location 'http://localhost:3000/auth/register' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--data '{"username":"PunitAgarwal", "password":"9453121824", "roles":["Admin", "User"]}'

After registering the user, run the login api using the below request to get the token:

curl --location 'http://localhost:3000/auth/login' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--data '{"username":"PunitAgarwal", "password":"9453121824"}'

To get all the movies from the database use this request:

curl --location 'http://localhost:3000/movies' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1bml0QWdhcndhbCIsImlhdCI6MTcxMDEzOTg1MSwiZXhwIjoxNzEwMTQzNDUxfQ.jxyyglLgfqQ4_aCdO0B5zHnEc_VtHwYK0IV3J1vIFP8' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site'

To search for the movie, use the below request:

curl --location 'http://localhost:3000/movies/search?genre=10&movieName=priya' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1bml0QWdhcndhbCIsImlhdCI6MTcxMDEzOTg1MSwiZXhwIjoxNzEwMTQzNDUxfQ.jxyyglLgfqQ4_aCdO0B5zHnEc_VtHwYK0IV3J1vIFP8' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site'

To add the movie in the database:

curl --location 'http://localhost:3000/movies' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1bml0QWdhcndhbCIsImlhdCI6MTcxMDEzOTg1MSwiZXhwIjoxNzEwMTQzNDUxfQ.jxyyglLgfqQ4_aCdO0B5zHnEc_VtHwYK0IV3J1vIFP8' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--data '{"movieName":"Post", "genre":"10", "rating":10, "streamingLink":"ok.com"}'

To update the movie using the movie id, use the below request:

curl --location --request PUT 'http://localhost:3000/movies/65eeaaa50f4610a089f4361d' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1bml0QWdhcndhbCIsImlhdCI6MTcxMDEzOTg1MSwiZXhwIjoxNzEwMTQzNDUxfQ.jxyyglLgfqQ4_aCdO0B5zHnEc_VtHwYK0IV3J1vIFP8' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--data '{"movieName":"Post", "genre":"10", "rating":8, "streamingLink":"ok.com"}'

To delete the movie from the database:

curl --location --request DELETE 'http://localhost:3000/movies/65eeaaa50f4610a089f4361d' \
--header 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
--header 'Accept: */*' \
--header 'Accept-Language: en-US,en;q=0.5' \
--header 'Accept-Encoding: gzip, deflate, br' \
--header 'Referer: https://fanso.xyz/' \
--header 'Content-Type: application/json' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1bml0QWdhcndhbCIsImlhdCI6MTcxMDEzOTg1MSwiZXhwIjoxNzEwMTQzNDUxfQ.jxyyglLgfqQ4_aCdO0B5zHnEc_VtHwYK0IV3J1vIFP8' \
--header 'Origin: https://fanso.xyz' \
--header 'Connection: keep-alive' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site'



