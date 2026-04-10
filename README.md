# Asset Allocation Calculator (Coding Exercise)
Take home project for a company I'm interviewing for.

Input the USD amount, and the app will calculate how much BTC and ETH you'd get with a 70/30 split using live rates from the Coinbase API.

## Running the project
```bash
npm install
npm run dev
```
Open http://localhost:5173 in your browser

## Features
I opted for a 3 column layout with the input on the left and two allocation results on the right of it. I also added additional information beyond what's shown in the wireframe to provide more useful information to the end user such as the amount of the allocation and the current rate for each crypto currency. 

Additional features:
- Auto-refreshing exchange rates every 60 seconds so the data stays live without a page reload
- Input validation that catches non-numeric characters and negative numbers
- Disabled input while exchange rates are loading or on initial load failure
- Stale rates persist on refresh failure
- Manual retry button if fetch fails
- Responsive layout that changes to a single column on smaller screens

## Structure
I used Vue 3 with Composition API and TypeScript. A few decisions worth noting:
- Exchange rates fetching lives in a `useExchangeRates` composable to encapsulate logic and lifecycle management
- Coinbase API call is isolated in a service layer with its own error handling
- CSS custom properties for theming so colors and spacing are consistent throughout

## Future Improvements
- Add more crypto currencies 
- Allow the user to adjust the split percentage