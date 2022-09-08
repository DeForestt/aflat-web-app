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
    }
]