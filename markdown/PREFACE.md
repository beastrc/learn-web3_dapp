## 🧑‍🏫 Instructions on the left, 🤝 interaction on the right

Each step in a Pathway covers a different aspect of using a particular blockchain or protocol. The format is easy to follow, with instructions on the left side and the right side for you to interact with your code.

## 🏋️ Challenges & hints

After some explanation of each topic, there is a coding challenge for you to complete before you can proceed to the next step, for example:

```js
// path/to/the/file/to/edit.ts
const provider = undefined; // Create an Ethereum provider using ethers
const selectedAddress = undefined; // then get the address
const balanceToDisplay = undefined; // and format its balance
```

For every challenge, we will give you hints and tips to help you get started. They usually point to the relevant documentation page:

**Need some help?** Check out these links 👇

- Getting a [provider](https://docs.ethers.io/v5/api/providers/#providers) with ethers.js
- Formatting a balance with [formatUnits](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatUnits)

## 😅 Providing solutions

Don't worry if you can't find the answer, we provide the solution to every challenge. It's just hidden so that we don't spoil anything for you, click "Show Solution" to reveal it:

```js
// solution
// path/to/the/file/to/edit.ts
const provider = new ethers.providers.Web3Provider(window.ethereum);
const selectedAddress = provider.selectedAddress;
const balanceOfAddress = await provider.getBalance(selectedAddress);
const balanceToDisplay = ethers.utils.formatUnits(balanceOfAddress, 18);
```

When you have completed the code, make sure it works by interacting with the UI on the right side of the page. The button at the bottom right of the screen will be enabled and allow you to move on to the next step!

## 👣 Next Steps

Click on the “Next:” button below on the right to move to the next step, which explains how to setup for the Pathway!
