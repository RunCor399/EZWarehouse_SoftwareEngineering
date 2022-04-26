# Design Document 


Authors: Bianchi Giulia, Colella Edoardo, Colotti Manuel Enrique, Di Benedetto Giovanna


| Version number | Change                           |
| -------------- | :------------------------------- |
| 1.0            | First drafts of Design Document  |
| 2.0            | Final version of Design Document |

# Contents

- [Design Document](#design-document)
- [Contents](#contents)
- [Instructions](#instructions)
- [High level design](#high-level-design)
- [Low level design](#low-level-design)
  - [Data Class Diagram](#data-class-diagram)
  - [Logic Class Diagram](#logic-class-diagram)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)
  - [Sequence Diagram 1.1](#sequence-diagram-11)
  - [Sequence Diagram 3.1](#sequence-diagram-31)
  - [Sequence Diagram 4.1](#sequence-diagram-41)
  - [Sequence Diagram 5.1.1](#sequence-diagram-511)
  - [Sequence Diagram 5.2.1](#sequence-diagram-521)
  - [Sequence Diagram 6.1](#sequence-diagram-61)
  - [Sequence Diagram 9.1](#sequence-diagram-91)
  - [Sequence Diagram 12.1](#sequence-diagram-121)

# Instructions

The design must satisfy the Official Requirements document, notably functional and non functional requirements, and be consistent with the APIs

# High level design 

The architectural pattern adopted for the design of EasyWarehouse is the Client-Server pattern.

For this reason the team has decided to show both fronted and backend macro-packages in the package diagram, even though the frontend one wasn't required from the specifics.

The backend package is divided in a data package that provides all the data structures required by the application, and a logic package that provides the operations to manage data.


<img src="images/PackageDiagram.png" alt="PackageDiagram" width="600"/>


# Low level design


## Data Class Diagram
<img src="images/DataClassDiagram.png" alt="DataClassDiagram" width="800"/>


The team has designed the logic package using a Controller composed of many sub-controllers in order to make easier the implementation and the decoupling between the different kind of operations.
## Logic Class Diagram
<img src="images/LogicClassDiagram.png" alt="LogicClassDiagram" width="800"/>







# Verification traceability matrix

\<for each functional requirement from the requirement document, list which classes concur to implement it>


<img src="images/TraceabilityMatrix.png" alt="TraceabilityMatrix" width="600"/>


# Verification sequence diagrams 
\<select key scenarios from the requirement document. For each of them define a sequence diagram showing that the scenario can be implemented by the classes and methods in the design>

## Sequence Diagram 1.1

<img src="images/SequenceDiagram1_1.png" alt="3_1_SequenceDiagram" width="600"/>

## Sequence Diagram 3.1

<img src="images/SequenceDiagram_3_1.PNG" alt="3_1_SequenceDiagram" width="600"/>

## Sequence Diagram 4.1

<img src="images/SequenceDiagramScenario_4.1.jpg" alt="4_1_SequenceDiagram" width="600"/>

## Sequence Diagram 5.1.1
<img src="images/SequenceDiagramScenario_5.1.1_def.png" alt="5_1_1_SequenceDiagram" width="600"/>

## Sequence Diagram 5.2.1

<img src="images/SequenceDiagram5_2_1.png" alt="5_2_1_SequenceDiagram" width="600"/>

## Sequence Diagram 6.1

<img src="images/SequenceDiagram_6_1.PNG" alt="6_1_SequenceDiagram" width="600"/>

## Sequence Diagram 9.1

<img src="images/SequenceDiagramScenario_9.1.jpg" alt="9_1_SequenceDiagram" width="600"/>

## Sequence Diagram 12.1

<img src="images/SequenceDiagramScenario_12.1_def.png" alt="12_1_SequenceDiagram" width="600"/>



