# Booking Engine for car maintainance
A Simple service for making a car maintainance booking app in which minimum 2 bookings will be acepted at a given point of time.
One booking can have maximum of 2 hours.
Working hours are 09:00 AM to 05:00 PM on everyday.

# Assumptions
Used in memory database.
Validations like duplicate VIN or duplicate email and phNo against DB are not performed to keep it simple.
Have written unit test for very few files for complex logic.
Integration tests are not covered.

# Requirements
* `npm`
* `node` >= 14.x (will likely work with older versions, but has never been
  tested)

# Installation

`npm install`

# Running

`npm start` will start the application at
[http://localhost:3000](http://localhost:3000) (set environment variable `PORT`
to change the port).

The service can now be called:

Below end point is to set capacity which means at a time how many cars can be accepted for booking.
To set to default capacity which is 2 you can opt not to send anything in the request body.

```

$ curl --location --request POST 'http://localhost:3000/capacity/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "noOfMechanics": 2
}'
```
Below End point is to get the capacity of the service station(in case needed):

```
curl --location --request GET 'http://localhost:3000/capacity/'

```

Below End point is to accept the booking:

```
curl --location --request POST 'http://localhost:3000/booking/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "vehicle": {
        "VIN": "7897878979e8reahkra",
        "make": "HONDA",
        "model": "city"
    },
    "user": {
        "name": "Manas",
        "contact": "9861965513"
    },
    "bookingDateTime": "2021/05/21 15:00"
}'

```

```
Below End point will give you bookings made for a day along with slot information:

curl --location --request GET 'http://localhost:3000/booking/2021-05-21'

```
# Testing

Tests can be run with `npm test`. .

All tests are colocated with their respective source files in `*.spec.js` files,
using [Jest](https://facebook.github.io/jest/) with default settings.
I have only written for few files due to time constraint.

You do not need to run the application separately to run any tests.

# DB Design and model
Refer volvo_ERDiagram.png to get a detailed idea of how DB will looks like with a little bit of advanced requirement for billing.
