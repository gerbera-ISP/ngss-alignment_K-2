import { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────
const dciElements = [
  {id:2,text:"Patterns of the motion of the sun, moon, and stars in the sky can be observed, described, and predicted. (1-ESS1-1) [1.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:3,text:"The sun is observed at different positions in the sky at different times of the day. [1.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:4,text:"The moon is observed at different positions in the sky at different times during the day or night. [1.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:5,text:"Stars (other than the sun) are not observable in the sky during the day but are observed during the night. [1.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:6,text:"The moon can be observed during the day and during the night, but the sun can only be observed during the day. [1.ESS1.A.1]",sub:"ESS1.A: The Universe and Its Stars",dom:"ESS"},
  {id:7,text:"Seasonal patterns of sunrise and sunset can be observed, described, and predicted. (1-ESS1-2) [K.ESS1.B.1.]",sub:"ESS1.B: Earth and The Solar System",dom:"ESS"},
  {id:8,text:"Some events happen very quickly; others occur very slowly, over a time period much longer than one can observe. (2-ESS1-1) [2.ESS1.C.1]",sub:"ESS1.C The History of Planet Earth",dom:"ESS"},
  {id:9,text:"Wind and water can change the shape of the land. (2-ESS2-1) [2.ESS2.A.1]",sub:"ESS2.A Earth's Materials and Systems",dom:"ESS"},
  {id:10,text:"Maps show where things are located. One can map the shapes and kinds of land and water in any area. (2-ESS2-2) [2.ESS2.B.1]",sub:"ESS2.B Plate Tectonics and Large Scale System Interactions",dom:"ESS"},
  {id:11,text:"Water is found in the ocean, rivers, lakes, and ponds. Water exists as solid ice and in liquid form. (2-ESS2-3) [2.ESS2.C.1]",sub:"ESS2.C The Role of Water in Earth's Surface Processes",dom:"ESS"},
  {id:12,text:"Weather is the combination of sunlight, wind, snow or rain, and temperature in a particular region at a particular time. People measure these conditions to describe and record the weather and to notice patterns over time. (K-ESS2-1) [K.ESS2.D.1, 1.ESS2.D.1]",sub:"ESS2.D Weather and Climate",dom:"ESS"},
  {id:13,text:"Plants and animals can change their environment. (K-ESS2-2) [K.ESS2.E.1]",sub:"ESS2.E Biogeology",dom:"ESS"},
  {id:14,text:"Living things need water, air, and resources from the land, and they live in places that have the things they need. Humans use natural resources for everything they do. (K-ESS3-1) [K.ESS3.A.1]",sub:"ESS3.A Natural Resources",dom:"ESS"},
  {id:15,text:"Some kinds of severe weather are more likely than others in a given region. Weather scientists forecast severe weather so that the communities can prepare for and respond to these events. (K-ESS3-2)",sub:"ESS3.B Natural Hazards",dom:"ESS"},
  {id:16,text:"Things that people do to live comfortably can affect the world around them. But they can make choices that reduce their impacts on the land, water, air, and other living things. (K-ESS3-3) [K.ESS3.C.1]",sub:"ESS3.C Human Impacts on Earth Systems",dom:"ESS"},
  {id:18,text:"All organisms have external parts. Different animals use their body parts in different ways to see, hear, grasp objects, protect themselves, move from place to place, and seek, find, and take in food, water and air. Plants also have different parts (roots, stems, leaves, flowers, fruits) that help them survive and grow. (1-LS1-1) [1.LS1.A.1]",sub:"LS1.A Structure and Function",dom:"LS"},
  {id:19,text:"Adult plants and animals can have young. In many kinds of animals, parents and the offspring themselves engage in behaviors that help the offspring survive. (1-LS1-2)",sub:"LS1.B Growth and Development of Organisms",dom:"LS"},
  {id:20,text:"All animals need food in order to live and grow. They obtain their food from plants or from other animals. Plants need water and light to live and grow. (K-LS1-1) [K.LS1.C.1]",sub:"LS1.C Organization for Matter and Energy Flow in Organisms",dom:"LS"},
  {id:21,text:"Animals have body parts that capture and convey different kinds of information needed for growth and survival. Animals respond to these inputs with behaviors that help them survive. Plants also respond to some external inputs. (1-LS1-1) [1.LS1.A.1]",sub:"LS1.D Information Processing",dom:"LS"},
  {id:22,text:"Plants depend on water and light to grow. (2-LS2-1) [2.LS2.A.1]",sub:"LS2.A Interdependent Relationships in Ecosystems",dom:"LS"},
  {id:23,text:"Plants depend on animals for pollination or to move their seeds around. (2-LS2-2) [2.LS2.A.2]",sub:"LS2.A Interdependent Relationships in Ecosystems",dom:"LS"},
  {id:24,text:"Young animals are very much, but not exactly, like their parents. Plants also are very much, but not exactly, like their parents. (1-LS3-1) [1.LS3.A.1]",sub:"LS3.A Inheritance of Traits",dom:"LS"},
  {id:25,text:"Individuals of the same kind of plant or animal are recognizable as similar but can also vary in many ways. (1-LS3-1) [1.LS3.A.1]",sub:"LS3.B Variation of Traits",dom:"LS"},
  {id:26,text:"There are many different kinds of living things in any area, and they exist in different places on land and in water. (2-LS4-1)",sub:"LS4.D Biodiversity and Humans",dom:"LS"},
  {id:27,text:"Different kinds of matter exist and many of them can be either solid or liquid, depending on temperature. Matter can be described and classified by its observable properties. (2-PS1-1) [2.PS1.A.1]",sub:"PS1.A Structure of Matter",dom:"PS"},
  {id:28,text:"Different properties are suited to different purposes. (2-PS1-2),(2-PS1-3) [2.PS1.A.2]",sub:"PS1.A Structure of Matter",dom:"PS"},
  {id:29,text:"A great variety of objects can be built up from a small set of pieces. (2-PS1-3)",sub:"PS1.A Structure of Matter",dom:"PS"},
  {id:30,text:"Heating or cooling a substance may cause changes that can be observed. Sometimes these changes are reversible, and sometimes they are not. (2-PS1-4)",sub:"PS1.B Chemical Reactions",dom:"PS"},
  {id:31,text:"Pushes and pulls can have different strengths and directions. (K-PS2-1),(K-PS2-2) [K.PS2.A.1, 2.PS2.A.1]",sub:"PS2.A Forces and Motion",dom:"PS"},
  {id:32,text:"Pushing or pulling on an object can change the speed or direction of its motion and can start or stop it. (K-PS2-1),(K-PS2-2) [K.PS2.A.1, 2.PS2.A.1]",sub:"PS2.A Forces and Motion",dom:"PS"},
  {id:33,text:"Describe the ways we can cause an object to change motion. [K.PS2.A.2]",sub:"PS2.A Forces and Motion",dom:"PS"},
  {id:34,text:"When objects touch or collide, they push on one another and can change motion. (K-PS2-1)",sub:"PS2.B Types of Interactions",dom:"PS"},
  {id:36,text:"Recall that sunlight warms Earth's surface and that more sunlight means more warmth (e.g., it is generally warmer in the day than at night). [K.PS3.A.1]",sub:"PS3.A Definitions of Energy",dom:"PS"},
  {id:37,text:"Energy sources that increase the temperature of objects (e.g., sun, stove, flame, light bulb, oven). [1.PS3.A.1]",sub:"PS3.A Definitions of Energy",dom:"PS"},
  {id:38,text:"The sun is the primary source of energy on Earth. [1.PS3.A.1]",sub:"PS3.A Definitions of Energy",dom:"PS"},
  {id:39,text:"Temperature is a measure of hot or cold. [1.PS3.A.1]",sub:"PS3.A Definitions of Energy",dom:"PS"},
  {id:40,text:"Sunlight warms Earth's surface. (K-PS3-1),(K-PS3-2) [K.PS3.B.1]",sub:"PS3.B Conservation of Energy and Energy Transfer",dom:"PS"},
  {id:41,text:"A bigger push or pull makes things go faster. (secondary to K-PS2-1) [K.PS2.A.1]",sub:"PS3.C Relationship between Energy and Forces",dom:"PS"},
  {id:42,text:"Sound can make matter vibrate, and vibrating matter can make sound. (1-PS4-1) [1.PS4.A.1, 2.PS4.A.1]",sub:"PS4.A Wave Properties",dom:"PS"},
  {id:43,text:"Objects can be seen only when light is available to illuminate them. Some objects give off their own light. (1-PS4-2)",sub:"PS4.B Electromagnetic Radiation",dom:"PS"},
  {id:44,text:"Some materials allow light to pass through them, others allow only some light through and others block all the light and create a dark shadow on any surface beyond them. Mirrors can be used to redirect a light beam. (1-PS4-3)",sub:"PS4.B Electromagnetic Radiation",dom:"PS"},
  {id:45,text:"People also use a variety of devices to communicate (send and receive information) over long distances. (1-PS4-4) [1.PS4.C.1]",sub:"PS4.C Information Technologies and Instrumentation",dom:"PS"},
  {id:46,text:"A situation that people want to change or create can be approached as a problem to be solved through engineering. Such problems may have many acceptable solutions. (K-2-ETS1-1)",sub:"ETS1.A Defining and Delimiting Engineering Problems",dom:"ETS"},
  {id:47,text:"Asking questions, making observations, and gathering information are helpful in thinking about problems. (K-2-ETS1-1)",sub:"ETS1.A Defining and Delimiting Engineering Problems",dom:"ETS"},
  {id:48,text:"Before beginning to design a solution, it is important to clearly understand the problem. (K-2-ETS1-1)",sub:"ETS1.A Defining and Delimiting Engineering Problems",dom:"ETS"},
  {id:49,text:"Designs can be conveyed through sketches, drawings, or physical models. These representations are useful in communicating ideas for a problem's solutions to other people. (K-2-ETS1-1)",sub:"ETS1.B Developing Possible Solutions",dom:"ETS"},
  {id:50,text:"Because there is always more than one possible solution to a problem, it is useful to compare and test designs. (K-2-ETS1-1)",sub:"ETS1.C Optimizing the Design Solution",dom:"ETS"},
];

const sepElements = [
  {id:2,text:"Ask questions based on observations to find more information about the natural and/or designed world(s).",grp:"Asking Questions and Defining Problems"},
  {id:3,text:"Ask and/or identify questions that can be answered by an investigation.",grp:"Asking Questions and Defining Problems"},
  {id:4,text:"Define a simple problem that can be solved through the development of a new or improved object or tool.",grp:"Asking Questions and Defining Problems"},
  {id:5,text:"Distinguish between a model and the actual object, process, and/or events the model represents.",grp:"Developing and Using Models"},
  {id:6,text:"Compare models to identify common features and differences.",grp:"Developing and Using Models"},
  {id:7,text:"Develop and/or use a model to represent amounts, relationships, relative scales (bigger, smaller), and/or patterns in the natural and designed world(s).",grp:"Developing and Using Models"},
  {id:8,text:"Develop a simple model based on evidence to represent a proposed object or tool.",grp:"Developing and Using Models"},
  {id:9,text:"With guidance, plan and conduct an investigation in collaboration with peers.",grp:"Planning and Carrying Out Investigations"},
  {id:10,text:"Plan and conduct an investigation collaboratively to produce data to serve as the basis for evidence to answer a question.",grp:"Planning and Carrying Out Investigations"},
  {id:11,text:"Evaluate different ways of observing and/or measuring a phenomenon to determine which way can answer a question.",grp:"Planning and Carrying Out Investigations"},
  {id:12,text:"Make observations (firsthand or from media) to collect data that can be used to make comparisons.",grp:"Planning and Carrying Out Investigations"},
  {id:13,text:"Make observations (firsthand or from media) and/or measurements of a proposed object or tool or solution to determine if it solves a problem or meets a goal.",grp:"Planning and Carrying Out Investigations"},
  {id:14,text:"Make predictions based on prior experiences.",grp:"Planning and Carrying Out Investigations"},
  {id:15,text:"Record information (observations, thoughts, and ideas).",grp:"Analyzing and Interpreting Data"},
  {id:16,text:"Use and share pictures, drawings, and/or writings of observations.",grp:"Analyzing and Interpreting Data"},
  {id:17,text:"Use observations (firsthand or from media) to describe patterns and/or relationships in the natural and designed world(s) in order to answer scientific questions and solve problems.",grp:"Analyzing and Interpreting Data"},
  {id:18,text:"Compare predictions (based on prior experiences) to what occurred (observable events).",grp:"Analyzing and Interpreting Data"},
  {id:19,text:"Analyze data from tests of an object or tool to determine if it works as intended.",grp:"Analyzing and Interpreting Data"},
  {id:20,text:"Decide when to use qualitative vs. quantitative data.",grp:"Using Mathematics and Computational Thinking"},
  {id:21,text:"Use counting and numbers to identify and describe patterns in the natural and designed world(s).",grp:"Using Mathematics and Computational Thinking"},
  {id:22,text:"Describe, measure, and/or compare quantitative attributes of different objects and display the data using simple graphs.",grp:"Using Mathematics and Computational Thinking"},
  {id:23,text:"Use quantitative data to compare two alternative solutions to a problem.",grp:"Using Mathematics and Computational Thinking"},
  {id:24,text:"Use information from observations (firsthand and from media) to construct an evidence-based account for natural phenomena.",grp:"Constructing Explanations and Designing Solutions"},
  {id:25,text:"Use tools and/or materials to design and/or build a device that solves a specific problem or a solution to a specific problem.",grp:"Constructing Explanations and Designing Solutions"},
  {id:26,text:"Generate and/or compare multiple solutions to a problem.",grp:"Constructing Explanations and Designing Solutions"},
  {id:27,text:"Identify arguments that are supported by evidence.",grp:"Engaging in Argument from Evidence"},
  {id:28,text:"Distinguish between explanations that account for all gathered evidence and those that do not.",grp:"Engaging in Argument from Evidence"},
  {id:29,text:"Analyze why some evidence is relevant to a scientific question and some is not.",grp:"Engaging in Argument from Evidence"},
  {id:30,text:"Distinguish between opinions and evidence in one's own explanations.",grp:"Engaging in Argument from Evidence"},
  {id:31,text:"Listen actively to arguments to indicate agreement or disagreement based on evidence, and/or to retell the main points of the argument.",grp:"Engaging in Argument from Evidence"},
  {id:32,text:"Construct an argument with evidence to support a claim.",grp:"Engaging in Argument from Evidence"},
  {id:33,text:"Make a claim about the effectiveness of an object, tool, or solution that is supported by relevant evidence.",grp:"Engaging in Argument from Evidence"},
  {id:34,text:"Read grade-appropriate texts and/or use media to obtain scientific and/or technical information to determine patterns in and/or evidence about the natural and designed world(s).",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:35,text:"Describe how specific images (e.g., a diagram showing how a machine works) support a scientific or engineering idea.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:36,text:"Obtain information using various texts, text features (e.g., headings, tables of contents, glossaries, electronic menus, icons), and other media that will be useful in answering a scientific question and/or supporting a scientific claim.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:37,text:"Communicate information or design ideas and/or solutions with others in oral and/or written forms using models, drawings, writing, or numbers that provide detail about scientific ideas, practices, and/or design ideas.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:38,text:"Communicate observations based on size, shape, color, and mass of common objects.",grp:"Obtaining, Evaluating, and Communicating Information"},
  {id:39,text:"Science Knowledge is based on Empirical Evidence: Scientists look for patterns and order when making observations about the world.",grp:"Connections to Nature of Science"},
  {id:40,text:"Scientific Investigations Use a Variety of Methods: Scientists use different ways to study the world.",grp:"Connections to Nature of Science"},
];

const cccElements = [
  {id:2,text:"Patterns in the natural and human designed world can be observed, used to describe phenomena, and used as evidence.",grp:"Patterns"},
  {id:3,text:"Events have causes that generate observable patterns.",grp:"Cause and Effect"},
  {id:4,text:"Simple tests can be designed to gather evidence to support or refute student ideas about causes.",grp:"Cause and Effect"},
  {id:5,text:"Relative scales allow objects and events to be compared and described (e.g., bigger and smaller; hotter and colder; faster and slower).",grp:"Scale, Proportion, and Quantity"},
  {id:6,text:"Standard units are used to measure length.",grp:"Scale, Proportion, and Quantity"},
  {id:7,text:"Objects and organisms can be described in terms of their parts.",grp:"Systems and System Models"},
  {id:8,text:"Systems in the natural and designed world have parts that work together.",grp:"Systems and System Models"},
  {id:9,text:"Objects may break into smaller pieces, be put together into larger pieces, or change shapes.",grp:"Energy and Matter"},
  {id:10,text:"The shape and stability of structures of natural and designed objects are related to their function(s).",grp:"Structure and Function"},
  {id:11,text:"Some things stay the same while other things change.",grp:"Stability and Change"},
  {id:12,text:"Things may change slowly or rapidly.",grp:"Stability and Change"},
  {id:13,text:"Taking natural materials to make things impacts the environment.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:14,text:"Every human-made product is designed by applying some knowledge of the natural world and is built using materials derived from the natural world.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:15,text:"Science and engineering involve the use of tools to observe and measure things.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:16,text:"Developing and using technology has impacts on the natural world.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:17,text:"People depend on various technologies in their lives; human life would be very different without technology.",grp:"Connections to Engineering, Technology, and Applications of Science"},
  {id:18,text:"People encounter questions about the natural world every day.",grp:"Connections to Engineering, Technology, and Applications of Science"},
];

const dciCoverage = {
  1:[0,0,0,0,0,0,0,0,0,0,0,2,2,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
  2:[0,0,0,0,0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,2,2,2,2],
  3:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,2,2],
  4:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,2,2],
  5:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
  6:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
  7:[2,2,2,2,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,2,0,0,0,0,0,0,0],
  8:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0],
  9:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,2,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
  10:[0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
  11:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2],
  12:[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,2],
};
const sepCoverage = {
  1:[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0],
  2:[2,0,2,0,0,0,2,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2],
  3:[0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  4:[0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2],
  5:[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
  6:[2,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  7:[2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
  8:[2,0,2,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
  9:[0,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  10:[2,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  11:[2,0,2,0,0,0,2,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
  12:[0,0,2,0,0,2,2,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
};
const cccCoverage = {
  1:[2,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  2:[2,2,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2],
  3:[0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
  4:[0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  5:[2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
  6:[2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0],
  7:[2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  8:[0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,2,0],
  9:[0,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
  10:[0,0,2,0,0,0,0,0,2,0,2,0,2,0,2,0,0],
  11:[2,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
  12:[2,0,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0],
};

// ─── COLOURS ─────────────────────────────────────────────────────────────────
const FULL_COLOR  = "#1a5276";
const PART_COLOR  = "#a9cce3";
const NONE_COLOR  = "#f5f7f9";
const FULL_TEXT   = "#ffffff";
const PART_TEXT   = "#1a3a5c";

const DIM_COLORS = { DCI:"#fce4c8", SEP:"#cce0f5", CCC:"#d2f0e3" };
const DIM_ACCENT = { DCI:"#e07020", SEP:"#2060a0", CCC:"#208060" };
const DOM_COLORS = { ESS:"#ddeaf8", LS:"#d6f0e0", PS:"#fde8d0", ETS:"#ebe0f4" };
const DOM_ACCENT = { ESS:"#1a5fa8", LS:"#208050", PS:"#c05a10", ETS:"#7040a0" };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const UNITS = [1,2,3,4,5,6,7,8,9,10,11,12];
const TBD_UNITS = new Set([]);
const UNIT_TITLES = {
  1:"Life in the Rainforest",
  2:"Playground Cooldown",
  3:"Make It Go",
  4:"River Rescue",
  5:"Tiny Flyers",
  6:"Mastering Mimicry",
  7:"Patterns in the Sky",
  8:"Putting on a Show with Light and Sound",
  9:"How Seeds Travel",
  10:"Saving the Sand Dunes",
  11:"Home for a Penguin",
  12:"Exploring Earth",
};

function buildGroups(elements, groupKey) {
  const groups = {};
  elements.forEach((el, i) => {
    const g = el[groupKey] || "Other";
    if (!groups[g]) groups[g] = [];
    groups[g].push({ ...el });
  });
  return groups;
}

function getCoverage(coverageMap, unit, elIdx) {
  const row = coverageMap[unit];
  return row ? (row[elIdx] ?? 0) : 0;
}

function coverageLabel(v) {
  return v === 2 ? "Full Coverage" : v === 1 ? "Partial Coverage" : "Not Covered";
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
function CellTooltip({ info, onClose }) {
  if (!info) return null;
  return (
    <div style={{
      position:"fixed", zIndex:9999,
      left: Math.min(info.x + 12, window.innerWidth - 340),
      top: Math.min(info.y + 12, window.innerHeight - 180),
      background:"#1a2533", color:"#e8edf2",
      borderRadius:8, padding:"12px 16px",
      maxWidth:320, boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
      fontSize:12, lineHeight:1.5, pointerEvents:"none"
    }}>
      <div style={{fontWeight:700, fontSize:13, marginBottom:4, color:"#7ec8e3"}}>
        Unit {info.unit} — {UNIT_TITLES[info.unit]}
      </div>
      {info.group && (
        <div style={{color:"#a0b8c8", fontSize:11, marginBottom:3}}>
          {info.group}
        </div>
      )}
      <div style={{marginBottom:8, color:"#dde5ec"}}>{info.text}</div>
      <div style={{
        display:"inline-block", padding:"2px 10px", borderRadius:12,
        background: info.cov===2?FULL_COLOR : info.cov===1?"#2e6d9e":"#394a5a",
        color: info.cov===2?"#fff" : info.cov===1?"#c8e3f5":"#8ca0b0",
        fontSize:11, fontWeight:600
      }}>
        {coverageLabel(info.cov)}
      </div>
    </div>
  );
}


// ─── HEATMAP GRID ─────────────────────────────────────────────────────────────
function HeatGrid({ elements, coverageMap, groupKey, domainKey, headerColor, headerAccent }) {
  const [tooltip, setTooltip] = useState(null);
  const ROW_H = 26;
  const LEFT_W = 160;
  const CELL_W = 22;
  const groups = buildGroups(elements, groupKey);
  const groupList = Object.entries(groups);

  // Make each group column wide enough to show its full label text
  const groupWidths = groupList.map(([grp, els]) => {
    const textPx = grp.length * 7.8 + 28;
    const cellsPx = els.length * CELL_W;
    return Math.max(textPx, cellsPx);
  });

  // Flatten elements with their per-cell width and group index
  const elPositions = [];
  groupList.forEach(([grp, els], gi) => {
    const cellW = groupWidths[gi] / els.length;
    els.forEach(el => elPositions.push({ el, cellW, gi }));
  });

  const totalW = LEFT_W + groupWidths.reduce((a, b) => a + b, 0);

  const handleMouseEnter = (e, unit, el, cov) => {
    setTooltip({ x: e.clientX, y: e.clientY, unit, text: el.text, group: el[groupKey] || el[domainKey] || "", cov });
  };

  return (
    <div style={{ position:"relative" }}>
      <div style={{ overflowX:"auto", overflowY:"visible" }}>
        <table style={{ borderCollapse:"collapse", tableLayout:"fixed", width: totalW, minWidth: totalW }}>
          <colgroup>
            <col style={{ width: LEFT_W }} />
            {elPositions.map(({ el, cellW }) => (
              <col key={el.id} style={{ width: cellW }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th style={{
                position:"sticky", left:0, zIndex:10,
                background:"#e8edf3", borderRight:"2px solid #cdd4dc",
                borderBottom:"2px solid #c2ccd8", padding:"6px 8px",
                fontSize:10, fontWeight:700, color:"#8899aa",
                textTransform:"uppercase", letterSpacing:1,
                textAlign:"left", whiteSpace:"nowrap"
              }}>Unit</th>
              {groupList.map(([grp, els], gi) => {
                const accent = domainKey ? DOM_ACCENT[els[0][domainKey]] || "#445566" : (headerAccent || "#445566");
                const bg = domainKey ? (DOM_COLORS[els[0][domainKey]] || "#eef2f7") : (headerColor || "#ddeeff");
                return (
                  <th key={grp} colSpan={els.length} style={{
                    background: bg,
                    borderLeft:"2px solid #bbc6d2",
                    borderBottom:"2px solid #c2ccd8",
                    padding:"7px 10px",
                    fontSize:11, fontWeight:700, color:accent,
                    textAlign:"left", whiteSpace:"nowrap",
                    maxWidth: groupWidths[gi]
                  }}>
                    {grp}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {UNITS.map(unit => {
              const isTbd = TBD_UNITS.has(unit);
              return (
                <tr key={unit}>
                  <td style={{
                    position:"sticky", left:0, zIndex:5,
                    background: isTbd ? "#f5f5f5" : "#fafbfc",
                    borderRight:"2px solid #cdd4dc",
                    borderBottom:"1px solid #e8ecf0",
                    height: ROW_H, textAlign:"left",
                    opacity: isTbd ? 0.45 : 1, padding:"0 8px",
                    whiteSpace:"nowrap", overflow:"hidden"
                  }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#34495e" }}>{unit}</span>
                    <span style={{ fontSize:10, color:"#7890a0", marginLeft:6 }}>{UNIT_TITLES[unit]}</span>
                  </td>
                  {elPositions.map(({ el, gi }, i) => {
                    const cov = getCoverage(coverageMap, unit, el.idx);
                    const isFirstInGroup = i === 0 || elPositions[i-1].gi !== gi;
                    let bg = NONE_COLOR;
                    if (!isTbd) {
                      if (cov === 2) bg = FULL_COLOR;
                      else if (cov === 1) bg = PART_COLOR;
                    }
                    return (
                      <td
                        key={el.id}
                        style={{
                          height: ROW_H, background: bg,
                          borderLeft: isFirstInGroup ? "2px solid #bbc6d2" : "1px solid #e8ecf0",
                          borderBottom:"1px solid #e8ecf0",
                          cursor: cov > 0 ? "pointer" : "default",
                          opacity: isTbd ? 0.4 : 1,
                          padding:0
                        }}
                        onMouseEnter={e => handleMouseEnter(e, unit, el, cov)}
                        onMouseLeave={() => setTooltip(null)}
                        onMouseMove={e => tooltip && setTooltip(t => ({...t, x:e.clientX, y:e.clientY}))}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CellTooltip info={tooltip} />
    </div>
  );
}


// ─── SUMMARY CHART ────────────────────────────────────────────────────────────
function SummaryChart() {
  const chartData = UNITS.map(unit => {
    const dciFull = dciElements.reduce((s,el,i)=>s+(dciCoverage[unit]?.[i]===2?1:0),0);
    const dciPart = dciElements.reduce((s,el,i)=>s+(dciCoverage[unit]?.[i]===1?1:0),0);
    const sepFull = sepElements.reduce((s,el,i)=>s+(sepCoverage[unit]?.[i]===2?1:0),0);
    const sepPart = sepElements.reduce((s,el,i)=>s+(sepCoverage[unit]?.[i]===1?1:0),0);
    const cccFull = cccElements.reduce((s,el,i)=>s+(cccCoverage[unit]?.[i]===2?1:0),0);
    const cccPart = cccElements.reduce((s,el,i)=>s+(cccCoverage[unit]?.[i]===1?1:0),0);
    return {
      name:`U${unit}`, unit,
      "DCI Full":dciFull, "DCI Partial":dciPart,
      "SEP Full":sepFull, "SEP Partial":sepPart,
      "CCC Full":cccFull, "CCC Partial":cccPart,
      isTbd: TBD_UNITS.has(unit)
    };
  });

  const CustomBar = (props) => {
    const { x, y, width, height, isTbd } = props;
    return <rect x={x} y={y} width={width} height={height} fill={props.fill} opacity={isTbd?0.3:1} />;
  };

  return (
    <div style={{ padding:"0 8px 16px" }}>
      <p style={{ fontSize:12, color:"#6b7f91", marginBottom:12, marginLeft:4 }}>
        Element coverage counts per unit across all three dimensions.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top:8, right:16, left:0, bottom:4 }} barCategoryGap="20%">
          <XAxis dataKey="name" tick={{ fontSize:11, fill:"#6b7f91" }} />
          <YAxis tick={{ fontSize:10, fill:"#6b7f91" }} width={28} />
          <RechartsTooltip
            formatter={(v, name) => [v, name]}
            contentStyle={{ fontSize:11, borderRadius:6, border:"1px solid #dde4ec" }}
          />
          <Legend wrapperStyle={{ fontSize:11 }} />
          <Bar dataKey="DCI Full" stackId="a" fill={DIM_ACCENT.DCI} name="DCI Full" />
          <Bar dataKey="DCI Partial" stackId="a" fill="#f5b87a" name="DCI Partial" />
          <Bar dataKey="SEP Full" stackId="b" fill={DIM_ACCENT.SEP} name="SEP Full" />
          <Bar dataKey="SEP Partial" stackId="b" fill="#88b8e0" name="SEP Partial" />
          <Bar dataKey="CCC Full" stackId="c" fill={DIM_ACCENT.CCC} name="CCC Full" />
          <Bar dataKey="CCC Partial" stackId="c" fill="#80ccac" name="CCC Partial" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NGSSAlignment() {
  const [activeTab, setActiveTab] = useState("DCI");
  const tabs = ["DCI","SEP","CCC","Summary"];
  const tabCounts = { DCI: 47, SEP: 39, CCC: 18 };
  const tabAccents = { DCI: DIM_ACCENT.DCI, SEP: DIM_ACCENT.SEP, CCC: DIM_ACCENT.CCC, Summary: "#445566" };

  const dciWithIdx = dciElements.map((el, i) => ({...el, idx:i}));
  const sepWithIdx = sepElements.map((el, i) => ({...el, idx:i}));
  const cccWithIdx = cccElements.map((el, i) => ({...el, idx:i}));
  const indexedSepElements = sepElements.map((el, i) => ({ ...el, idx: i }));
  const indexedcccElements = cccElements.map((el, i) => ({ ...el, idx: i }));
  const HIDDEN_SEP_GROUPS = new Set(["Using Mathematics and Computational Thinking"]);

  const visibleSepElements = indexedSepElements.filter(
  el => !HIDDEN_SEP_GROUPS.has(el.grp)
);
  const HIDDEN_CCC_GROUPS = new Set(["Scale, Proportion, and Quantity"]);

  const visibleCCCElements = indexedcccElements.filter(
  el => !HIDDEN_CCC_GROUPS.has(el.grp)
);

  const renderDCI = () => {
    const domainOrder = ["ESS","LS","PS","ETS"];
    const domainNames = {
      ESS: "Earth & Space Science",
      LS: "Life Science",
      PS: "Physical Science",
      ETS: "Engineering, Technology & Applications"
    };
    return (
      <div>
        {domainOrder.map(dom => {
          const els = dciWithIdx.filter(e => e.dom === dom);
          if (!els.length) return null;
          return (
            <div key={dom} style={{ marginBottom:24 }}>
              <div style={{
                display:"flex", alignItems:"center", gap:10, marginBottom:8,
                padding:"6px 14px", background:DOM_COLORS[dom],
                borderLeft:`4px solid ${DOM_ACCENT[dom]}`, borderRadius:"0 6px 6px 0"
              }}>
                <span style={{ fontWeight:800, fontSize:14, color:DOM_ACCENT[dom], letterSpacing:1 }}>{dom}</span>
                <span style={{ fontSize:12, color:"#567", fontWeight:500 }}>
                  {domainNames[dom]}
                </span>
                <span style={{ marginLeft:"auto", fontSize:11, color:"#899aaa" }}>{els.length} elements</span>
              </div>
              <HeatGrid elements={els} coverageMap={dciCoverage} groupKey="sub" domainKey="dom" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      fontFamily:"'Georgia', 'Times New Roman', serif",
      background:"#f0f3f7", minHeight:"100vh",
      color:"#2c3e50"
    }}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg, #c42e2f 0%, #ef3839 50%, #c42e2f 100%)",
        padding:"22px 28px 16px", color:"#fff",
        boxShadow:"0 4px 16px rgba(0,0,0,0.2)"
      }}>
        <div style={{ fontSize:11, letterSpacing:2, color:"#ffd0d0", marginBottom:4 }}>
         mySci K–2 Science Curriculum
        </div>
        <h1 style={{ margin:0, fontSize:22, fontWeight:700, letterSpacing:0.3, color:"#ffffff" }}>
          NGSS Alignment Overview
        </h1>
        <p style={{ margin:"6px 0 0", fontSize:12, color:"#ffd0d0", lineHeight:1.5 }}>
          12-unit coverage across Disciplinary Core Ideas · Science & Engineering Practices · Crosscutting Concepts
        </p>
      </div>

      {/* Legend */}
      <div style={{
        background:"#fff", borderBottom:"1px solid #dde4ec",
        padding:"10px 28px", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap"
      }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#8899aa", textTransform:"uppercase", letterSpacing:1 }}>Coverage:</span>
        {[
          { color: FULL_COLOR, label:"Full" },
          { color: PART_COLOR, label:"Partial", textColor:"#2a5070" },
          { color: NONE_COLOR, label:"None", textColor:"#aab", border:"1px solid #dde4ec" }
        ].map(({color,label,textColor,border}) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:18, height:18, background:color, borderRadius:3, border:border||"none", flexShrink:0 }} />
            <span style={{ fontSize:12, color: textColor||"#e8edf2", fontWeight:500 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background:"#fff", borderBottom:"1px solid #dde4ec", padding:"0 20px", display:"flex", gap:4 }}>
        {tabs.map(tab => {
          const active = activeTab === tab;
          const accent = tabAccents[tab];
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:"12px 20px", border:"none", background:"none", cursor:"pointer",
              fontSize:13, fontWeight: active ? 700 : 500,
              color: active ? accent : "#7b8fa0",
              borderBottom: active ? `3px solid ${accent}` : "3px solid transparent",
              transition:"all 0.15s", fontFamily:"inherit"
            }}>
              {tab}
              {tab !== "Summary" && (
                <span style={{ marginLeft:6, fontSize:10, color: active ? accent : "#aab" }}>
                  ({tabCounts[tab]})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding:"20px 20px 40px" }}>
        {activeTab === "Summary" && <SummaryChart />}

        {activeTab === "DCI" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Disciplinary Core Ideas — 47 elements organized across 4 science domains.
              Hover any cell to see the full element text and coverage level.
            </p>
            {renderDCI()}
          </div>
        )}

        {activeTab === "SEP" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Science & Engineering Practices — 39 elements across 9 practice categories.
            </p>
            <HeatGrid elements={visibleSepElements} coverageMap={sepCoverage} groupKey="grp" />
          </div>
        )}

        {activeTab === "CCC" && (
          <div>
            <p style={{ fontSize:12, color:"#6b7f91", marginBottom:16, marginLeft:2 }}>
              Crosscutting Concepts — 18 elements across 8 concept categories.
            </p>
            <HeatGrid elements={visibleCCCElements} coverageMap={cccCoverage} groupKey="grp" headerColor="#d2f0e3" headerAccent="#208060" />
          </div>
        )}
      </div>

      {/* Footer note */}
      <div style={{ textAlign:"center", padding:"12px 20px 24px", fontSize:11, color:"#aab" }}>
        Source data: NGSS Element Tracker (K–2) · Colors encode full ({">"}dark blue) and partial (light blue) coverage
      </div>
    </div>
  );
}