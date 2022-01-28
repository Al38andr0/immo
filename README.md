# Frontend development challenge

## User journey
### REQUIREMENTS
- The user should be able to enter an address (or address fragment) in the
  address search field, and the search-results should update with the results of
  the provided "API" module upon pressing the "Search" button.

- The sidebar can be used to further filter the results by property type. A list
  of all available property types can be retrieved from the `api.js` module
  using `getAvailablePropertyTypes`.

- Property records should appear in the "Selected properties" section if the
  corresponding checkbox in the search-results table is checked.

- Changing the property-type filter or address search-string should not have any
  effect on the selected properties.

### IMPLENTATION
The implementation reflects the requirements. Few notes about the way it handles the errors:
* I implemented a loader and an error message to load the loading process and when the API throws an error.
* Searching with an empty address gets an error from the API. I chose to handle this error in a different way respect a server error, reporting a different message.


## Responsive design

### REQUIREMENTS
In this hypothetical scenario, there was no time to create a dedicated design
for small screens, but we expect a portion of the users to be on a phone. It's
up to you to come up with a responsive implementation of the design.

### IMPLENTATION
I created a layout for desktop and medium devices, but not for mobiles. 
The main reason for this choice is that I didn't use any CSS framework. 
Usually a CSS framework has already classes that manage the conversion of tables from desktop to mobile, but creating it from scratch it would have taken a large amount of time, time that unfortunately I don't have at the moment.


## Frameworks and libraries

### REQUIREMENTS
At IMMO we're currently transitioning from [Ember][ember] (and JavaScript) to [React][react]
(and TypeScript) to build our websites. You can submit your solution using any 
frontend framework - such as Ember, React, Vue, or even Vanilla JS - and either 
JavaScript or TypeScript as you prefer. Just be sure to include a README file
telling us how to run it!

### IMPLENTATION
I used React for this project. The command to run it is: **npm start** from the terminal.


## Markup and styling

### REQUIREMENTS
To the extent possible, please structure your markup and styles such that the
markup is concerned only with semantics, and all styling and layout is defined
in your stylesheets.

If you use a CSS framework (like Tailwind, Bulma, Foundation, etc) please demonstrate
an ability to keep the markup as clean and readable as possible. Ideally we would
like to see _your own CSS_, but we understand the benefits of CSS frameworks
so if you use them, please make full use of them to make code clean and
easy-to-read.

### IMPLENTATION
Has already said before, I didn't use any CSS framework. 
For a test like that, I believe, it's important show the skills in all the languages, (S)CSS included.

##EXTRA NOTES
I found an issue with the original design that affected negatively my productivity, based on my original assumption that the records shown on the design were the same fetched from the API.
From the API the app gets 4 property types (semi-detached, detached, terraced, flat), instead only 3 are shown in the design (plus All, but this one doesn't count at this point).
When I noticed that I also noticed that the property type in the records matched the ones in the filter.
Then I thought that you wanted to show only the types of property reported in the results and not all of them.
Based on that, I implemented this solution (and it took me quite a bit of time): in the filter, I was showing only the types matching the types in the searched records.
Once created, I realized that it was creating several issues for the navigation journey (I'm not going to explain it now).
Only at this point, did I see that the properties' data was different from the one served by the API, and then (another assumption) I thought that also the data from the property types could have been different from the one coming from the API.
In the end, I reverted the original solution I built and now my implementation always shows all the types in the filter.

In the ErrorMessage folder I also created a simple component test. Just to give you a little taste of how I organize my file structure and my tests. The command to run the tests is: **npm test* from the terminal.

Also, in the same folder, you can see that I'm using **prop-types** in the JS file, as before, to give you an idea of the functionalities for a real project.
