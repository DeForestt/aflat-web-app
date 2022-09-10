import { ModuleKind } from "typescript";

export default [
    {
        title: "Ints in Aflat",
        description: "Aflat alows you to work with variables like any other programing language.  The int type represents a 32-bit integer. below you can write a program that returns and integer value of 7. and then a function that returns the sum of two integers.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;

import {case, report, requier} from "ATest.af" under test;
import TestSuite from "ATest.af";

bool return7(adr _arg) : test.case {
    int x = mod.return7();
    return x == 7;
};

bool sum(adr _arg) : test.case {
    return (
        test.requier(mod.sum(1, 2) == 3, "1 + 2 = 3") &
        test.requier(mod.sum(2, 2) == 4, "2 + 2 = 4") &
        test.requier(mod.sum(3, 2) == 5, "3 + 2 = 5") &
        test.requier(mod.sum(4, 2) == 6, "4 + 2 = 6")
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
    return ; // the return keyword returns a value from a function and ends the function.
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
            + " variables can be refrenced by using the `?` oporator (where is <variable name>) if you have an int called `a` the int can be referensed like this."
            + "\n\n `adr b = ?a;`\n\n To get the value that a pointer points to you can use the `as` oporator and the type that you expect `int c = a as int;`\n\n A value can be stored in a pointer by using the funnel oporator `=:` `b =: 5;`"
            + "\n\n Below write a program that reads an integer from a pointer and then stores the number 5 in the pointer return the value of the original integer.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;

import {case, report, requier} from "ATest.af" under test;
import TestSuite from "ATest.af";

bool returnPointer(adr _arg) : test.case {
    int i = 7;
    adr x = ?i;
    int y = mod.pointerFun(x);
    return (
        test.requier(y == 7, "The original value was returned") &
        test.requier(i == 5, "The value of the pointer was changed to 5")
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
            + " Simply assign the pointer to a string literal like this: `adr a = \"Hello World\";`"
            + " Below you can write a program that returns a pointer to the string \"Hello World\".",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import {case, report, requier} from "ATest.af" under test;
import TestSuite from "ATest.af";
import {str_comp} from "strings" under str;

bool returnHelloWorld(adr _arg) : test.case {
    adr x = mod.returnHelloWorld();
    if x == NULL return false; 
    return str.str_comp(x, "Hello World") == 1;
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
        description: "Aflat supports for loops with the syntax `for decleration; condition; increment { body }`" +
            " Notice that there are no parentheses around the decleration, condition, and increment.  The decleration is executed before the loop starts."
            + " The condition is checked before each iteration of the loop.  The increment is executed after each iteration of the loop."
            + " Below you can write a program that that calls the passed in function 10 times.\n\n"
            + " Then write a program that calls the passed in function the number of times specified by the passed in integer.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;
import {case, report, requier} from "ATest.af" under test;
import TestSuite from "ATest.af";

int i = 0;
int increment() {
    i = i + 1;
};

bool call10Times(adr _arg) : test.case {
    mod.call10Times(increment);
    int t = i;
    i = 0;
    return t == 10;
};

bool callNTimes(adr _arg) : test.case {
    mod.callNTimes(5, increment);
    bool one = test.requier(i == 5, "n == 5");
    i = 0;
    mod.callNTimes(10, increment);
    bool two = test.requier(i == 10, "n == 10");
    i = 0;
    mod.callNTimes(15, increment);
    bool three = test.requier(i == 15, "n == 15");

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
        title: "If statements",
        description: "Aflat supports if statements with the syntax `if condition { body } else { body }`" +
            " Notice that there are no parentheses around the condition.\n"
            + " Below write a function that returns the larger of the two passed in integers."
            + " Then write a function that returns the fizzbuzz value of the passed in integer use 'CamelCase' and return and empty string if it would have been a plain number.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "strings" under str;
import * from "./src/TestModule" under mod;
import {case, report, requier} from "ATest.af" under test;

import TestSuite from "ATest.af";
bool returnLarger(adr _arg) : test.case {
    return (
        test.requier(mod.returnLarger(5, 10) == 10, "5, 10") &
        test.requier(mod.returnLarger(10, 5) == 10, "10, 5") &
        test.requier(mod.returnLarger(5, 5) == 5, "5, 5")
    );
};

bool fizzBuzz(adr _arg) : test.case {
    return (
        test.requier(str.str_comp(mod.fizzBuzz(3), "Fizz") == 1, "3") &
        test.requier(str.str_comp(mod.fizzBuzz(5), "Buzz") == 1, "5") &
        test.requier(str.str_comp(mod.fizzBuzz(15), "FizzBuzz") == 1, "15") &
        test.requier(str.str_comp(mod.fizzBuzz(2), "") == 1, "2")
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

    }
]