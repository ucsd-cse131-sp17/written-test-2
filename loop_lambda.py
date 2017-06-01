def make_functions():
  functions = []
  i = 0
  while i < 10:
    functions.append(lambda x: x + i)
    i += 1
  return functions

functions = make_functions()
answers = []
j = 0
while j < 10:
  answers.append(functions[j](100))
  j += 1

print answers
