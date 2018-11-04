# amble - choose your path

## Inspiration
Sometimes we just want to go on a walk.  But Google Maps really only gives us the most efficient, fastest way to get to a specific destination.  Sometimes I want to be able to take a quiet route to get thoughts out of my mind without needing to do much planning.  Sometimes I want to be able to be a little tourist in my area in a very casual, self-guided way.  This is where amble comes in.

## What it does
amble helps users find the best pedestrian path from their chosen point of origin to their destination based on their desired experience on the walk.  Users enter data on origin and destination, and then have five options on shaping their experience -- whether they want the path to be fast, scenic, safe, quiet, or be the most physically demanding (best workout!).

## How I built it
amble was built on React Native and Expo, with a thorough integration of the Google Maps Platform.  

## How to run it
amble is currently run in Expo.

1) Clone this repository
``` git clone https://github.com/josieku/amble.git```

2) Install Expo-CLI
```npm i -g expo-cli```

3) Install all node modules
```npm install ```

4) Run app on Expo
``` expo start ```

5) Scan the QR code on your terminal, open up the app in the IOS version of Expo, and enjoy!

## Challenges I ran into
We ran into many async/await issues that we had to think through, and many challenges on how to use and manipulate the google places data for specific paths.  We also had to restart the project because we initially utilized here.api, and their map api could not cater to our needs.

## Accomplishments that I'm proud of
Producing a functional phone app in less than 24 hours (after we had to restart)!  
Looked at extremely interesting data points that speak to what communities are drawn to - what is popular and not.

## What I learned
One can do so much with datasets, and I can't wait to play with it more (especially google maps).
It's important to READ THROUGH an api documentation before committing to it, especially if it is a major aspect of the project.

## What's next for amble
1) Quiet and Safe options are not functional at this moment, so we need to implement that!
2) Working out specific directional instructions
3) Using computer vision/graph imaging/even more calculations to create even smoother routes (no dead ends)
4) Giving users more than one route in the experience of choice!
... so much more!

## Credits
React Native Google Maps Boilerplate cloned from juliofabo
