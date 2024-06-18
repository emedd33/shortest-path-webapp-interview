# This is my documentation of my though
This document outlines my thinking process when I recieved the task

## initial thought

### task A
The first task was a algortmn task which I have seen previously in my studies. I know there is a name for this shortest path algoritmn. You know Djistra wiht weights but I didnt remember the name so I needed to google that one. I also noted that the vertecies not sensitive to direction, but that would not be any problem unless we have defects on runtime. 

oh it was Djistra that was the algoritmn. But then I remember there was a condition (no negative weights). Given the task does not state that it can or can not have negative weights I'm assuming it does not. If it was then I would have needed to use 
...*googling*... Floyd-Warshall Algorithm. 

So my plan for this solution is 
1. make a function that reads the file and spits out graph on the given format
2. Make a function that takes in a graph, a start node and an end node and gives out an ordered list of the verticies that represents the shortest path. 


### task B
This task is a bit more architecture, where I need to make 
1. a frontend application that runs on the web
2. a backend service that has a endpoint exposed which I can use to consume and calculate the shortest path. 

This task is a bot more vague given that it only states that it should display the graph and the highlighted path, but it does not state how the backend is going to recieve the graph from. 


## The architecture
I wa initial going for a seperate backend an frontend application but given its only 3 hours I figured it better to have one deployment which is both an endpoint and serves HTML for the user. So going for what I know best NextJS. was also considering Flask Python as its also light weight, but given my python is a bit rusty I figured its better with NodeJS

# The devlopment
I started with creating a algoritmn file to create the implementation of the algoritmn. 
Given I'm on a time budget I also make good use of Github Copilot and chat gpt cause these are tools I'm gonna have anyway.

## Task A 
This task took about 30 minute to do as I used a lot of the internets to find template for Djistra. Although I could have made it from scratch but given this is a solved problem I don't see a reason to reinvent the wheel. But I made sure to go through the code and understand whats happening, changing the graph, adjusting the inputs to verify the result. 

There was not requirements in terms of how the result should be displayed so I just printed it out in the console



## Task B
This task took a bit more work but I copied over the algoritmne from task A and then configured the project, 
my thought of thinking was 
1. Create an API endpoint where I can pass inn a graph, startNode and endNode and get the result back
2. Create and front end application that consumes the graph and displays it neatly
3. I also need make it so you can upload any graph and get it displayed with the shortest path

When developing the api went quite quick, however when I decided I needed an API for showing the graph I had some css issues, which was mostly a facepalm situation, forgot to import the ReactFlow css file

I used the ReactFlow library but given the need for setting x & y position for nodes I becomes a bit convoluted so I should have gone with antv G6 or something so the graph formating would have been prettier. 

## deployment
I used vercel to deploy the app cause it simple and easy!

[shortest path webb app](https://shortest-path-webapp-interview.vercel.app/)


# My thought after the task
I dont think this application is useful as its now as its missing design! However it was fun. Since I had access to internet and CoPilot made the coding part much faster so I could focus on the getting it done instead of digging deep into algoritmn. It would be fun to do this also, but dont think I would be able to do the whole task in 3 hours if I needed to implement Dijikstra by memory. 