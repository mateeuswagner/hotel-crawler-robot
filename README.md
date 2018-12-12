# hotel-crawler-robot
Robot to crawl requested information on hotel websites

## Quickstart
```sh
    docker-compose build # re-run after changing dependencies
    docker-compose up
```
**Note: App will be running on port 3000. If you want to override the web port:
```sh
WEB_PORT=<your_custom_port> docker-compose up
```


## Usage
The API expects a post request on '<server_path>/buscar' with the CheckIn and CheckOut dates formatted as 'dd/mm/yyyy'.

# Example
```sh
POST http://localhost:3000/buscar

request.body:
{
    "checkin": "15/11/2018",
    "checkout": "16/11/2018"
}
```

Once it fetches the requested data, it will return a list of available hotel rooms formatted as follows.

```json
{
    "available": [
        {
            "imageURL": "https://myreservations.omnibees.com/Handlers/ImageLoader.ashx?imageID=152248.jpg",
            "name": "Hotel Village Le Canton",
            "description": "Hotel VillageAconchegantes e requintados, nossos 153 apartamentos oferecem todas as comodidades para proporcionar a voc&#xEA; uma estadia agrad&#xE1;vel. ...",
            "price": "R$ 850,00"
        }
    ]
}
```


## Debugging
### API request returns 400
If the API returns 400 there maybe an error in your request. Check every key sent. It expects dates in 'dd/mm/yyyy' format and should pass some rules as follows:

* CheckIn can't be set the same day of the request or earlier;
* Checkout must be at least 1 day after CheckIn
