# Archive for ISME 2021
This archive contains sources necessary to run the tool and the data produced by it.

## Sources for tool
There are 4 directories needed to run the tool
1. java-tests-coevolution/ is the main entry point. Projects in other source directories need to be installed before build this one.
2. impact-analysis/ does the static analysis
3. gumtree-spoon-ast-diff/ is an improved version (we only added the a way to apply atomic evolutions and added missing code constructs) of a fork of gumtree that uses Spoon.
4. [](RefactoringMiner) is also an improved version of RefactoringMiner. We slightly fixed the build to work with maven. We also exposed new api calls but in the end we did not use them.

## Computed Data
1. observableNoteBook/ contains the notebook used to select the 164 repositories.
2. java-tests-coevolution/inputs200rev are the 164 repositories.
3. database/ contains the dump of the neo4j database.
