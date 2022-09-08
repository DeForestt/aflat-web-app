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
            + "\n\n `adr b = ?a;`\n\n  Below you can write a program that returns a pointer to an integer that was passed as an argument.",
        testCode: `.needs <std>
import * from "io" under io;
import * from "./src/TestModule" under mod;

import {case, report, requier} from "ATest.af" under test;
import TestSuite from "ATest.af";

bool returnPointer(adr _arg) : test.case {
    int i = 7;
    adr x = mod.returnPointer(i);
    return x == ?i;
};

int main() {
    TestSuite suite = new TestSuite("Pointer Test Suite");
    suite.addCase(returnPointer, "Test Returns a pointer to the int given");
    suite.run();
    test.report();
    return 0;
};`,
        defaultCode: `.needs <std>
// Write some code that returns a pointer to the given int argument
export adr returnPointer(int a) { 
    return NULL; // the NULL keyword is a pointer that points to nothing.
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
    }
]