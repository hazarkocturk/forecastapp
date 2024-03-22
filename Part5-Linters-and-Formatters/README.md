# Part 5 - Linters and Formatters

We have everything we need to work with a well-structured application. This will be especially useful when dealing with large applications. How about a couple of tools that will help ourselves, and make our own coding experience smoother?

## 🌱 Must-have's

### Linters

A linter is a tool that identifies problematic patterns in the code, that can lead to bugs or other issues. It can often also suggest the proper fix. The most common linter for JavaScript is [**ESLint**](https://eslint.org/).

1. Install **ESLint** and initialize its configuration (if it asks, select the option "To check syntax and find problems" and use json as config format; if you are unsure about the answer to other questions, ask your peers or coach).
2. Install the ESLint Extension for your editor.
3. Take a look at your JS files, do you notice any squiggly red line? Hover over it, notice any suggestion?

### Formatters

A formatter is a tool that takes your code and re-writes it according to a set of rules so that it conforms to a consistent style. The most common formatter for JavaScript is [**Prettier**](https://prettier.io).

1. Install **Prettier** and, as per instructions, create an empty configuration file to use the default style.
2. Historically, linters used to do part of the job that formatters do these days. For this reason, it's a good idea to tell **ESLint** to ignore some of its own rules that would cause conflicts with **Prettier**. Read up Prettier's docs on how to integrate with linters and implement the fix (you'll have to install a package and update ESLint's config file).
3. Install the Prettier Extension for your editor.
4. Configure the Prettier Extension to run Prettier on Save.
5. Make a simple edit in one of your files, hit save, sit back and enjoy the show 🍹

### Linters vs. Formatters, what's the difference?

Linters check code-quality and catch bugs early. Formatters make your code cleaner and easier to read.

> 💡 Tip: linters and formatters make your life easier: in theory, you can completely ignore formatting, do what you want, and have it fixed automatically later. What if instead, you use the tool to learn about formatting and conventions and leave the fewer and fewer mistakes that will remain to the tools? You'll get yourself a whole set of good habits, so you win twice!