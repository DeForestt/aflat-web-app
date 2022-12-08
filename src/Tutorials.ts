const lessons =  [
    {
        title: "Ints in Aflat",
        description: "Aflat allows you to work with variables like any other programing language.  The int type represents a 32-bit integer. below you can write a program that returns and integer value of 7. and then a function that returns the sum of two integers.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import string from "String";

import {case, report, require} from "ATest.af" under test;
import TestSuite from "ATest.af";

bool return7(adr _arg) : test.case {
    int x = mod.return7();
    return test.require(x == 7, ${"`return7() = 7 but got {x}`"});
};

bool sum(adr _arg) : test.case {
    return (
        test.require(mod.sum(1, 2) == 3, ${"`1 + 2 = 3 but got {mod.sum(1, 2)}`"}) &
        test.require(mod.sum(2, 2) == 4, ${"`2 + 2 = 4 but got {mod.sum(2, 2)}`"}) &
        test.require(mod.sum(3, 2) == 5, ${"`3 + 2 = 5 but got {mod.sum(3, 2)}`"}) &
        test.require(mod.sum(4, 2) == 6, ${"`4 + 2 = 6 but got {mod.sum(4, 2)}`"})
    );
};

int main() {
    TestSuite suite = new TestSuite("Simple Test Suite");
    suite.addCase(return7, "Test Return 7");
    suite.addCase(sum, "Test Sum");
    suite.run();
    test.report();
    return 0;
};`,

        defaultCode: `.needs <std>
// Write some code that returns an integer value of 7
export int return7() { // The export keyword makes the function available to other modules it is needed here so that the test code can access the function.
    return 0; // the return keyword returns a value from a function and ends the function.
};

// Write a function that takes two integers and returns their sum
export int sum(int a, int b) {
    return 0; // replace with the correct code
};`,
        moduleName: "TestModule",
    },
    {
        title: "Pointers in Aflat",
        description: "Similar to C, Aflat allows you to work with pointers.  One big difference in aflat is that pointers are not typed.  They all have the same type of `adr`. This means that you can use a pointer to any type of data."
            + " variables can be referenced by using the `?` operator (where is <variable name>) if you have an int called `a` the int can be referenced like this."
            + "\n\n ```javascript\nadr b = ?a;\n```\n\n To get the value that a pointer points to you can use the `as` operator and the type that you expect `int c = a as int;`\n\n A value can be stored in a pointer by using the funnel operator `=:` `b =: 5;`"
            + "\n\n Below write a program that reads an integer from a pointer and then stores the number 5 in the pointer return the value of the original integer.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import string from "String";

import {case, report, require} from "ATest.af" under test;
import TestSuite from "ATest.af";

bool returnPointer(adr _arg) : test.case {
    int i = 7;
    adr x = ?i;
    int y = mod.pointerFun(x);
    return (
        test.require(y == 7, "The original value was returned.") &
        test.require(i == 5, ${"`The value of the pointer was changed to 5 but got {i}`"})
    );
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(returnPointer, "Test Returns a pointer to the int given");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
// Write some code that completes the requirements above
export int pointerFun(adr a) { 
    return 0; // your code goes here!!!
};`,
        moduleName: "TestModule",
    },
    {
        title: "Pointers to string literals",
        description: "Aflat allows you to create pointers to string literals just like a `char *` in C."
            + " Simply assign the pointer to a string literal like this: \n\n```javascript\nadr a = \"Hello World\";\n```\n\n"
            + " Below you can write a program that returns a pointer to the string \"Hello World\".",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;
import TestSuite from "ATest.af";
import string from "String";
import {str_comp} from "strings" under str;

bool returnHelloWorld(adr _arg) : test.case {
    adr x = mod.returnHelloWorld();
    if x == NULL return false; 
    return test.require(str.str_comp(x, "Hello World") == 1, ${"`Expected a pointer to the string 'Hello World' but got {x}`"});
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(returnHelloWorld, "Test Returns a pointer to the string \\"Hello World\\"");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
// Write some code that returns a pointer to the string "Hello World"
export adr returnHelloWorld() {
    return NULL;
};`,
        moduleName: "TestModule",
    },
    {
        title: "For loops",
        description: "Aflat supports for loops with the syntax `for declaration; condition; increment { body }`" +
            " Notice that there are no parentheses around the declaration, condition, and increment.  The declaration is executed before the loop starts."
            + " The condition is checked before each iteration of the loop.  The increment is executed after each iteration of the loop."
            + " Below is an example of a for loop that prints the numbers 0 to 9:\n\n"
            + "```javascript\nfor int i = 0; i < 10; i = i + 1 {\n\tio.printInt(i);\n};\n```\n\n"
            + " Below you can write a program that that calls the passed in function 10 times.\n\n"
            + " Then write a program that calls the passed in function the number of times specified by the passed in integer.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;
import TestSuite from "ATest.af";
import string from "String";

int i = 0;
int increment() {
    i = i + 1;
};

bool call10Times(adr _arg) : test.case {
    mod.call10Times(increment);
    int t = i;
    i = 0;
    return test.require(t == 10, ${"`Expected the function to be called 10 times but got {t}`"});
};

bool callNTimes(adr _arg) : test.case {
    mod.callNTimes(5, increment);
    bool one = test.require(i == 5, ${"`Expected the function to be called 5 times but got {i}`"});
    i = 0;
    mod.callNTimes(10, increment);
    bool two = test.require(i == 10, ${"`Expected the function to be called 10 times but got {i}`"});
    i = 0;
    mod.callNTimes(15, increment);
    bool three = test.require(i == 15, ${"`Expected the function to be called 15 times but got {i}`"});

    return one & two & three;
};

int main() {
    TestSuite suite = new TestSuite("For Loop Test Suite");
    suite.addCase(call10Times, "Test Calls the passed in function 10 times");
    suite.addCase(callNTimes, "Test Calls the passed in function the number of times specified by the passed in integer");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
// Write some code that calls the passed in function 10 times
export int call10Times(adr foo) {
    return 0;
};

// Write some code that calls the passed in function the number of times specified by the passed in integer
export int callNTimes(int n, adr foo) {
    return 0;
};`,

        moduleName: "TestModule",

    },
    {
        title: "Break and continue",
        description: "Aflat supports break and continue statements.  Break statements can be used to exit a loop early."
            + " Continue statements can be used to skip the rest of the current iteration of a loop and go to the next iteration."
            + " A number can be passed to the break or continue statement to specify how many loops to break or continue out of.\n"
            + " Below is an example of a for loop with a `break` statement that breaks out of the loop when the counter is 5:\n\n"
            + "```javascript\nfor int i = 0; i < 10; i = i + 1 {\n\tio.printInt(i);\n\tif i == 5 {\n\t\tbreak;\n\t};\n};\n```\n\n"
            + " Below you can write a program that that calls the passed in function 10 times and breaks out of the loop when the counter is 5 if the passed in var is true.\n\n",

        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;
import TestSuite from "ATest.af";
import string from "String";

int i = 0;
int increment() {
    i = i + 1;
};

bool call10Times(adr _arg) : test.case {
    mod.call10Times(increment, false);
    int t = i;
    i = 0;
    mod.call10Times(increment, true);
    int t2 = i;
    i = 0;
    return test.require(t == 10, ${"`Expected the function to be called 10 times but got {t}`"} &
        test.require(t2 == 5, ${"`Expected the function to be called 5 times but got {t2} (Did not break)`"}) );
};

int main() {
    TestSuite suite = new TestSuite("Break Test Suite");
    suite.addCase(call10Times, "Test Calls the passed in function 10 times and breaks out of the loop when the counter is 5");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
// Write some code that calls the passed in function 10 times and breaks out of the loop when the counter is 5
export int call10Times(adr foo) {
    return 0;
};`,
        moduleName: "TestModule",
    },
    {
        title: "If statements",
        description: "Aflat supports if statements with the syntax `if condition { body } else { body }`" +
            " Notice that there are no parentheses around the condition.\n"
            + " Here is an example of an if statement that checks if the passed in integer is greater than 5 and returns true if it is and false if it is not.\n\n"
            + " ```javascript\n"
            + " if n > 5 {\n"
            + "     return true;\n"
            + " } else {\n"
            + "     return false;\n"
            + " };\n"
            + " ```\n\n"
            + " Below write a function that returns the larger of the two passed in integers."
            + " Then write a function that returns the fizzbuzz value of the passed in integer use 'CamelCase' and return and empty string if it would have been a plain number.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "strings" under str;
import string from "String";
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;

import TestSuite from "ATest.af";
bool returnLarger(adr _arg) : test.case {
    return (
        test.require(mod.returnLarger(5, 10) == 10, ${"`'5, 10' Expected 10 but got {mod.returnLarger(5, 10)}`"}) &
        test.require(mod.returnLarger(10, 5) == 10, ${"`'10, 5' Expected 10 but got {mod.returnLarger(10, 5)}`"}) &
        test.require(mod.returnLarger(5, 5) == 5, ${"`'5, 5' Expected 5 but got {mod.returnLarger(5, 5)}`"})
    );
};

bool fizzBuzz(adr _arg) : test.case {
    if mod.fizzBuzz(3) == NULL return false; // Check if the pointer is NULL before trying to use it
    return (
        test.require(str.str_comp(mod.fizzBuzz(3), "Fizz") == 1, ${"`'3' Expected 'Fizz' but got '{mod.fizzBuzz(3)}'`"}) &
        test.require(str.str_comp(mod.fizzBuzz(5), "Buzz") == 1, ${"`'5' Expected 'Buzz' but got '{mod.fizzBuzz(5)}'`"}) &
        test.require(str.str_comp(mod.fizzBuzz(15), "FizzBuzz") == 1, ${"`'15' Expected 'FizzBuzz' but got '{mod.fizzBuzz(15)}'`"}) &
        test.require(str.str_comp(mod.fizzBuzz(2), "") == 1, ${"`'2' Expected '' but got '{mod.fizzBuzz(2)}'`"})
    );
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(returnLarger, "Test Returns the larger of the two passed in integers");
    suite.addCase(fizzBuzz, "Test Returns the fizzbuzz value of the passed in integer");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
import * from "strings" under str;

// Write some code that returns the larger of the two passed in integers
export int returnLarger(int a, int b) {
    return 0;
};

// Write some code that returns the fizzbuzz value of the passed in integer
export adr fizzBuzz(int n) {
    return NULL;
};
`,
        moduleName: "TestModule",

    },
    {
        title: "if Expression",
        description: "Aflat supports if expressions with the syntax `if condition expr else expr`" +
            " the if expression returns the value of the expression that is evaluated.\n"
            + " Here is an example of an if expression that sets val to `n` if `n` is greater than 5 and sets it to 5 if it is not.\n\n"
            + " ```javascript\n"
            + " // let is a keyword that declares a variable using type inference to determine the type. `let` is preferred when possible.\n"
            + " let val = if n > 5 n else 5;\n"
            + " ```\n\n"
            + " Below write a function that returns the larger of the two passed in integers. use an if expression.",
        testCode: `.needs <std>
import * from "io" under io;
import string from "String";
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;

import TestSuite from "ATest.af";
bool returnLarger(adr _arg) : test.case {
    return (
        test.require(mod.returnLarger(5, 10) == 10, ${"`'5, 10' Expected 10 but got {mod.returnLarger(5, 10)}`"}) &
        test.require(mod.returnLarger(10, 5) == 10, ${"`'10, 5' Expected 10 but got {mod.returnLarger(10, 5)}`"}) &
        test.require(mod.returnLarger(5, 5) == 5, ${"`'5, 5' Expected 5 but got {mod.returnLarger(5, 5)}`"})
    );
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(returnLarger, "Test Returns the larger of the two passed in integers");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>

// Write some code that returns the larger of the two passed in integers using an if expression
export int returnLarger(int a, int b) {
    return 0;
};
`,
        moduleName: "TestModule",

    },
    {
        title: "Aflat Standard string Object",
        description: "Aflat has a standard string object that can be imported with `import string from \"String\"`.\n" +
        "The string object is the preferred way to work with strings in Aflat rather than using adr pointers.\n" +
        "Below are a few methods that are available on the string object:\n" +
        "```javascript\n" +
        "string.len() // Returns the length of the string\n" +
        "string.at(int index) // Returns the character at the specified index\n" +
        "string.subString(int start, int end) // Returns a substring of the string from start to end\n" +
        "string.push(char c) // Adds the character c to the end of the string\n" +
        "string.upper() // Returns a new string with all the characters in upper case\n" +
        "string.lower() // Returns a new string with all the characters in lower case\n" +
        "string.reverse() // Returns a new string with the characters in reverse order\n" +
        "```\n" +
        "Below write a function that returns the first character of the passed in string.",


        testCode: `.needs <std>
import * from "io" under io;
import string from "String";
import * from "./src/TestModule" under mod;
import {case, report, require} from "ATest.af" under test;

import TestSuite from "ATest.af";
bool firstChar(adr _arg) : test.case {
    string s = "Hello";
    string s2 = "World";
    string s3 = "Aflat";
    return (
        test.require(mod.firstChar(s) == 'H', ${"`'Hello' Expected 'H' but got '{mod.firstChar(s)}'`"}) &
        test.require(mod.firstChar(s2) == 'W', ${"`'World' Expected 'W' but got '{mod.firstChar(s2)}'`"}) &
        test.require(mod.firstChar(s3) == 'A', ${"`'Aflat' Expected 'A' but got '{mod.firstChar(s3)}'`"})
        );
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(firstChar, "Test Returns the first character of the passed in string");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
import string from "String";

// Write some code that returns the first character of the passed in string
export char firstChar(string str) {
    return 'c';
};
`,
        moduleName: "TestModule",
    },
]

export default lessons;