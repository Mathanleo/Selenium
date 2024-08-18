import assert from "assert";
import { should } from "chai";
import { Builder, Browser, By, Key, until } from "selenium-webdriver";

should();

const example = async () => {
  // launch the browser

  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    // navigate to our apllication

    await driver.get("https://lambdatest.github.io/sample-todo-app");

    //add a todo

    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn Selenium", Key.RETURN);

    //assert

    let todoText = await driver
      .findElement(By.xpath("//li[last()]"))
      .getText()
      .then((val) => {
        return val;
      });

    //assert using node assertion

    assert.strictEqual(todoText, "Learn Selenium");

    //assert using chai should

    todoText.should.equal("Learn Selenium");

    await driver.get("https://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  } finally {
    await driver.quit();
  }
};

example();
