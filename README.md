# Written Test 2

# Overview

The assignment link is available at:

https://classroom.github.com/assignment-invitations/828c492071d5271ef1e7858b1ba87061

All work on this test is to be done alone.  If you look things up on the Web,
cite them.  You can't get help from classmates, tutors, friends, or mentors on
answering the content of these questions.  If you're stuck on some technical
issue, ask the staff.  Don't post public questions about this assignment on
Piazza.

You'll submit all your answers in plain text in a file in this directory, to
each question's corresponding text file, and push by the deadline. For
example, the answer of the question 1 should go to `q1.txt`. **Please wrap the
text at some reasonable amount**; 70-90 characters per line is useful.

**The size limit for each question is 100 lines / 8000 characters.**

The deadline is 11:59PM on Wednesday, June 7.

# 1. Variable-arity Functions

Many languages support variable-arity functions. For example, in Python, an
asterisk before the final argument indicates that it will hold all additional
arguments that are provided. If too few arguments are provided, it is still an
error. See variable.py for some examples.

Design and describe a calling convention for variable arity functions added to
Diamondback (so using global def declarations, not closures). Assume the same
syntax, so a variable-arity function is declared with an asterisk before the
last parameter. This should evaluate to (2, 3), for instance:

    def f(x, *y):
      y
    f(1, 2, 3)

Assuming the parser is updated for you, and the decl datatype is exended to:

    type decl
      | DFun of string * string list * expr
      | DVarFun of string * string list * string * expr

**The function definition above would parse to:**

    DVarFun("f", ["x"], "y", EId("y"))
    
**Note that the parser for `EApp` is unchanged, so the application expression above would still parse to:**
    
    EApp("f", [ENum(1); ENum(2); ENum(3)])

Describe what in the implementation of the compiler you would need to change to
make this work.  Discuss at least:

- What in `compile_expr` would change (if anything)
- What in `compile_decl` would change (if anything)
- What heap or stack representations would change (if anything)


# 2. When to Garbage Collect

In the Garter assignment, we trigger collection only when out of memory. Some
languages, like Java, provide a runtime function that triggers garbage
collection manually:

https://docs.oracle.com/javase/7/docs/api/java/lang/System.html#gc()

For simplicity, assume the mark/compact implementation for the collector as in
~~Egg-Eater~~Garter.  Are there any benefits to running the garbage collector before the
heap is full, and/or triggered by the user's program?  Why or why not?


# 3. Strings

Consider adding ASCII strings to ~~Egg-Eater~~Garter.

They will be parsed into a new expression form:

    type expr =
      | EStr of string

In addition, consider two extensions to the language:

1.  The "+" operator works on pairs of strings or pairs of numbers, but not
both.  When concatenating strings, a new string is produced
2.  The `EGetItem` expression, when used on a string in the tuple position,
should return a one-character string corresponding to the character at that
location in the string.  So, for example, `"abcd"[1]"` evaluates to `"b"`.  If
the index is out of bounds, an error is signaled.

Discuss at least:

- How strings would be represented on the heap, and tradeoffs in terms of
  memory and time implied by the representation
- How references to strings would be represented
- How an `EStr` expression would be compiled
- Necessary changes to the `+` and `EGetItem` cases in the compiler
- How strings would interact with garbage collection (consider the heap
  representation)


# 4. Variable Assignment and Closures

We discussed in class how closures store copies of values from the environment
in which they were created.

Consider the Python program in `loop_lambda.py`.  Does the current value of `i`
get copied each time the function is created, or does something else happen?

(You can run the program with `python loop_lambda.py`.  If you'd like to see
the an analogous program in JavaScript, see `loop_lambda.js`).

With the implementation of closures we discussed in class, we wouldn't get this
result.  If the value of `i` was copied each time the closure was created, we'd
instead see the `answers` array hold `[100, 101, 102, ...]`.  Instead, it seems
that Python and JavaScript _share_ the variable across all the created
closures.

Discuss an implementation of mutable variables and closures that would match
Python and JavaScript's behavior.  Include descriptions of any heap
representations that would need to change, any expressions that would need to
be compiled differently, and any interactions with memory management.

