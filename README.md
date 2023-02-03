# parse-stacktrace

This is a tool to convert the stacktrace to a readable format. **It is not fully tested, use it at your own risk.**

## Usage

1. Install it globally

`npm i -g parse-stacktrace`

2. Run this command

`parse-stacktrace`

you will see a local server is running at port `8080`

3. Paste your **stacktrace** and the **URL** to your sourcemap file, then you will get the parsed result. It must start with `https`

## Example

![example](https://github.com/cchaonie/parse-stacktrace/blob/8acb39ba4df7a9c86bb56d6209f1cd4d1510e0db/public/images/parse-stacktrace.png)

When you get a error stack trace from, like kibana, then you can put it to `Stack Trace:`. Then you need to input the sourcemap as well. In the example, the sourcemap url is just the js file and a suffix `.map`.

After these 2 fields are filled, you can click the `PARSE` button. A few seconds later, you will see the original source of the stack trace appended below.
